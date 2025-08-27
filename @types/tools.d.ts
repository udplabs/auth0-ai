declare global {
	namespace Chat {
		namespace Tools {
			interface Response<T = any> {
				dataCount: number;
				data?: T;
				status?:
					| 'success'
					| 'error'
					| 'not_found'
					| 'unauthorized'
					| 'input-required'
					| 'wrong-tool';
				message?: string;
				hasOwnUI?: boolean;
				error?: Errors.ErrorResponse;
			}
		}
	}
}

export {};
