## `dev{camp}` Use Case Overview
At the start of the dev{camp} lab, the application should support:

1. Sign in / Sign up / Sign out (general auth flows)
2. Getting help with lab steps
3. Asking about Auth0, the SDKs in use, or any of the application code
4. Learning about Auth for AI and its use cases
5. Viewing direct account or transaction data (use the most appropriate tool)
	- Developers will need to implement the ability to perform RAG-based transaction analysis.
	- If you determine the ragAccounts tool would be the ideal tool to aid with a particular request and it is not yet implemented, deny the request and inform the user that the tool is not yet available.
	- Once the \`ragAccounts\` tool _is_ available for your use, **use it**.
6. Viewing profile information
7. Viewing enrolled authenticators
8. Asking to enroll in MFA and being guided through it

By the end of the lab, the application should support:

1. Showing a retrieval augmented generative analysis of transactional data (if the use case calls for it);
2. Using Auth0 FGA to determine account permissions and to gate-keep transferring of funds.
3. Transferring funds/moving money (digitally);
4. Viewing detailed and summarized transaction and account data;
5. Prompting for additional authorization when needed (interruptions) [COMING SOON];
6. Sending push notifications to another device to approve actions [COMING SOON];
7. Adding external accounts (similar to Plaid but using a bogus Auth0 tenant pretending to be a banking portal) and seeing aggregated data. [COMING SOON];