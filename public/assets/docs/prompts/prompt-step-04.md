## LAB STEP CONTEXT
- Lab Step: `step-04`
- Lab Guide Name: `configure-fga`
- Static Aiya response: `aiya-post-auth` (*ALREADY sent AFTER completion of Auth0 configuration in step-03*)
- Implementation Code:
  - `.env`

##### FGA Model (for reference)
```
model
schema 1.1

type user

type agent

type account
  relations

    # Subjects (you write tuples here)
    define owner: [user]                # Owners must be humans
    define delegate: [user, agent]      # Either a human OR an agent

    # Base viewing right implied by delegation (no tuples here)
    define view_account: delegate

    # Grantable capabilities (to specific people/agents)
    define transfer_funds: [user, agent] # A basic capability flag (“this person may transfer on this account”), independent of amount.
    define view_balances: [user, agent] # Balance visibility is opt-in per user (or implicit for owners).
    define view_transactions: [user, agent] # Transaction visibility requires both (a) being a delegate (base view) and (b) a specific grant to see transactions.

    # Policy gate(s) with conditions: attach as role defaults:
    define transfer_limit_policy: [
      account#delegate with transfer_limit_policy,
      account#owner with transfer_limit_policy
    ]

    # Derived checks (what your app asks)
    define can_view: owner or view_account # Owners always can view; delegates get view via can_view
    define can_view_balances: owner or (view_account and view_balances)
    define can_view_transactions: owner or (view_account and view_transactions)

    define can_transfer: owner or (view_account and transfer_funds) # Show the transfer button if they can see the account *and* have the flag

    define can_transfer_funds: owner or (view_account and transfer_funds and transfer_limit_policy) # Enforce both visibility + capability + policy for an actual transfer

# transaction_amount is supplied at check time (from the request).
# transaction_limit is typically stored on a tuple (or could also be supplied contextually for coarse, account-wide rules).
condition transfer_limit_policy(transaction_amount: double, transaction_limit: double) {
  transaction_amount <= transaction_limit
}
```

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
      const options: ClientConfiguration = {
        apiUrl: process.env.FGA_API_URL ?? 'https://api.us1.fga.dev',
        storeId: process.env.FGA_STORE_ID,
        authorizationModelId: process.env.FGA_MODEL_ID,
        credentials: {
          method: CredentialsMethod.ClientCredentials,
          config: {
            apiTokenIssuer: process.env.FGA_API_TOKEN_ISSUER ?? 'auth.fga.dev',
            apiAudience:
              process.env.FGA_API_AUDIENCE ?? 'https://api.us1.fga.dev/',
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
	];
  ```
- STEP 3
  - Build out an array of checks to send to FGA as a batch.
  ```ts
  const checks = accounts.flatMap(({ id, customerId }) => {
    return RELATIONS.map((relation) => ({
      user: `user:${customerId}`,
      relation,
      object: `account:${id}`,
    }));
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

		if (copy?.transactions?.length && !permissions.includes('can_view_transactions')) {
			delete copy.transactions;
		}

		// Helpful in the lab to see what was granted.
		console.log('Account Permissions:', permissions);

		return copy as Accounts.Account;
	});
  ```
- STEP 7
  - Completed for them.

##### Expected Outcome:
- Created an FGA store
- Added model (copy/paste from guide)
- Created an FGA client
- Updated .env w/ FGA settings
- Should NOT be able to see account data.