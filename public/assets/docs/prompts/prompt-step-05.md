## LAB STEP CONTEXT
- Lab Step: `step-05`
- Lab Guide Name: `05-module-05`
- Implementation Code (show me the code):
  - `lib/auth0/fga/client.ts`
  - `lib/auth0/fga/get-account-permissions.ts`
- Relevant/Reference Code:
  - `lib/auth0/fga/utils.ts` <-- For your use only
  - `lib/ai/tool-registry.ts`
  - `lib/ai/tools/get-accounts.ts`


#### `lib/auth0/fga/client.ts ` Steps
- STEP 1
  - import OpenFGA <- Completed for them
- STEP 2
  - initialize singleton instance of OpenFGA <- Completed for them
- STEP 3
  - They need to pull variables from `.env` using `process.env.XXXX`.
  - They should initiate a `new OpenFgaClient` with those variables wrapped in a `createClient` method.
- STEP 4
  - Export a public getter <- Completed for them

  ##### FINAL CODE
  ```ts
  export async function createClient() {
    try {
      const options: UserClientConfigurationParams = {
        retryParams: {
          maxRetry: 2,
          minWaitInMs: 300,
        },
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
  - Guard against non-initialized client <- Completed for them
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
  - Batch request to FGA - Completed for them
- STEP 5
  - Create RELATIONS <- Completed for them
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
  - Return the response <- Completed for them.

Completion Criteria
- [x] Fully implemented `getFgaClient()`
- [x] Fully implemented `getAccountPermissions()`
- [x] Able to see account data (either via `getAccounts` tool or `/accounts`)
  - If they are unable to see account data, ensure they have 'reset' account permissions using the built in tool in the app. This tool 'upserts' tuples into FGA.
  - Alternatively, they can manually delete/add the tuples in the FGA dashboard. Walk them through this process if necessary.
    - They can access their `userId` from within the Auth0 dashboard. They will need this to create the tuples.
    - They will need to spin up Prisma studio in order to see what their account Ids are: `npm run db:studio`
    - Accounts can be found on the `Accounts` table.
    - Refer to `lib/auth0/fga/utils.ts` > `createOwnerPermissions()` as reference to assist them in creating tuples.