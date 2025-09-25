## LAB STEP CONTEXT
- Lab Step: `step-06`
- Lab Guide Name: `06-module-06`
- Static Aiya response: none
- Implementation Code (show me the code):
  - `lib/auth0/ai/client.ts`
  - `lib/auth0/ai/with-async-authorize.ts`
  - `lib/ai/tools/transfer-funds.ts`
  - `lib/ai/tool-registry.ts`
  - `app/(chat)/api/chat/[id]/_handlers/post.ts`
- Relevant/Reference Code:
  - `lib/auth0/ai/handle-on-authorize.ts`
  - `lib/auth0/client.ts`
  - `lib/ai/model/index.ts`
  - `lib/ai/model/interrupts-middleware.ts`
  - `app/(accounts)/api/[id]/route.ts`

### TASKS

#### Task 1
- Enable CIBA grant in Auth0 Management dashboard for `the bAInk` application.
#### Task 2
- Enable guardian MFA in Auth0 Management Dashboard
#### Task 3
- Test account transfer by asking Aiya to move money.
- EXPECTED TO FAIL
#### Task 4
- Create an API for `http://localhost:3000/api/v1/accounts/transfers` in Auth0 management dashboard
- Create/enable `create:transfers` permission/scope in Auth0 Management Dashboard
#### Task 5
- Init the Auth0AI client <- Completed for them
- `lib/auth0/ai/client.ts`
#### Task 6
- Create `withAsyncAuthorization` wrapper in `lib/auth0/ai/with-async-authorization.ts`

- STEP 1
  - Init client <- Completed for them
- STEP 2
  - Guard against missing client <- Completed for them
- STEP 3
- Add custom scopes
  ```ts
    ...
    const scopes = ['openid', 'profile', 'email', 'create:transfer'];
    return auth0AI.withAsyncUserConfirmation({
      scopes /* ✅ STEP 3 */,
		...
  ```
- STEP 4
  - Return a promise for `userID` parameter
  ```ts
  ...
  userID: async () => {
    const user = await getUser();
    return user.sub;
  } /* ✅ STEP 4 */,
  ...
  ```
- STEP 5
  - Insert created `audience`
  ```ts
  ...
  } /* ✅ STEP 4 */,
  audience: 'http://localhost:3000/api/accounts/transfers' /* ✅ STEP 5 */
  ...
  ```
- STEP 6
  - Add `handleOnAuthorize` as handler for `onAuthorizationRequest`
  ```ts
  ...
  onAuthorizationRequest: handleOnAuthorize(writer) /* ✅ STEP 6 */,
  ...
  ```
- STEP 7
  - Normalize errors in `onUnauthorized`
  ```ts
  ...
  onUnauthorized: async (e) => {
    if (e instanceof AccessDeniedInterrupt) {
      // This indicates the user explicitly denied the authorization request.
      // This is where you could place custom logic if you desired
      // or even use the `writer` to send a message to the user.
    }

    if (e instanceof UserDoesNotHavePushNotificationsInterrupt) {
      // This indicates the user does not have MFA push notifications set up.
      // This is where you could place custom logic if you desired
      // or even use the `writer` to send a message to the user.
    }

    // *IMPORTANT*
    //
    // Wrap the error in application's custom API response format and
    // return an appropriate error message.
    //
    // If you do not wrap it in the expected response, the /chat POST
    // handler will not be able to process it correctly (and explode).
    return {
      status: 'error',
      dataCount: 0,
      message: e.message,
      error: e,
    };
  } /* ✅ STEP 7 */,
  ...
  ```
- STEP 8
  - Spread `options`
  ```ts
  ...
  		...options /* ✅ STEP 8 */,
  ...
  ```
- STEP 9
  - Inject tool
  ```ts
  ...
	})(tool); /* ✅ STEP 9 */
  ...
  ```
#### Task 7
- STEP 1
  - Wrap the actual `fundsTransfer` tool.
  ```ts
  export const transferFunds = /* ✅ TASK 8 */ (writer: UIMessageStreamWriter) =>
    /* ✅ TASK 7 - STEP 1 */ withAsyncAuthorization({
      bindingMessage: 'Please approve the transfer',
      tool: tool<z.infer<typeof inputSchema>, z.infer<typeof outputSchema>>({
        ...
  });
  ```
- STEP 2
- Import and Add `getCIBACredentials
  ```ts
  ...
  // ✅ TASK 7 - STEP 2
  const { accessToken } = (await getCIBACredentials()) || {};

  const response = await fetch(
    `${process.env.APP_BASE_URL}/api/accounts/${payload.fromAccountId}`,
    {
      method: 'POST',
      headers: {
        // ✅ TASK 7 - STEP 2
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    }
  );
  ...
  ```
- STEP 3
  - Update tool description to provide explicit instructions
  ```diff
  -  ask for clarification for that account only. The user will receive a push notification to provide confirmation. DO NOT require confirmation from the user -- they will confirm via push notification.',
  +  ask for clarification for that account only. Always confirm the details of the transfer with the user before continuing.',
  ```
#### Task 8
  - Enhance UX by wrapping `withAsyncAuthorization` to accept a datastream writer.
  ```ts
  ...
  export const transferFunds = /* ✅ TASK 8 */ (writer: UIMessageStreamWriter) =>
	/* ✅ TASK 7 - STEP 1 */ withAsyncAuthorization({
		writer,
		bindingMessage: 'Please approve the transfer',
  ...
  });
  ```
#### Task 9
- STEP 1
  - Open `lib/ai/tool-registry.ts`.
- STEP 2 - 3
  - Change `transferFunds` method
	```diff
	- transferFunds
	+ transferFunds()
	```
- STEP 4
  - Update `app/(chat)/api/chat/[id]/_handlers/post.ts`
  - line 81
	```diff
	- transferFunds,
	- // transferFunds: transferFunds(dataStream),
	+ transferFunds: transferFunds(dataStream),
	```
- STEP 5
  - line 110
	```diff
	- transferFunds,
	- // transferFunds: transferFunds(dataStream),
	+ transferFunds: transferFunds(dataStream),
	```
#### Task 10
  - Test the implementation
  - transferFunds should fail if user is not enrolled in push
  - Aiya will immediately call `enrollPush`
  - User wil enroll
  - Generative UI will render to 'Continue Transfer'
  - User hit's continue, hidden message is sent to Aiya
  - Aiya runs `transferFunds` again

Completion Criteria
- [x] Able to request Aiya transfer funds.
- [x] If not enrolled in push MFA, prompted.
- [x] Prompted with push MFA before transfer is completed.