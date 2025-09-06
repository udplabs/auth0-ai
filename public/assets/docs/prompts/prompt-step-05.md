## LAB STEP CONTEXT
- Lab Step: `step-05`
- Lab Guide Name: `setup-fga-for-rag`
- Static AIya response: none
- Reference Code:
  - `lib/auth0/fga/client.ts`
  - `lib/auth0/fga/get-account-permissions.ts`
  - `lib/auth0/fga/utils.ts` <-- For your use only

Expected Outcome:
- Implemented `getFgaClient()`
- Implemented `getAccountPermissions()`
- Able to see account data (either via `getAccounts` tool or Accounts Dashboard)
  - If they are unable to see account data, ensure they have 'reset' account permissions using the built in tool in the app.
  - Alternatively, they can manually add the tuples in the FGA dashboard. Walk them through this process if necessary.
    - They can access their `userId` from within the Auth0 dashboard. They will need this to create the tuples.
    - They will need to spin up Prisma studio in order to see what their account Ids are: `pnpm db:studio`
    - Accounts can be found on the `Accounts` table.
    - Refer to `lib/auth0/fga/utils.ts` > `createOwnerPermissions()` as reference to assist them in creating tuples.