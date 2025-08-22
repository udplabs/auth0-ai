import { APIError } from '@/lib/errors';

export const fetcher = async (url: string) => {
  if (url.startsWith('config:')) {
    return null;
  }

  const response = await fetch(url);

  if (!response.ok) {
    const { code, cause } = await response.json();
    throw new APIError(code as Errors.Code, cause);
  }

  return response.json();
};
