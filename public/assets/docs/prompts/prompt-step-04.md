## LAB STEP CONTEXT
- Lab Step: `step-04`
- Lab Guide Name: `04-configure-fga`
- Static Aiya response: `aiya-post-auth` (*ALREADY sent AFTER completion of Auth0 configuration in step-03*)
- Implementation Code:
  - `.env`

Guidelines
- Pull the GUIDE using `getContent` tool for full context.
- Implementation of FGA should be via https://fga.dev NOT using the CLI.

##### FGA Model (for reference)
```
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

##### Expected Outcome:
- Created an FGA store (via fga.dev)
- Added model (copy/paste from guide into fga.dev)
- Created an FGA client (via fga.dev)
- Updated .env w/ FGA settings
- Should NOT be able to see account data.