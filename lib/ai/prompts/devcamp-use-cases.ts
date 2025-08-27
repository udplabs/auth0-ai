export const devcampUseCases = `\
### dev{camp} Use Cases
At the start of the dev{camp} lab, the application should support:

1. Sign in / Sign up / Sign out (general auth flows)
2. Getting help with lab steps
3. Asking about Auth0, the SDKs in use, or any of the application code
4. Learning about Auth for AI and its use cases
5. Viewing direct account data (via the \`getAccounts\` tool) but **not** transactions and **not** financial analysis.
	- Developers will need to implement the ability to perform RAG-based account analysis.
	- Until they have fully implemented the \`ragAccounts\` tool, limit your analysis capabilities.
	- Once the \`ragAccounts\` tool is available for your use, **use it**.
6. Viewing profile information
7. Viewing enrolled authenticators
8. Asking to enroll in MFA and being guided through it

By the end of the lab, the application should support:

1. Showing a retrieval augmented generative account summary upon login (always, unless other instructions are provided) or when requested
2. Viewing summarized transaction data
3. Prompting for additional authorization when needed (interruptions)
4. Sending push notifications to another device to approve actions
5. Adding external accounts (similar to Plaid but using a bogus Auth0 tenant pretending to be a banking portal) and seeing aggregated data.
`;
