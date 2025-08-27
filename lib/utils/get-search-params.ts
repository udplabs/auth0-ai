import type { NextRequest } from 'next/server';

export function getSearchParams<T>(req: NextRequest, keys: string[] = []) {
  console.log('parsing search params...');

  const result: T = {} as T;

  if (req.nextUrl?.search) {
    const searchParams = new URLSearchParams(req.nextUrl.search);

    keys.forEach((key) => {
      const value = searchParams.get(key);
      if (value !== null) {
        (result as any)[key] = value;
      }
    });
  }

  return result;
}
