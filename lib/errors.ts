/// Originally written by Vercel
/// Modify by @danny-fuhriman_atko
import { NextResponse } from 'next/server';
/**
 * Centralized API / domain error shaping for the Next.js (App Router) backend.
 *
 * Goals:
 *  - Normalize error codes to a two‑segment form: <type>:<surface>
 *      type    → semantic / HTTP mapping (bad_request, unauthorized, forbidden, not_found, rate_limit, offline, unknown)
 *      surface → origin / concern domain (api, chat, auth, database, etc.)
 *  - Provide consistent user‑facing messages (no internal leakage) while still logging
 *    sensitive/internal details for certain surfaces.
 *  - Offer a single helper (APIError) that can be:
 *      * Constructed from an existing Error instance.
 *      * Constructed from a typed code (Errors.Code) plus optional cause/details.
 *  - Emit a NextResponse via toResponse() with appropriate HTTP status and shaped JSON.
 *
 * Visibility Rules:
 *  - Surfaces mapped to 'log' (currently only 'database') suppress the real message/code
 *    in the HTTP response (generic fallback) but log structured details to stderr.
 *  - All other surfaces return the code + safe message + (stringified) cause + details.
 *
 * Typical usage:
 *  throw new APIError('bad_request:api', 'Invalid date range', { from, to });
 *  catch(e) {
 *     if (e instanceof APIError) return e.toResponse();
 *     return new APIError(e).toResponse();
 *  }
 *
 * Potential Improvements:
 *  - Distinguish internal vs public message explicitly (e.g. constructor param publicMessage).
 *  - Allow adding more surfaces to getErrorVisibility without switch expansion (config map).
 *  - Preserve original stack trace when wrapping (currently base Error constructor without message loses some context in the code-path that supplies only a code).
 *  - Fix minor bug: `this.cause = cause === 'string' ? cause : undefined;` should test typeof.
 *  - Narrow `details` typing (unknown) and redact sensitive keys before logging.
 */

export namespace Errors {
	export type Code = `${Type}:${Surface}`;
	export type Type =
		| 'bad_request'
		| 'unauthorized'
		| 'forbidden'
		| 'not_found'
		| 'rate_limit'
		| 'server_error'
		| 'unknown'
		| 'offline';
	export type Surface =
		| 'chat'
		| 'auth'
		| 'api'
		| 'stream'
		| 'database'
		| 'history'
		| 'unknown'
		| 'vote';

	export type Visibility = 'response' | 'log' | 'none';

	export interface Response {
		code: string;
		message: string;
		cause?: string;
		details?: any;
	}
}

/**
 * Map a surface domain to an output visibility policy.
 * 'log'    → hide specific error details in HTTP response (generic message shown).
 * 'response' (default) → expose shaped error (still user‑friendly).
 */
function getErrorVisibility(surface: Errors.Surface): Errors.Visibility {
	switch (surface) {
		case 'database':
			return 'log';
		default:
			return 'response';
	}
}

/**
 * APIError
 *
 * Versatile error wrapper with multiple overload signatures:
 *  new APIError(existingError)
 *  new APIError(code, existingError)
 *  new APIError(code, causeMessageString, details?)
 *
 * Parsing Logic:
 *  - If first arg is an Error → copy its message/name/cause (type stays 'unknown:unknown'
 *    unless the original name was already a valid code).
 *  - Else treat first arg as an error code string; split at ':' for (type, surface).
 *  - Derive default user message via getMessageByErrorCode(code) if no explicit message.
 *  - Compute HTTP status from type (getStatusCodeByType).
 *
 * Serialization:
 *  - toJSON(): returns { error, status }. error contains code/message/cause/details
 *    unless surface visibility is 'log' (then yields generic redacted error body).
 *  - toResponse(): wraps toJSON() in NextResponse.json.
 */
export class APIError extends Error {
	public type: Errors.Type = 'unknown';
	public surface: Errors.Surface = 'unknown';
	public statusCode = 500;
	public details?: any;

	// Overloads (for IntelliSense only)
	constructor(error: unknown);
	constructor(error: Error);
	constructor(errorCode: Errors.Code, error: unknown);
	constructor(errorCode: Errors.Code, error: Error);
	constructor(errorCode: Errors.Code, cause?: string, details?: any);

