## LAB STEP CONTEXT
- Lab Step: `step-06`
- Lab Guide Name: `advanced-fga-for-rag`
- Static AIya response: none
- Implementation Code:
  - `lib/auth0/fga/search-transactions.ts`
  - `lib/ai/tool-registry.ts`
- Relevant/Reference Code:
  - `lib/auth0/fga/client.ts`
  - `lib/auth0/fga/get-account-permissions.ts`
  - `lib/auth0/fga/utils.ts` <-- For your use only
  - `lib/ai/rag/create-documents.ts`
  - `lib/ai/rag/vector-store.ts`
  - `lib/db/queries/documents.ts`

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