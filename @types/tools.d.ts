import type {
  createDocument,
  getWeather,
  requestSuggestions,
  updateDocument,
  getUserInfoTool,
} from '@/lib/ai/tools';

import type { InferUITool, UITools } from 'ai';

declare global {
  type WeatherTool = InferUITool<typeof getWeather>;
  type CreateDocumentTool = InferUITool<ReturnType<typeof createDocument>>;
  type UpdateDocumentTool = InferUITool<ReturnType<typeof updateDocument>>;
  type RequestSuggestionsTool = InferUITool<
    ReturnType<typeof requestSuggestions>
  >;
  type UserInfoTool = InferUITool<ReturnType<typeof getUserInfoTool>>;

  interface ChatTools extends UITools {
    getWeather: WeatherTool;
    createDocument: CreateDocumentTool;
    updateDocument: UpdateDocumentTool;
    requestSuggestions: RequestSuggestionsTool;
    userInfo: UserInfoTool;
  }
}

// biome-ignore lint/complexity/noUselessEmptyExport: <explanation>
export {};
