import { NextResponse } from 'next/server';

function getErrorVisibility(surface: Errors.Surface): Errors.Visibility {
	switch (surface) {
		case 'database':
			return 'log';
		default:
			return 'response';
	}
}

export class APIError extends Error {
	public type: Errors.Type = 'unknown';
	public surface: Errors.Surface = 'unknown';
	public statusCode = 500;
	public details?: any;

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
			super(errorOrCode.message);
			this.name = errorOrCode.name;
			this.cause = errorOrCode?.cause;
		} else if (cause instanceof Error) {
			super(cause.message);
			this.name = errorOrCode;
			this.cause = cause?.cause;
			this.details = details;
		} else {
			super();

			const errorCode =
				!errorOrCode || typeof errorOrCode !== 'string'
					? 'unknown:unknown'
					: errorOrCode;

			this.name = errorCode;
			this.cause = cause === 'string' ? cause : undefined;
			this.message = getMessageByErrorCode(errorCode);

			const [type, surface] = errorCode.split(':');

			this.type = type as Errors.Type;
			this.details = details;
			this.surface = surface as Errors.Surface;
			this.statusCode = getStatusCodeByType(this.type);
		}
	}

	public toResponse() {
		const { error, status } = this.toJSON();
		return NextResponse.json(error, { status });
	}

	public toJSON(): { error: Errors.ErrorResponse; status: number } {
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
				} catch (e) {
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