	constructor(
		errorOrCode: Error | Errors.Code = 'unknown:unknown',
		cause?: string | unknown | Error,
		details?: any
	) {
		if (errorOrCode instanceof Error) {
			// Case 1: wrapping an existing Error
			super(errorOrCode.message);
			this.name = errorOrCode.name;
			this.cause = errorOrCode?.cause;
		} else if (cause instanceof Error) {
			// Case 2: code + underlying Error object
			super(cause.message);
			this.name = errorOrCode;
			this.cause = cause?.cause;
			this.details = details;
		} else {
			// Case 3: code + optional string cause + details
			super();

			const errorCode =
				!errorOrCode || typeof errorOrCode !== 'string'
					? 'unknown:unknown'
					: errorOrCode;

			this.name = errorCode;

			this.cause = typeof cause === 'string' ? cause : undefined;

			this.message = getMessageByErrorCode(errorCode);

			const [type, surface] = errorCode.split(':');

			this.type = type as Errors.Type;
			this.details = details;
			this.surface = surface as Errors.Surface;
			this.statusCode = getStatusCodeByType(this.type);
		}
	}

	/** Convert to Next.js (App Router) JSON Response with proper status. */
	public toResponse() {
		const { error, status } = this.toJSON();
		return NextResponse.json(error, { status });
	}

	/**
	 * Shape the error for transport/logging.
	 * - If visibility = 'log': log internals & return generic user-safe payload.
	 * - Else: return structured error including code + message + cause + details.
	 */
	public toJSON(): { error: Errors.Response; status: number } {
		const code: Errors.Code = `${this.type}:${this.surface}`;
		const visibility = getErrorVisibility(this.surface);

		const { message, cause: _cause, statusCode, details } = this;

		const cause =
			typeof _cause === 'string' ? _cause : JSON.stringify(_cause, null, 2);

		if (visibility === 'log') {
			console.error({
				code,
				message,
				cause,
			});

			let parsedDetails = {};
			if (details) {
				try {
					parsedDetails =
						typeof details === 'string' ? JSON.parse(details) : details;
				} catch {
					parsedDetails = { details };
				}
			}

			return {
				error: {
					code: '',
					message: 'Something went wrong. Please try again later.',
					details: parsedDetails,
				},
				status: statusCode,
			};
		}

		return { error: { code, message, cause, details }, status: statusCode };
	}
}

/**
 * getMessageByErrorCode
 *
 * Maps a code to a stable, user‑friendly message (never reveals internals).
 * Special case: any *:database code returns generic DB message.
 * Falls back to a generic catch‑all.
 */
export function getMessageByErrorCode(errorCode: Errors.Code): string {
	if (errorCode.includes('database')) {
		return 'An error occurred while executing a database query.';
	}

	switch (errorCode) {
		case 'bad_request:api':
			return "The request couldn't be processed. Please check your input and try again.";
		case 'unauthorized:auth':
			return 'You need to sign in before continuing.';
		case 'forbidden:auth':
			return 'Your account does not have access to this feature.';
		case 'rate_limit:chat':
			return 'You have exceeded your maximum number of messages for the day. Please try again later.';
		case 'not_found:chat':
			return 'The requested chat was not found. Please check the chat ID and try again.';
		case 'forbidden:chat':
			return 'Unable to access this chat at this time. Please check the chat ID and try again.';
		case 'unauthorized:chat':
			return 'You need to sign in to chat. Please sign in and try again.';
		case 'offline:chat':
			return "We're having trouble sending your message. Please check your internet connection and try again.";
		case 'unauthorized:api':
			return 'You need to sign in to interact with files. Please sign in and try again.';
		default:
			return 'Something went wrong. Please try again later.';
	}
}

/**
 * getStatusCodeByType
 *
 * Maps semantic error type to HTTP status.
 * Defaults to 500 for unknown / unhandled types.
 */
function getStatusCodeByType(type: Errors.Type) {
	switch (type) {
		case 'bad_request':
			return 400;
		case 'unauthorized':
			return 401;
		case 'forbidden':
			return 403;
		case 'not_found':
			return 404;
		case 'rate_limit':
			return 429;
		case 'offline':
			return 503;
		default:
			return 500;
	}
}

export function handleApiError(error: unknown) {
	console.log(error);
	if (error instanceof APIError) {
		return error.toResponse();
	}

	return new APIError(error).toResponse();
}
