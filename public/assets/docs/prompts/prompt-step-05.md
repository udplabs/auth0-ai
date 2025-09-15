## LAB STEP CONTEXT
- Lab Step: `step-05`
- Lab Guide Name: `setup-fga-for-rag`
- Static Aiya response: none
- Implementation Code (show me the code):
  - `lib/auth0/fga/client.ts`
  - `lib/auth0/fga/get-account-permissions.ts`
- Relevant/Reference Code:
  - `lib/auth0/fga/utils.ts` <-- For your use only
  - `lib/ai/tool-registry.ts`
  - `lib/ai/tools/get-accounts.ts`


#### `lib/auth0/fga/client.ts ` Steps
- STEP 1
  - Completed for them
- STEP 2
  - They need to pull variables from `.env` using `process.env.XXXX`.
  - They should initiate a `new OpenFgaClient` with those variables wrapped in a `createClient` method.

  ##### FINAL CODE
  ```ts
  export async function createClient() {
    try {
      const options: UserClientConfigurationParams = {
        apiUrl: process.env.FGA_API_URL,
        storeId: process.env.FGA_STORE_ID,
        authorizationModelId: process.env.FGA_MODEL_ID,
        credentials: {
          method: CredentialsMethod.ClientCredentials,
          config: {
            apiTokenIssuer: process.env.FGA_API_TOKEN_ISSUER,
            apiAudience: process.env.FGA_API_AUDIENCE,
            clientId: process.env.FGA_CLIENT_ID,
            clientSecret: process.env.FGA_CLIENT_SECRET,
          },
        },
      };

      return new OpenFgaClient(options);
    } catch (error: unknown) {
      console.warn('FGA Client initialization failed!');
      console.warn(error);
      return null;
    }
  }
  ```
- STEP 3
  - Completed for them

#### `lib/auth0/fga/get-account-permissions.ts ` Steps
- STEP 1
  - Completed for them
- STEP 2
  - Expand an array of permissions to check.
  ```ts
	const RELATIONS: Accounts.AccountPermissions[] = [
		'can_view',
		'can_view_balances',
		'can_view_transactions',
		'can_transfer',
		// Note we are NOT asking `can_transfer_funds`
		// That is a permission we check for at the time
		// of an actual transfer request.
	];
  ```
- STEP 3
  - Build out an array of checks to send to FGA as a batch.
  ```ts
	const checks = accounts.flatMap(({ id, customerId }) => {
		return RELATIONS.map(
			(relation) =>
				({
					user: `user:${customerId}`,
					relation,
					object: `account:${id}`,
				}) as ClientBatchCheckItem
		);
	});
  ```
- STEP 4
  - Completed for them
- STEP 5
  - Completed for them
- STEP 6
  ```ts
	const output: (Accounts.Account | null)[] = accounts.map((account) => {
		const permissions = granted[account.id] ?? [];

		if (!permissions.includes('can_view')) {
			return null;
		}
		// Shallow copy so we don’t mutate the original.
		const copy: any = { ...account, permissions };

		// Remove sensitive fields unless user can view balances.
		if (!permissions.includes('can_view_balances')) {
			delete copy.balance;
			delete copy.availableBalance;
			delete copy.originalPrincipal;
			delete copy.currentPrincipal;
			delete copy.statementBalance;
			delete copy.cashBalance;
		}

		if (
			copy?.transactions?.length &&
			!permissions.includes('can_view_transactions')
		) {
			delete copy.transactions;
		}

		// Helpful in the lab to see what was granted.
		// console.log('Account Permissions:', permissions);

		return copy as Accounts.Account;
	});
  ```
- STEP 7
  - Completed for them.

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