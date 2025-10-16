## LAB MODULE CONTEXT
- Lab Step: `module-04`
- Lab Guide Name: `04-module-04`
- Implementation Code:
  - `.env`

### IS THE USER ON THIS MODULE?
If ALL of the following are TRUE:
- has AUTH0_CLIENT_ID: {{auth0ClientId}}
- has AUTH0_DOMAIN: {{auth0Domain}}
- has AUTH0_CLIENT_SECRET: {{auth0ClientSecret}}
- has AUTH0_SECRET: {{auth0Secret}}

AND

If ALL of the following are FALSE:
- has FGA_STORE_ID: {{fgaStoreId}}
- has FGA_CLIENT_ID: {{fgaClientId}}
- has FGA_CLIENT_SECRET: {{fgaClientSecret}}

the user is *likely* starting or working on **module 4**

### Guidelines
- Pull the GUIDE using `getStepGuides` tool for full context.
- Implementation of FGA should be via https://fga.dev NOT using the CLI.
- DO NOT GUIDE USER TO USE FGA or OpenFGA CLI.

##### FGA Model (for YOUR reference)
```bash
    model
    schema 1.1

    type user

    type agent

    type account
      relations

        # === Subjects (you write tuples on these) ===
        # Owners must be humans
        define owner: [user]
        # Either a human OR an agent
        define delegate: [user, agent]
        # ============================================

        # Base viewing right implied by delegation (no tuples here)
        define view_account: owner or delegate

        # === Grantable capabilities (to specific people/agents) ===
        # A basic capability flag (“this person may transfer on this account”), independent of amount.
        define transfer_funds: [user, agent]

        # Balance visibility is opt-in per user (or implicit for owners).
        define view_balances: [user, agent]
        # Transaction visibility requires both (a) being a delegate (base view) and (b) a specific grant to see transactions.
        define view_transactions: [user, agent]

        # Policy gate(s) with conditions: attach as role defaults:
        define transfer_limit_policy: [
          account#delegate with transfer_limit_policy,
          account#owner with transfer_limit_policy
        ]

        # ===== Derived checks (what your app asks for) =====
        # owners always can view
        # delegates get view via can_view
        define can_view: owner or view_account

        # owners can always view
        # delegates get view via view_account & view_balances
        define can_view_balances: owner or (view_account and view_balances)

        # owners can always view
        # delegates get view via view_account & view_balances
        define can_view_transactions: owner or (view_account and view_transactions)

        # Basic "show the transfer button" permission
        # owners can always view
        # delegates get view via view_account & view_balances
        define can_transfer: owner or (view_account and transfer_funds)

        # Enforce both visibility + capability + policy for an actual transfer
        # Nothing is implicit -- even owners need explicit permission
        define can_transfer_funds: (view_account and transfer_funds and transfer_limit_policy)
        # ============================================

    # transaction_amount is supplied at check time (from the request).
    # transaction_limit is typically stored on a tuple (or could also be supplied contextually for coarse, account-wide rules).
    condition transfer_limit_policy(transaction_amount: double, transaction_limit: double) {
    transaction_amount <= transaction_limit
    }
```

Completion Criteria:
- [x] Signed up for Auth0 FGA (or authenticated)
- [x] FGA store created (via fga.dev)
- [x] Added model (copy/paste from guide into fga.dev)
- [x] Created an FGA client (via fga.dev)
- [x] Updated .env w/ FGA Client settings
- [x] Has requested to view account data (should receive 0 results).