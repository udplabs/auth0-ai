## dev{camp} |  FGA, RAG, & CIBA... oh my!

This guide outlines the steps of the dev{camp} lab that the user will be presented with on https://labs.okta.com. The lab guide mimics/mirrors how Google presents their labs, with a step-by-step approach that includes code snippets, explanations, and expected outcomes.

# Welcome
TODO: intro -- premise of lab (banking app); availability of AIya (friendly assistant) throughout lab; etc.

TODO: AI DISCLAIMER

TODO:rest

## Objective
Understand the lab's purpose and setup.

TODO

## Prerequisites
To continue with this lab you **should know** or have a **basic understanding of** the following _(at a minimum)_:

- Fundamentals of web development (HTML, CSS, JavaScript)
- Fundamentals of backend (services) development
- Basic understanding of RESTful APIs
- Fundamentals of Identity & Auth0 (e.g. OAuth, OIDC)
    <br><sup>[_Learn_](https://auth0.com/docs/get-started/identity-fundamentals/introduction-to-auth0)</sup>
- Basic Authorization concepts
    <br><sup>[_Learn_](https://openfga.dev/docs/authorization-concepts)</sup>
- Understanding of, or willingness to learn, NextJS
    <br><sup>[_Learn_](https://nextjs.org/docs)</sup>

MORE

## What you will learn

- How to implement a "tool" (_and what it is_).
- How to augment LLM interactions with external data (_aka RAG_).
- How to protect sensitive information using [Auth0 FGA](https://auth0.com/fine-grained-authorization).
- How to utilize human-in-the-loop (async) authorization. [_coming soon_]

## What you will need

- A working laptop
  - with internet access
  - necessary permissions to _write code_ and _develop software_
- A _local_ code editor (e.g., Visual Studio Code)
  - Web IDEs have not been tested. _Use at your own peril._
- Access to the [Auth0 Demo Platform](https://demo.okta.com)

- Installed (and usable) software
  - `git`
    <br><sup>[Install](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)</sup>
  - Node.js
    <br><sup>[Install](https://nodejs.org/en/download/)</sup>
  - `pnpm` <-- Required. Do not use other package managers.
    <br><sup>[Install](https://pnpm.io/installation)</sup>

MORE?

## Expected Outcome
Familiarity with the lab's objectives and initial setup.

TODO

# Step 1: Get Setup

## Activate Auth0 Tenant

An Auth0 tenant has been created for you. In the top right corner of your screen, click the **Accept Invitation** button, or follow the activation instructions in the email you received from `no-reply@demo.okta.com` to the email address with which you registered.

Click on **Accept Invitation** and follow the steps. This will launch you into the Auth0 management dashboard.

You now have an Auth0 tenant for providing identity services for your applications. You will have access to this tenant for **30 days**.

## Clone the repo

> [!WARNING]
> _**You will need a Github account to continue.**_
>
> If you do not already have a Github account [_get one now_](https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2F&source=header-home).

TODO: clone repo steps

# Step 2: Get Started

## Start the app

Now that the repo has been cloned, go ahead and open it in your IDE.

TODO: add collapsible/optional how-to for opening cloned repo in VS Code.

Great! Now in the terminal run `pnpm install`

TODO: add how-tos/FAQs for various possible problems running pnpm install how to resolve

TODO: expand on this... It might take a few minutes blah blah blah

Once complete, go ahead and type `pnpm dev`. This should startup the app.

If you are seeing the following, you're ready to head to the next step!

TODO: Insert screenshot

If you're not... you might need to ask for assistance.

## Open the app

Congrats! You have spun up a basic chat app. Easy, right? 🤣

You should now be able to open up a web browser (we recommend Chrome) and navigate to `http://localhost:3000`.

> [!TIP]
> You can also simply press **⌘** + click the link in the terminal.
>
> On a PC? 🤨 You know the drill... _**CTRL**_ + click.

If everything is working as expected, AIya will kick off a conversation with you. AIya will be helping you complete the lab from this point forward.

As you progress through the lab, feel free to return here to reference any particular steps in case AIya is not making sense or you prefer a more concrete guide.



------- BREAK -------

<<IN PROGRESS>>

AIya guide

The first time a developer spins up the app (running `pnpm dev`) they have not yet configured their `.env` and they will not be authenticated.

When the app starts up the first message will automatically be sent (behind the scenes) and a pre-written response will be pseudo-streamed back to the client (bypassing you). You will pick up from there.

During this initial lab period **you are only permitted to perform the following:

- Basic introductory conversation/dialog.
- Explaining your role.
- Assist with the current task, setting up the app to login with Auth0.

**Do not do anything until the user is authenticated!** If a user attempts to interact with you outside your permitted role and they have configured Auth0 (determined by checking the system prompt) then use the `login` tool to generate a prompt for them to authenticate. If they have not yet configured Auth0, guide them.


# 🔐 Step 3: Configure Auth0

Now it’s time to wire up authentication so your app can actually log people in. Until this step is complete, AIya is running in “training wheels” mode. Once you’re logged in, the fun (RAG + FGA) really begins. 🚀

---

## Update `.env` (server-side variables)

Open the **root** of your project and locate the `.env` file. Add the following keys:

```bash
# Auth0 tenant domain (without https://)
AUTH0_DOMAIN=xxxxx.cic-demo-platform.auth0.com

# Client ID for your lab app
AUTH0_CLIENT_ID=abc123XYZdemo
```

👉 **Where do I find these values?**

* Navigate to the [Auth0 Demo Platform Dashboard](https://manage.cic-demo-platform.auth0app.com/dashboard).
* Select your tenant (the one created for this lab -- you probably already have it open!).
* Go to **Applications → Applications → \[the bAInk]**.
* Copy the **Domain** and **Client ID**.

---

## Update `.env.local` (server-side + secrets)

Next, open `.env.local` (create it if missing). Add:

```bash
# The application’s client secret (from Auth0 app settings)
AUTH0_CLIENT_SECRET=abc123SuperSecretKey

# A session secret (generate one yourself)
AUTH0_SECRET=<randomly-generated-value>
```

👉 **Where do I get these values?**

* `AUTH0_CLIENT_SECRET`: From the same **Applications → \[Lab App]** screen.
* `AUTH0_SECRET`: Generate using OpenSSL (or your favorite random generator):

  ```bash
  openssl rand -base64 32
  ```

> ⚠️ Never commit `.env.local` to git. It belongs _on your machine only_.

---

## Save & Restart

Just to be safe, restart your dev server so it picks up the new environment variables:

1. Terminate the app:
<br>`^` + `C` (Mac)
<br> *or*
<br>`Ctrl` + `C` (PC)

2. Start it again:
```bash
pnpm dev
```

## Test authentication

1. Open the app at [`http://localhost:3000`](http://localhost:3000).
2. Click **Sign up**.
3. Create a user (use an email you can access).
4. Pick a password. I know... passwords are so last year. But that's another lab for another day.

If everything is working:

* You’ll be redirected back to the app as an authenticated user.
* A message will be sent (automatically) to AIya that you’ve logged in.
* From here, accounts + transactions are automatically created for you behind the scenes. 🎉
  * Feel free to click on **Accounts** if you don't believe me!

If it doesn’t work:

* Check your `.env` and `.env.local` for typos.
* Open the browser console and/or server logs for error details.
* Ask AIya: *“I’m failing auth with error XYZ”* and paste the error message.

## ✅ Expected Outcome

By the end of this step you should:

* Be able to sign up / log in via Auth0.
* Have a working session in your app.
* Trigger AIya’s “you’re authenticated!” message.
* Unlock the rest of the lab steps.

---

# Step 4: Fine-grained Auth for Retrieval-Augmented Generation (FGA for RAG)

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
