import { z } from 'zod';

import type { UIDataTypes, UIMessage } from 'ai';
import type { Geo } from '@vercel/functions';
import type { ArtifactKind } from '@/components/artifact';
import type { Chat as DBChat, Stream, Suggestion } from '@/lib/db/schema';

const messageMetadataSchema = z.object({
  createdAt: z.string(),
  updatedAt: z.string(),
  isUpvoted: z.boolean().optional(),
  isDownvoted: z.boolean().optional(),
});

declare global {
  interface UIChat
    extends Omit<
      DBChat,
      | 'visiblity'
      | 'title'
      | 'created_at'
      | 'updated_at'
      | 'message_count'
      | 'metadata'
    > {
    visibility?: 'public' | 'private';
    title?: string;
    createdAt: string;
    updatedAt: string;
    messageCount: number;
    messages?: ChatMessage[];
    stream?: Stream;
  }

  type DataPart = { type: 'append-message'; message: string };
  type MessageMetadata = z.infer<typeof messageMetadataSchema>;

  type ChatMessage = UIMessage<MessageMetadata, CustomUIDataTypes, ChatTools>;

  interface CustomUIDataTypes extends UIDataTypes {
    textDelta: string;
    imageDelta: string;
    sheetDelta: string;
    codeDelta: string;
    suggestion: Suggestion;
    appendMessage: string;
    id: string;
    title: string;
    kind: ArtifactKind;
    clear: null;
    finish: null;
  }

  interface RequestHints {
    latitude: Geo['latitude'];
    longitude: Geo['longitude'];
    city: Geo['city'];
    country: Geo['country'];
  }
}
