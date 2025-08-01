import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { APIError } from '@/lib/errors';

import { auth0 } from '@/lib/auth0';

// Use Blob instead of File since File is not available in Node.js environment
const FileSchema = z.object({
  file: z
    .instanceof(Blob)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: 'File size should be less than 5MB',
    })
    // Update the file type based on the kind of files you want to accept
    .refine((file) => ['image/jpeg', 'image/png'].includes(file.type), {
      message: 'File type should be JPEG or PNG',
    }),
});

export async function POST(request: Request) {
  try {
    const { user } = (await auth0.getSession()) || {};

    if (!user?.sub) {
      throw new APIError('unauthorized:files');
    }

    if (request.body === null) {
      throw new APIError('bad_request:api', 'Request body is required');
    }

    const formData = await request.formData();
    const file = formData.get('file') as Blob;

    if (!file) {
      throw new APIError('bad_request:api');
    }
    const validatedFile = FileSchema.safeParse({ file });

    if (!validatedFile.success) {
      const errorMessage = validatedFile.error.errors
        .map((error) => error.message)
        .join(', ');

      throw new APIError('server_error:files', errorMessage);
    }

    // Get filename from formData since Blob doesn't have name property
    const filename = (formData.get('file') as File).name;
    const fileBuffer = await file.arrayBuffer();

    const data = await put(`${filename}`, fileBuffer, {
      access: 'public',
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error(error);
    if (error instanceof APIError) {
      if (error.type === 'unauthorized') {
        // Don't expose 'unauthorized' errors as they may leak information
        // about the existence of documents.
        return new APIError('forbidden:document').toResponse();
      }
      return error.toResponse();
    }
    return new APIError(
      'server_error:api',
      (error as Error)?.message,
    ).toResponse();
  }
}
