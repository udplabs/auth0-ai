## LAB STEP CONTEXT
- Lab Step: `step-06`
- Lab Guide Name: `async auth`
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

#### `lib/auth0/ai/client.ts` Steps
- STEP 1 (done for them)
  - Define a mutable module-level singleton
  ```ts
  let singleton: Auth0AI | null;
  ```
- STEP 2 (done for them)
  - Create a public getter
  ```ts
  export function getAuth0AI() {
    if (!singleton) {
      singleton = new Auth0AI();
    }
    return singleton;
  }
  ```

#### `lib/auth0/ai/with-async-authorize.ts` Steps
- STEP 1 (done for them)
  - Initialize Auth0AI client singleton
  ```ts
  const auth0AI = getAuth0AI();
  ```
- STEP 2 (done for them)
  - Guard
  ```ts
  if (!auth0AI) {
		console.warn('Auth0AI client not initialized!');
		return;
	}
  ```
- STEP 3
  - Return properly configured `withAsyncConfirmation`
  [3.1] Add custom scope(s) (and add to params)
  ```tsc
  const scopes = ['openid', 'profile', 'email', 'create:transfer'];
  ```
  [3.2] Add `userID` parameter
  ```tsc
  userID: async () => {
    const user = await getUser();
    return user.sub;
  }
  ```
  [3.3] Add `audience`
  ```tsc
  audience: 'http://localhost:3000/api/accounts/transfers`
  ```
  [3.4] Add `handleOnAuthorize`
  ```tsc
  onAuthorizationRequest: handleOnAuthorize(writer),
  ```
  [3.5] Normalize errors
  ```tsc
  onUnauthorized: async (e) => {
    // ...
      return {
				status: 'error',
				dataCount: 0,
				message: e.message,
				error: e,
    };
  }
  ```
  [3.6] Ensure pass-thru options are set
  ```tsc
  {
    // ...
    ...options
  }
  ```
  [3.7] Ensure tool is actually injected
  ```tsc
  //...
  {(
    //...
  })(tool);
  ```

#### `lib/ai/tools/transfer-funds.ts` Steps
- STEP 1
  - Wrap the existing tool with `withAsyncAuthorization`.

  [1.1] Import `withAsyncAuthorization`.
    ```ts
    import { withAsyncAuthorization } from '@/lib/auth0/ai/with-async-authorization'
    ```
  [1.2]
    ```ts
    export const transferFunds = withAsyncAuthorization({
      bindingMessage: 'Please approve the transfer',
      tool: tool<z.infer<typeof inputSchema>, z.infer<typeof outputSchema>>(/* ... */),
    });
    ```
- STEP 2
  - Use `getCIBACredentials` to retrieve an access token.
  [2.1] import `getCIBACredentials`
    ```ts
    import { getCIBACredentials } from '@auth0/ai-vercel`
    ```
  [2.2] Call `getCIBACredentials` to retrieve the user's credentials.
    ```ts
    ({
      //...
      execute: async (payload) => {
        try {
          const { accessToken } = getCIBACredentials() || {};
          //...
        } ...
      }
    })
    ```
  [2.3] Add the `accessToken` to the Authorization header as a Bearer token.
    ```ts
    const response = await fetch(
      `${process.env.APP_BASE_URL}/api/accounts/${payload.fromAccountId}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      }
    );
    ```
- STEP 3
  - Transform the wrapper into a higher-order factory that accepts a Vercel datastream `writer`.
  ```ts
  export const transferFunds = (writer?: UIMessageStreamWriter) =>
    withAsyncAuthorization({
      writer,
      /* ... */
    });
  ```
- STEP 4
  - Modify the tool description/instructions
  ```diff
  - `Always confirm the details of the transfer with the user before continuing.`
  + `DO NOT require confirmation from the user -- they will confirm via push notification.`
  ```

#### `lib/ai/tool-registry.ts` Steps
- STEP 1
  - Change `transferFunds` -> `transferFunds()`
  ```ts
  export const toolRegistry = {
    enrollMfaPush,
    getAccounts,
    getAccountList,
    getStepGuides,
    getReferenceFile,
    getStepCode,
    getTransactions,
    getUserProfile,
    getWeather,
    transferFunds(),
    userSettings,
  } satisfies ToolSet;
  ```

#### `app/(chat)/api/chat/[id]/_handlers/post.ts`
- STEP 1
  - Remove line 109 and uncomment the following line.
  ```diff
  - transferFunds,
  - // transferFunds: transferFunds(dataStream),
  + transferFunds: transferFunds(dataStream),
  ```


Completion Criteria
- [x] Able to request Aiya transfer funds.
- [x] If not enrolled in push MFA, prompted.
- [x] Prompted with push MFA before transfer is completed.