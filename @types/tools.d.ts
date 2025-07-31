import type {
  createDocument,
  getWeather,
  requestSuggestions,
  updateDocument,
  getUserInfoTool,
} from '@/lib/ai/tools';

import type { InferUITool } from 'ai';

declare global {
  type WeatherTool = InferUITool<typeof getWeather>;
  type CreateDocumentTool = InferUITool<ReturnType<typeof createDocument>>;
  type UpdateDocumentTool = InferUITool<ReturnType<typeof updateDocument>>;
  type RequestSuggestionsTool = InferUITool<
    ReturnType<typeof requestSuggestions>
  >;
  type UserInfoTool = InferUITool<
    typeof import('@/lib/ai/tools/user-info').getUserInfoTool
  >;

  interface ChatTools {
    getWeather: WeatherTool;
    createDocument: CreateDocumentTool;
    updateDocument: UpdateDocumentTool;
    requestSuggestions: RequestSuggestionsTool;
  }
}

// biome-ignore lint/complexity/noUselessEmptyExport: <explanation>
export {};
