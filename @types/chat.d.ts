import { z } from 'zod';

import type { UIMessage } from 'ai';
import type { Geo } from '@vercel/functions';
import type { ArtifactKind } from '@/components/artifact';
import type { Suggestion } from '@/lib/db/schema';

const messageMetadataSchema = z.object({
  createdAt: z.string(),
});

declare global {
  type DataPart = { type: 'append-message'; message: string };
  type MessageMetadata = z.infer<typeof messageMetadataSchema>;

  type ChatMessage = UIMessage<MessageMetadata, CustomUIDataTypes, ChatTools>;

  interface CustomUIDataTypes {
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
