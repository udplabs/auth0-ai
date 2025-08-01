import type { AttachmentDocument } from '@/lib/db/generated/prisma';

declare global {
  namespace Artifact {
    interface Document
      extends Omit<AttachmentDocument, 'created_at' | 'updated_at'> {
      metadata: {
        createdAt: string;
        updatedAt: string;
      };
    }
  }
}
