## LAB STEP CONTEXT
- Lab Step: `step-06`
- Lab Guide Name: `advanced-fga-for-rag`
- Static Aiya response: none
- Implementation Code (show me the code):
  - `lib/ai/tools/search-transactions.ts`
  - `lib/ai/tool-registry.ts`
- Relevant/Reference Code:
  - `lib/auth0/fga/client.ts`
  - `lib/auth0/fga/get-account-permissions.ts`
  - `lib/auth0/fga/utils.ts` <-- For your use only
  - `lib/ai/rag/create-documents.ts`
  - `lib/ai/rag/vector-store.ts`
  - `lib/db/queries/documents.ts`

#### `lib/ai/tools/search-transactions.ts ` Steps
- STEP 1
  - Completed for them
- STEP 2
  - Completed for them
- STEP 3
  - Create the actual FGAFilter w/ the buildQuery
  ```ts
  const fgaRetriever = FGAFilter.create<Documents.DocumentWithScore>({
    buildQuery: (doc) => {
      // OPTIONAL Defensive coding: ensure metadata has expected shape.
      // If missing, return a relation that will certainly fail.
      const accountId = doc?.metadata?.accountId;

      if (!accountId) {
        return {
          user: `user:${user.sub}`,
          object: `account:__missing__`,
          relation: 'can_view_transactions',
        };
      }

      // You could just as easily send just this
      return {
        user: `user:${user.sub}`,
        object: `account:${doc.metadata.accountId}`,
        relation: 'can_view_transactions',
      };
    },
  });
  ```
- STEP 4
  - Completed for them
- STEP 5
  - Run results through the FGAFilter
  ```ts
  const authorizedResults = await fgaRetriever.filter(rawResults);
  console.log(
    '[searchTransactions] Authorized results:',
    authorizedResults.length
  );
  ```
- STEP 6
  - Completed for them
- STEP 7
  - Completed for them
- STEP 8 & STEP 9
  - Add to `lib/ai/tools/tool-registry.ts`
  ```ts
  import type { ToolSet } from 'ai';

  import {
    getAccounts,
    getContent,
    getReferenceFile,
    getStepCode,
    getTransactions,
    getUserProfile,
    getWeather,
    transferFunds,
    userSettings,
  } from './tools';

  import { pushEnrollment } from './tools/_push-enroll';

  // ---------------------------------------------------------------------------
  // ❌ STEP 8: Import searchTransactions tool
  import { searchTransactions } from './tools/search-transactions';
  // ---------------------------------------------------------------------------

  export const toolRegistry = {
    getAccounts,
    getContent,
    getReferenceFile,
    getStepCode,
    getTransactions,
    getUserProfile,
    getWeather,
    pushEnrollment,
    transferFunds,
    userSettings,
    // ---------------------------------------------------------------------------
    // ❌ STEP 9: Add searchTransactions tool
    searchTransactions,
    // ---------------------------------------------------------------------------
  } satisfies ToolSet;
```

Expected Outcome:
- Implemented `fgaRetriever`
- Implemented `fgaRetriever.filter()`
- Able to request transactional analysis (i.e. 'how much did I spend on rideshare this year?')
- `searchTrasactions` is used to query LocalVectorStore and provide results.

Troubleshooting
- If they are unable to see account data, ensure they have 'reset' account permissions using the built in tool in the app.
- They can verify if the LocalVectorStore is initialized using the built-in devtools 'Get Vector Store Summary'. If it is not, they can also reinitialize it.
- They may not understand the 'why' behind the exercise. You may need to explain how to use the `searchTransactions` tool and potentially provide a sample query.
- At any point they can run `pnpm db:studio` in the console to open the Prisma SQLite Studio in case they need to look at what data is available. This may be necessary to confirm documents/embeddings exist (the `Documents` table.)