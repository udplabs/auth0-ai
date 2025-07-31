import dotenv from 'dotenv';

// 🔥 Load environment variables at module level if not loaded yet
if (!process.env.FGA_API_URL) {
  dotenv.config({ path: '.env.local' });
}

import { CredentialsMethod, OpenFgaClient } from '@openfga/sdk';

export function getFgaClient() {
  return new OpenFgaClient({
    apiUrl: process.env.FGA_API_URL ?? 'https://api.us1.fga.dev',
    storeId: process.env.FGA_STORE_ID,
    credentials: {
      method: CredentialsMethod.ClientCredentials,
      config: {
        apiTokenIssuer: process.env.FGA_API_TOKEN_ISSUER ?? 'auth.fga.dev',
        apiAudience: process.env.FGA_API_AUDIENCE ?? 'https://api.us1.fga.dev/',
        clientId: process.env.FGA_CLIENT_ID,
        clientSecret: process.env.FGA_CLIENT_SECRET,
      },
    },
  });
}

// 🚀 Singleton lazy client
let _fgaInstance: ReturnType<typeof getFgaClient> | null = null;

export const fga = (() => {
  if (!_fgaInstance) {
    _fgaInstance = getFgaClient();
  }
  return _fgaInstance;
})();
