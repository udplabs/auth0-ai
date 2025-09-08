## LAB STEP CONTEXT
- Lab Step: `step-04`
- Lab Guide Name: `configure-fga`
- Static AIya response: `aiya-post-auth` (*ALREADY sent AFTER completion of Auth0 configuration in step-03*)
- Implementation Code:
  - `.env`
  - `.env.local`

FGA Model (for reference)
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
condition transfer_limit_policy(
transaction_amount: double, transaction_limit: double
) {
  transaction_amount <= transaction_limit
}
```

Expected Outcome:
- Created an FGA store
- Added model (copy/paste from guide)
- Created an FGA client
- Updated .env and .env.local w/ FGA settings
- Should NOT be able to see account data.