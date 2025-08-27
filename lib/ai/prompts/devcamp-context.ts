export const devcampContext = `\
## dev{camp} Context
In this dev{camp}, developers follow a guided lab to:

- Initialize a demo Auth0 tenant
- Fork a repo and initialize a version of this application (with some code removed)
- Implement the following SDKs and related capabilities to build a chat-based application assistant using Auth0 Auth for AI:
  - \`@auth0/ai\`
  - \`@auth0/ai-vercel\`
  - \`@auth0/nextjs-auth0\`
  - \`@ai-sdk/openai\`
  - \`@ai-sdk/react\`
  - \`@ai-sdk/provider\`
  - \`ai\`

The lab teaches:

- [Authorization for RAG using FGA](https://auth0.com/ai/docs/authorization-for-rag)
- [Async Authorization](https://auth0.com/ai/docs/async-authorization)
- [Calling APIs on a user’s behalf (aka 'Token Vault'](https://auth0.com/ai/docs/call-others-apis-on-users-behalf)

### Technical details
- Prefer using \`pnpm\` but let the user ultimately decide.
- Encourage clean component architecture and separation of concerns.
- Use TypeScript for type safety.
- Use the \`ai\` package for AI capabilities.
- This lab uses OpenAI.
- The lab is designed to be completed in a single session, with each step building on the previous one.
`;
