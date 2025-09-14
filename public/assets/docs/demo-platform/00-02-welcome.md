## Premise
You’re a developer at *the bAInk*, a fancy new digital-only financial institution. Your task: wire an AI assistant into your banking UI without leaking sensitive data, enforce per‑account permissions with FGA, augment user interactions with RAG, and (coming soon!) require human approval for sensitive actions via async auth (CIBA) and Rich Authorization Requests.

**Meet Aiya.** Aiya is the dev{camp} guide living inside your app. Once you get the app spun up you can utilize Aiya for things like:

* `What am I supposed to be doing?`
* `Explain step 3` to expand on the guide.
* `hint` or `help` to get [progressively stronger] nudges
* `explain this file: {{insert file including path}}` to summarize code you’re viewing
* `Show me the code` to just see the final code.

**How to interact.** Treat Aiya like a senior pair‑programmer. Ask precise questions. If you’re blocked, paste the error + a short description of what you tried.


> [!WARNING]
> **AI disclaimer**
>
> - The learning application uses LLMs. Output can be incomplete, wrong, or inconsistent between runs.
>
> - *Never* paste secrets or production data into the chat prompt.
>
> - By continuing you agree to the sharing of any/all content/information generated with or by the LLM (***including the content of chat messages***) within the learning application.

## Objective

By the end, you will:

- Run a Next.js banking starter app integrated with **Auth0 Auth for AI**.
- Stand up an **Auth0 FGA Store**, load a model, and author tuples.
- Implement a **RAG retriever** that filters results using FGA (policy‑aware retrieval).
- Trigger a **CIBA**-style async authorization flow for a sensitive action. *<span style='color: orange; font-variant: small-caps'>← Coming Soon</span>*

**Expected outcome.** A working local app you can reuse as a starter: readable, composable, and production‑opinionated.

## Prerequisites

### You must have the following:
  - *64-bit* Windows, Mac, or Linux Laptop with
    - Internet;
    - Node.js;
    - *Disabled VPN*
  - Code editor (*VS Code recommended*).
    > [!WARNING]
    > Web IDEs *may* work, but are not tested. Local dev is strongly recommended.
  - Access to the [**Auth0 Demo Platform**](https://demo.okta.com) (*this one should be easy!*).

  > [!CAUTION]
  > ***Required tooling***
  >
  > * **Node.js ≥ 20** *<span style='color: red; font-variant: small-caps'>← Required</span>* <span style='font-size: 10px; font-variant: small=caps'>[Install Instructions](https://nodejs.org/en/download/)</span>
  > * **pnpm ≥ 9** *<span style='color: red; font-variant: small-caps'>← Required</span>* <span style='font-size: 10px; font-variant: small=caps'>[Install Instructions](https://pnpm.io/installation)</span>
  > * A modern browser (Chrome recommended)

### You should be comfortable with:

- Web fundamentals (HTML, CSS, JavaScript/TypeScript)
- Service/back‑end basics (HTTP, REST)
- Identity basics (OAuth 2.0, OIDC, tokens) *<span style='color: orange; font-variant: small-caps'>← dev{camp} 101 is great for this!</span>*
  <br><sup>[_Learn more_](https://auth0.com/docs/get-started/identity-fundamentals/introduction-to-auth0)</sup>
- Authorization concepts (subjects, objects, relations, policies)
  <br><sup>[_Learn more_](https://openfga.dev/docs/authorization-concepts)</sup>
- Next.js (App Router)
  <br><sup>[_Learn more_](https://nextjs.org/docs)</sup>

> [!IMPORTANT]
>
> *This is not an Auth0 FGA lab*. However, this lab does utilizes Auth0 FGA.
>
> If you’re new to FGA, we recommend you skim the [concepts](https://docs.fga.dev/fga-concepts).

## What you will learn

- **Tools**: what a tool is in the Vercel AI SDK, how to define, validate input, and return structured results.
- **RAG**: external knowledge retrieval, chunking/embeddings, and filtering results by policy.
- [**Auth0 FGA**](https://auth0.com/fine-grained-authorization): model + tuples to gate which *documents/accounts* an identity can access.
- **Async Auth (CIBA)**: decoupled approval for sensitive actions (e.g., high‑value transfer). *<span style='color: orange; font-variant: small-caps'>← Coming Soon</span>*
- **Token Vault**: calling 3P APIs (Google Calendar) via Auth0 AI without handling user secrets directly. *<span style='color: orange; font-variant: small-caps'>← Coming Soon</span>*