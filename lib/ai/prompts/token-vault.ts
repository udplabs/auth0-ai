export const tokenVaultPrompt = `\
# Auth0 Token Vault

> Generative AI applications and agents often need to access data and perform actions in third-party systems to fulfill user requests.

For example, a sales assistant agent might need to:

* Read a user's calendar to schedule a meeting.
* Access a user's documents to summarize them.
* Connect to a CRM like Salesforce to retrieve customer information.

You can securely access third-party APIs on the user's behalf using Auth0’s **Token Vault**. Users are prompted to provide consent for your AI Agent to access their other applications, and that access is stored and managed by Auth0. For example, they can provide consent for your AI Agent to access their Google Calendar to view their schedule or set up meetings, or their Salesforce account to retrieve customer information.

## What is Token Vault

Auth0's Token Vault is a secure service for storing and managing tokens for third-party services. Your GenAI applications can use the access tokens from Token Vault to call external APIs on behalf of your users. This capability is essential for building trustworthy AI agents that can securely interact with third-party services from providers, such as Google, Microsoft, Salesforce, or any other API provider that uses OAuth 2.0.

Token Vault is built on top of OAuth 2.0 and provides federated connections to other Identity Providers (IdPs). There is no need to manage refresh tokens or build custom integrations per provider because Auth0 handles it all for you. You gain access to a wide range of external providers’ APIs and services, all through a single Auth0 integration.

### Why Is Calling APIs with Token Vault Important for GenAI

Hardcoding API keys or asking users to constantly re-authenticate with these external services is insecure and provides a poor user experience. Token Vault solves this by providing a secure mechanism to store and use the user's credentials (in the form of tokens) for these services.

By using Token Vault, you can:

* **Securely store and manage tokens**: Offload the complexity and risk of storing sensitive user credentials.
* **Maintain user context**: Enable agents to act on behalf of a specific user, ensuring that the agent only has the permissions that the user has granted.
* **Provide a seamless user experience**: Avoid repeatedly prompting users for authentication with external services.
* **Enhance security**: Prevent the exposure of tokens to the frontend or to the end-user.

### How it works

The process of using Token Vault involves the following key steps:

1. **User authentication and consent:** The [user links](https://auth0.ai/intro/account-linking) and authenticates with an external Identity Provider (e.g., Google) and grants your application permission to access their data by approving the requested OAuth scopes.
2. **Secure token storage:** Auth0 receives the federated access and refresh tokens from the external provider and stores them securely within Token Vault.
3. **Token exchange:** Your application can then exchange a valid Auth0 refresh token for a federated access token from Token Vault. This allows your application to obtain the necessary credentials to call the third-party API without the user having to re-authenticate. It also means your application does not need to store or manage any credentials.
4. **API call:** With the federated access token, your AI agent can make authorized calls to the third-party API on the user's behalf.

## Supported connections

Token Vault supports a variety of social and enterprise identity providers, including:

* Google
* Microsoft
* Slack
* GitHub
* Box
* OpenID Connect (OIDC)
* Custom Connections
* More providers coming soon!

By leveraging Auth0's Token Vault, you can build powerful and trustworthy GenAI applications that securely and seamlessly integrate with the broader ecosystem of APIs and services.

## Get started

To begin using Auth0 Token Vault in your GenAI applications, refer to the following resources:

### Quickstarts

- [Call Other's APIs on User's Behalf](https://auth0.ai/get-started/call-others-apis-on-users-behalf)

### Guides

- [Check Google Calendar Availability](https://auth0.ai/how-tos/check-google-calendar-availability)

- [List GitHub Repositories](https://auth0.ai/how-tos/list-github-repositories)

- [List Slack Channels](https://auth0.ai/how-tos/list-slack-channels)

- [Get Salesforce Opportunities](https://auth0.ai/how-tos/get-salesforce-opportunities)

### Sample Apps

- [Assistant0: Next.js + LangGraph](https://github.com/auth0-samples/auth0-assistant0/tree/main/ts-langchain)
- [Assistant0: FastAPI + LangGraph](https://github.com/auth0-samples/auth0-assistant0/tree/main/py-langchain)
- [Assistant0: Next.js + Vercel AI SDK](https://github.com/auth0-samples/auth0-assistant0/tree/main/ts-vercel-ai)
- [Assistant0: Next.js + LlamaIndex](https://github.com/auth0-samples/auth0-assistant0/tree/main/ts-llamaindex)
- [Auth0 AI SDK TypeScript samples](https://github.com/auth0-lab/auth0-ai-js/tree/main/examples/calling-apis)
- [Auth0 AI SDK Python samples](https://github.com/auth0-lab/auth0-ai-python/tree/main/examples/calling-apis)

### Learn more

- [Auth0 Docs for Token Vault](https://auth0.com/docs/secure/tokens/token-vault)
- [Call APIs with Token Vault](https://auth0.com/docs/secure/tokens/token-vault/call-apis-with-token-vault)
- [Configure Token Vault](https://auth0.com/docs/secure/tokens/token-vault/configure-token-vault)
`;
