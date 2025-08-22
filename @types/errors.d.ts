declare global {
	namespace Errors {
		type Code = `${Errors.Type}:${Errors.Surface}`;
		type Type =
			| 'bad_request'
			| 'unauthorized'
			| 'forbidden'
			| 'not_found'
			| 'rate_limit'
			| 'server_error'
			| 'unknown'
			| 'offline';
		type Surface =
			| 'chat'
			| 'auth'
			| 'api'
			| 'stream'
			| 'database'
			| 'history'
			| 'unknown'
			| 'vote';

		type Visibility = 'response' | 'log' | 'none';

		interface ErrorResponse {
			code: string;
			message: string;
			cause?: string;
			details?: any;
		}
	}
}

export {};
