import { toolRegistry } from '../tool-registry';

export const devcampLabGuide = `\
### dev{camp} Lab Guide

This guide outlines the steps of the dev{camp} lab that the user will be presented with on https://labs.okta.com. The lab guide mimics/mirrors how Google presents their labs, with a step-by-step approach that includes code snippets, explanations, and expected outcomes.

### Introduction

#### Objective
Understand the lab's purpose and setup.

#### What you _should_ already know
- Fundamentals of web development (HTML, CSS, JavaScript)
- Basic understanding of RESTful APIs
- (Fundamentals)[https://auth0.com/docs/get-started/identity-fundamentals/introduction-to-auth0] of Identity & Auth0
	- OAuth 2.0
	- OpenID Connect
	- Authorization basics

- How to implement basic authentication with Auth0

#### What you will learn

#### What you will need
- A code editor (e.g., Visual Studio Code)
- Node.js and npm installed
- Access to the Okta Developer Console

#### Expected Outcome
Familiarity with the lab's objectives and initial setup.

<EXPAND ON DETAILS>

### Step 1: Before you Begin



#### Instructions
Read the introduction to the lab, which explains the goals and what you will learn.






### Step 2: Get Setup
#### Objective
Set up your development environment.
#### Instructions
Follow the setup instructions to configure your local environment, including installing necessary dependencies and tools.
#### Expected Outcome
- A fully configured development environment ready for the lab exercises.
- Ability to create a new user in Auth0 via sign up and login/logout with ease.


### Step 3: Auth for Retrieval-Augmented Generation (RAG)

#### Objective
Learn how to use Auth0 for RAG in your application.

#### Why?
TODO: Add details as to why FGA for RAG is important.
To ensure that your application can securely access and retrieve user data while adhering to fine-grained authorization policies.

#### Instructions
1. Setup and configure an Auth0 FGA (Fine-Grained Authorization) instance.
2. Configure your application to use Auth0 FGA by implementing an FGA client (in FGA).
3. Ask Aiya to explain chunking and embedding (in general). The terminology is confusing, the concepts are not.
	- What is "chunking"? What are "documents"?
	- What are "embeddings"?
	- Explain persisting to DB is not required but comes with benefits.
		- Aiya to explain this app is using a local SQLite DB via Prisma but any persistence layer would suffice.
		- Aiya should then prompt user to review \`lib/db/queries/embeddings.ts\`
		- Aiya should also ask if the user would like to walk through the code in small pieces to fully understand it (or skip).
4.
3. Implement the \`ragAccounts\` tool to fetch account data using FGA for RAG.
4. Understand how to use fine-grained authorization to ensure only authorized data is accessible.

#### Expected Outcome
- Ability to retrieve account data securely using RAG.
- Understanding of how to implement fine-grained authorization in your application.

### Step 4: Async Authorization / Human in the Loop
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
- Understanding of how to implement human-in-the-loop workflows in your application.

`;

const step1 = `\
This is step 1 details.
`;
const step2 = `\
This is step 2 details.
`;
const step3 = `\
This is step 3 details.
`;
const step4 = `\
	At this point the user has either fully completed Step 3 or is in the process of validating their work.
	### Step 4
`;

export const getDevcampLabPrompt = () => {
	const prompt = [devcampLabGuide];

	if (prompt.length === 4 && toolRegistry?.ragAccounts) {
		// Has completed or is in the process of completing Step 3
		prompt.push(step4);
	}

	return prompt;
};
