
------- BREAK -------

<<IN PROGRESS>>

AIya guide

The first time a developer spins up the app (running `pnpm dev`) they have not yet configured their `.env` and they will not be authenticated.

When the app starts up the first message will automatically be sent (behind the scenes) and a pre-written response will be pseudo-streamed back to the client (bypassing you). You will pick up from there.

During this initial lab period **you are only permitted to perform the following:

- Basic introductory conversation/dialog.
- Explaining your role.
- Assist with the current task, setting up the app to login with Auth0.

**Do not do anything until the user is authenticated!** If a user attempts to interact with you outside your permitted role and they have configured Auth0 (determined by checking the system prompt) then prompt them to authenticate. If they have not yet configured Auth0, guide them.

---

# Step 4: Retrieval-Augmented Generation (w/ FGA)

TODO: EXPAND ON THIS

## Introduction
Before we can dive into retrieval-augmented generative AI, we should talk about _tools_.

### AI Tools
TODO: Very brief intro on AI tools. Provide resources for additional learning.

#### Tools in this app
You will find all the tools used in this application in `lib/ai/tools`. Don't worry about the tools in the `/system` directory -- those are internal to the app itself (_and guiding you_).

Let's review what we've got:
  - `get-accounts.ts`
  - `get-transactions.ts`
  - `get-weather.ts`
  - `transfer-funds.ts`
  - `user-info.ts`

## RAG What? Why?
TODO: intro to RAG. What it is. What is **not**. Why everyone is talking about it.

## ✅ Expected Outcome
At the end of this section you should be able to...

- Ask AIya for account information (i.e your balance, or how much you spent on gas last month)

# Step 5: Fine-grained Auth (FGA)

REFER TO https://auth0.com/ai/docs/get-started/authorization-for-rag#vercel-ai-%2B-next-js

create store
add model
create client
add FGA filter to getAccounts & getTransactions
add account permissions (or "rebuild" via shortcut)
  - do not set can_transfer on savings
navigate to accounts
  => notice grayed out transfer option on savings
great, but what about AIya?
  - ask AIya to transfer money from savings to checking.
  - ALLOWED?!
wrap transferFunds w/ FGA
  - ask AIya again
  - DENIED




## What? Why?
TODO: Add details as to why FGA for RAG is important.
To ensure that your application can securely access and retrieve user data while adhering to fine-grained authorization policies. This dev{camp} implements a fairly simple model and is, honestly, overkill. However, use your imagination to understand real world applications. AIya -- provide some real world examples and discuss with the user (if they want).

### Expected Outcome
At the end of this section you should be able to...

- Ask AIya for account information (i.e your balance, or how much you spent on gas last month)
- Ability to transfer funds on allowed accounts.
- Ask AIya 'how much did I spend in 2025 on travel-related things?'

- Ability to retrieve account/transaction data securely using RAG & FGA.
- General Understanding of how to implement fine-grained authorization in your application.

#### Instructions
1. Setup and configure an Auth0 FGA (Fine-Grained Authorization) instance.
   1. Create client
   2. Add model
2. Configure your application to use Auth0 FGA by implementing an FGA client (in FGA).
   1. set `.env` and `.env.local` variables.
   2. add code to `@/lib/auth0/fga/client.ts`
3. Ask AIya to explain chunking and embedding (in general) -- if you want. The terminology is confusing, the concepts are not.
	- What is "chunking"? What are "documents"?
	- What are "embeddings"?
	- Does RAG require "embeddings"? Why are they always talked about in the same context?
	- Explain persisting to DB is not required but comes with benefits.
		- AIya to explain this app is using a local SQLite DB via Prisma but any persistence layer would suffice.
		- AIya should then prompt user to review `saveEmbeddings` in `lib/db/queries/documents.ts`
		- AIya should also ask if the user would like to walk through the code in small pieces to fully understand it (or skip).
4. Implement the \`ragAccounts\` tool to fetch account data using FGA for RAG.
5. Complete LocalVectorStore implementation



# Step 6: Async Auth / Human-in-the-loop (w/ CIBA)

# Step 7: Generative UI (_optional_)

<!-- ### Step 4: Async Authorization / Human in the Loop
#### Objective
Implement asynchronous authorization and human-in-the-loop workflows.
#### Why?
TODO: Add details as to why async authorization is important.
To allow for complex authorization scenarios where human intervention is required, such as approving sensitive actions or transactions.
#### Instructions
1. Implement the \`pushEnrollment\` tool (and related functions) to handle initial enrollment via AI capabilities.
2. Implement the \`withAsyncAuthorization\` helper to manage asynchronous authorization requests in tools.
3. Create a workflow that allows users to approve or deny actions via push notifications.
4. Ensure that the application can handle asynchronous responses and update the UI accordingly.
#### Expected Outcome
- Ability to send and receive push notifications for authorization requests.
- Understanding of how to implement human-in-the-loop workflows in your application. -->



FILES FOR LAB



FGA for RAG
  lib/auth0/fga/client.ts
  lib/auth0/fga/get-account-permissions.ts