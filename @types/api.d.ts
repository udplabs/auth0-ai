import type { NextRequest } from 'next/server';
declare global {
  interface ApiPathParams {
    id: string;
  }
  interface ApiQueryParams {
    cached?: boolean;
    page?: string;
    page_size?: string;
  }

  interface TypedNextRequest<T> extends NextRequest {
    json: () => Promise<T>;
  }
}
