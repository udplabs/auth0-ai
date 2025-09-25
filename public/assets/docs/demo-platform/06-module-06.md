## Objective

Implement **Human-in-the-Loop approval(s)** in your application to secure agentic actions using asynchronous authorization via **Client-Initiated Backchannel Authorization (CIBA)**. This will allow the AI agent to engage a user on demand for sensitive actions. Auth0 will be used to request the user’s permission to complete an authorization request.

#### *Technical Details*
The Auth0 AI SDK offers a few different convenience methods to help with Vercel’s AI SDK. In this module we will be implementing a custom wrapped version of <kbd>withAsyncAuthorization</kbd> as well as the <kbd>getCIBACredentials</kbd> method in order to obtain a JWT for API authorization.

## Description

**the bAInk** currently requires all users to transfer their funds through the online web portal or mobile application. The process is traditional and the team feels this experience could be improved. The executives at **the bAInk** have determined that they would like to allow Aiya to transfer funds on behalf of their customers but they emphasized that this was extremely risky. They need to ensure that Aiya is capable of completing this action in a secure fashion. This is where Auth0 and <abbr title='Client-Initiated Backchannel Authorization'>CIBA</abbr> can help bridge the gap.

## Introduction

The **Asynchronous Authorization** process is dependent on a decoupled authentication flow where a user provides consent on a trusted device, such as their mobile phone, to complete a specific transaction or action.

Some common use cases for **Asynchronous Authorization** are:
- **Transactional approvals**: An agent processing a purchase order may need a user’s final approval before funds are dispersed.
- **Accessing sensitive data**: An agent might need to access protected financial information to answer a query
- **Executing high-privilege tasks**: An agent may need permission to create a dispute ticket on behalf of a user for an unknown credit card charge.

### How it works

The <abbr title='Client-Initiated Backchannel Authorization'>CIBA</abbr> Flow does not rely on a client application redirecting the user via the browser to perform the login/authentication process. Instead, the client application directly calls the OpenID Provider via a backchannel request to initiate the authentication flow.

The <abbr title='Client-Initiated Backchannel Authorization'>CIBA</abbr> Flow does not create or update a grant. As a result, if the client application requests a given scope via the <abbr title='Client-Initiated Backchannel Authorization'>CIBA</abbr> Flow, it won’t be stored as a grant if the user consents. This means that if configured, a different authentication flow (grant type) requesting the same scope(s) must prompt the user again for OAuth consent.

Because the <abbr title='Client-Initiated Backchannel Authorization'>CIBA</abbr> Flow does not have sessions i.e. browser cookies, the user does not have to be authenticated before a <abbr title='Client-Initiated Backchannel Authorization'>CIBA</abbr> challenge. If they were already authenticated before a <abbr title='Client-Initiated Backchannel Authorization'>CIBA</abbr> challenge, their existing session is not affected.

<figure>
	<img src=”https://cdn.demo.okta.com/labs/devcamp-agentic/assets/images/Module06/images/ciba.png”/>
	<figcaption>
		<ul>
			<li style="list-style-type:'❶'">The <b>AI Agent</b> (<i>server</i>) initiates some action – like buying event tickets.
			<li style="list-style-type:'❷'">The <b>AI Agent</b> service begins polling waiting for a response</li>
			<li style="list-style-type:'❸'">The authorization server (<i>Auth0</i>) receives a <kbd>POST</kbd> request and triggers the notification via your configured service.</li>
			<li style="list-style-type:'❹'"><kbd>OPTIONAL:</kbd> <i>If using <abbr title=”Rich Authorization Request”>RAR</abbr></i> the native app retrieves the <kbd>bindingMessage</kbd> containing the “rich” consent/transactional details – such as the price and/or number of tickets being purchased.</li>
			<li style="list-style-type:'❺'">The <b>user</b> interacts with their device and approves/denies the request.</li>
			<li style="list-style-type:'❻'">The authorization server completes the flow and the <b>AI Agent</b> service retrieves the result via the <kbd>/token</kbd> endpoint.</li>
		<li style="list-style-type:'❼'">The <b>AI Agent</b> receives tokens and completes the action</li>
		</ul>
	</figcaption>
</figure>

### Prerequisite

*For this task, we will be using the **Auth0 Guardian app**. If you do not currently have it, you will need to download it from either the **Apple App Store** or **Google Play Store**.*

<br>

| App Store                                        |     | Google Play                                             |
| ------------------------------------------------ | --- | ------------------------------------------------------- |
| ![App Store](./assets/Module06/images/apple.png) |     | ![Google Play](./assets/Module06/images/googleplay.png) |

<br>

---
### ℹ️ Auth0 Guardian vs Auth0 Guardian SDK: *What’s the diff?*

***Auth0 Guardian*** is a mobile application for iOS and Android devices that allows users to complete <abbr title='Multi-factor Authentication'>MFA</abbr> with push notifications or temporary one-time passwords. It can deliver push notifications to users’ enrolled devices (typically mobile phones or tablets) or generate one-time passwords directly within the app. Users can then quickly respond to these push notifications or retrieve a one-time password to complete their login.

***Auth0 Guardian SDK*** lets you embed the same push and one-time password capabilities directly inside your own native application. Auth0 handles the backend (unless you opt for AWS SNS), device enrollment, and verification – *but your app owns the UX*.

#### Why Implement the SDK?
- **Own the UX & brand.** No app-switching to Auth0 Guardian; seamless, on-brand approvals in your app.
- **Stronger step-up flows.** Gate push approvals with device biometrics (Face/Touch/Android Biometrics) before confirming.
- **Better control & telemetry.** Customize enrollment/notifications, tie trusted devices to users, and surface device state to your app logic.
- **Offline resilience.** Support OTP fallback when the device has poor connectivity.
- **Fewer support hiccups.** Build recovery/reset flows that match your product, not a generic app.
- **Works with advanced flows.** Plays nicely with Universal Login, APIs, and async auth (aka <abbr title='Client-Initiated Backchannel Authorization'>CIBA</abbr>) – used in this very task!

<br>

|                             | Auth0 Guardian                            | Auth0 Guardian SDK               |
| --------------------------- | ----------------------------------------- | -------------------------------- |
| Push Notifications          | ⚠️ Auth0-branded                           | ✅ Fully customizable             |
| One-time password           | ✅                                         | ✅                                |
| Biometric Security          | ⚠️ User opt-in                             | ✅ Fully customizable             |
| Telemetry                   | ⚠️ Basics via logs/monitoring              | ✅ Fully customizable             |
| Offline fallback            | ⚠️ TOTP/backup codes (*via certain flows*) | ✅ You control                    |
| Rich Authorization Requests | ❌ *Coming soon!*                          | ✅ Fully customizable             |
| Implementation Effort       | ✅ Turn-key / Toggle                       | ⚠️ Custom code                    |
| Hosted Service              | ✅ Auth0                                   | ⚠️ (AWS SNS or Platform Specific) |

---

<br>

### 🚀 <span style="font-variant: small-caps">Let’s get to work!</span>

<br>

## Task 1: Enable CIBA

### Background
Client-Initiated Backchannel Authentication (<abbr title='Client-Initiated Backchannel Authorization'>CIBA</abbr>) is an OpenID Foundation specification that defines the decoupled flow referenced earlier, allowing a client application (Aiya’s backend/server) to initiate an authentication request without direct interaction from the user on the same device. This allows the user to approve or deny the request on a separate, trusted device (like a mobile phone), in this case, via a mobile push notification to the Auth0 Guardian app.

### <span style="font-variant: small-caps">Goal</span>
Modify your Auth0 tenant configurations to enable CIBA for the bAInk client application.


#### <span style="font-variant: small-caps">Steps</span>

1. From the Okta Lab Guide Launch Pad, click Launch to access your Auth0 Tenant (*if not already open*).

    ![Launch Pad](./assets/Module06/images/launchpad.png)

2. In the Auth0 tenant, navigate to **Applications** → **Applications**

    ![Apps](./assets/Module06/images/apps.png)

3. Click on **the bAInk** application

    ![the BAInk](./assets/Module06/images/baink.png)

4. Scroll to the bottom until you see **Advanced Settings**. Click on **Grant Types** and enable **Client Initiated Backchannel Authentication (CIBA)**.

    ![CIBA](./assets/Module06/images/enable-ciba.png)

5. Click **Save**.

<br>

---

#### <span style="font-variant: small-caps">Congrats!</span>
*You have completed Task 1.*

---

<br>

## Task 2: Enable Guardian Push

### <span style="font-variant: small-caps">Goal</span>
In order to actually *use* push notifications for MFA, we need to ***enable it***!

#### <span style="font-variant: small-caps">Steps</span>

1. From the **Auth0 Management Dashboard** navigate to **Security** → **Multi-factor Auth** → **Push Notification using Auth0 Guardian**.
2. Toggle the feature **ON**.

    ![Guardian](./assets/Module06/images/guardian.png)

<br>

---

#### <span style="font-variant: small-caps">Congrats!</span>
*You have completed Task 2.*

---

<br>

## Task 3: Try It Out

### <span style="font-variant: small-caps">Goal</span>

Before we move forward with the next task in this module, let’s see what the app can do *before* we make any changes and maybe learn a few things.

#### <span style="font-variant: small-caps">Steps</span>

1. Return to the app: [http://localhost:3000](http://localhost:3000).
2. Open the upper left sidebar menu (*square button*), and click on **Accounts**.
3. Choose an account, *any account*, and click on **Transfer**.
4. Select an account to transfer to as well as a dollar amount (*go crazy!*).
5. Click **Transfer Now**.

***Did it work? Was it supposed to?***

*What do you think?* Should you have been able to move funds? 🤔

You *are*, after all, authenticated so... **yes**! ***You should be able to transfer funds directly.***

For our application (*and demo purposes*) we have **two** "services" that exist:
- A ***user*** transfer service.
- An ***agent*** transfer service.

In a real-world application this may not make sense, but we are not in the real-world, right? 😀

<br>

> [!NOTE]
>
> There are a lot of different ways to handle this scenario, including using <abbr title='Fine-Grained Authorization'>FGA</abbr>.
>
> If you would like to discuss alternative approaches, either *Ask Aiya* or ask a lab attendant.

<br>

### <span style="font-variant: small-caps"><i>Let's take a look at the code</i></span>

#### <span style="font-variant: small-caps">Steps (continued)</span>

6. In your code editor, open `app/(accounts)/api/accounts/transfers/route.ts`.

7. *What do you notice? Take a moment to read through the code and understand the implementation.*
   - This is a fairly basic <kbd>POST</kbd> call that interfaces with a data API (*which then interfaces with a database*). Because this endpoint is part of our NextJS application, "authorization" *could* have easily be handled using Auth0’s SDK.
   - Assuming the user is authenticated, the <kbd>POST</kbd> endpoint completes the transfer.

#### *But what about Aiya?*

8. Navigate back to the app (`https://localhost:3000`), and start a new chat by clicking the <kbd>+</kbd> button.
9. Ask Aiya to transfer $25 from one account to another - for example: ```transfer $25 from checking to savings``` (*or whichever account you have available*).
10. Wait for it…
       - Aiya is fetching an account list behind the scenes to be able to build the request payload (account ids, etc.).
11. Aiya will ask to confirm the transaction. Go ahead and **confirm** by typing ```Yes``` (*or something similar*).

	![Transfer Confirmation](./assets/Module06/images/prelim-init-transfer.png)

12. **Expected it to work?** It's ok! You ***should*** be seeing an <mark>error</mark> (*failure*).

	![Transfer Error](./assets/Module06/images/prelim-transfer-err.png)

#### But why? It worked for ***me***! Why not Aiya?

*Because our application has security! Or, it at least demonstrates some security.* 😆

### <span style="font-variant: small-caps"><i>Let's take a look at the code</i></span>

#### <span style="font-variant: small-caps">Steps (continued)</span>

13. Open `app/(accounts)/api/accounts/[id]/route.ts`.

14. *What do you notice? Take a moment to read through the code and understand the implementation.*
15. You will notice this endpoint uses the same <kbd>transferFunds</kbd> data service but this one has implemented <mark>JWT validation</mark>.

	<br>

	> [!NOTE]
	> For the demo, we are essentially simulating a “public” endpoint that could be called by anyone/anything.
	>
	> *We know, it might not make sense in a NextJS app. Just go with it -- chances are you would likely deploy this as a separate service.*

	<br>

16. The <kbd>verifyJwt</kbd> function is specifically looking for:
	- your tenant as the <kbd><abbr title='issuer'>iss</abbr></kbd>;
	- a specific/custom audience + your tenant’s <kbd>/userinfo</kbd> audience;
	- the token <kbd><abbr title='subject or user_id'>sub</abbr></kbd>;
	- the presence of the <kbd>create:transfer</kbd> scope.

	**REMINDER**: This approach is to demonstrate how you *could* (*and probably should*) treat your Agents differently than your users. An advantage to this approach is the addition of a lot of flexibility/control over when/how agents can act on behalf of a user – API audiences, scopes, token lifetime, custom claims, etc.

<br>

> [!NOTE]
>
> Want to take it further? Maybe use token exchange?
>
> *That gets into advanced API authorization, which is outside the scope of this module.*
>
> Still curious? Let’s chat!

<br>

---

#### <span style="font-variant: small-caps">Congrats!</span>
*You have completed Task 3.*

#### <mark><i>Let's keep moving!</i></mark>

---

## Task 4: Create an API

### <span style="font-variant: small-caps">Goal</span>

Create and configure an API in Auth0 in order to be able to send an <kbd>audience</kbd> in the request.

> [!NOTE]
>
> Curious *why* we are creating an API? Feel free to ask Aiya (or a lab attendant).

#### <span style="font-variant: small-caps">Steps</span>

1. From your Auth0 management dashboard, navigate to **Applications** → **APIs**.
2. Click **+Create API**.
3. Enter `http://localhost:3000/api/accounts/transfers` for both the **Name** and **Identifier**.

  	*You are welcome to change this value, just make sure to update it elsewhere throughout the application*.

	![Auth0 Create API](./assets/Module06/images/create-api.png)

4. Click **Create**.

5. Click on **Permissions**

6. Under **Add a Permission** and enter:

  | Field           | Value                 |
  | --------------- | --------------------- |
  | **Name**        | `create:transfer`     |
  | **Description** | `Initiate a transfer` |

7. Click **+ Add**

	![Auth0 API Settings](./assets/Module06/images/create-permission.png)

8. Now, navigate to the **Machine to Machine Applications** tab.

9. Scroll down to **the bAInk** application and toggle **ON** for Authorization.

10. Click on the expand <kbd>⌄</kbd> button.

11. Select the newly created permission: <kbd>create:transfer</kbd>.

	![Auth0 API Settings](./assets/Module06/images/create-transfer-perm.png)

12. Click **Update** and **Continue**.

---
#### <span style="font-variant: small-caps">Congrats!</span>
*You have completed Task 4.*

Everything just works perfectly now, right? 🤣 <mark><i>Let’s keep moving…</i></mark>

---

## Task 5: Init AI Client

Similar to how both the Auth0 NextJS client and FGA client need to be initialized, so too does the Auth0 AI client.

#### <span style="font-variant: small-caps">Steps</span>
1. In your code editor, open `lib/auth0/ai/client.ts`.
1. Take a moment to review the code. *It should look familiar!*
   	- We used a very similar pattern when implementing the <abbr title='Fine-grained Authorization'>FGA</abbr> client in `lib/auth0/fga/client.ts`.
1. ***There isn’t anything to do here*** – we just wanted you to be aware that in order to proceed you would need to instantiate the Auth0AI SDK (*somewhere*).

<br>

> [!NOTE]
>
> Keep in mind that the pattern used in this lab to spin up the various Auth0 clients is *not** necessarily how you might do it in your application.
>
> We have to use some "trickery" (*sometimes*) to keep the demo app from going 💥.

<br>

---
#### <span style="font-variant: small-caps">Congrats!</span>
*You have completed Task 5.* 😁🥳

---

<br>

## Task 6: Create Wrapper

### <span style="font-variant: small-caps">Goal</span>
Return an instance of `auth0AI.withAsyncUserConfirmation` that:
1. Properly handles when the user starts authorization and ***streams*** status updates/messages to provide for a better UX.

2. Properly handle errors/failures within the SDK framework.

***This one might get a bit more advanced! Are you ready to learn?***

<span style="font-variant: small-caps; font-weight: 700">Setup</span>

- Open your code editor and open `lib/auth0/ai/with-async-authorization.ts`.

<br>

> [!TIP]
> *Similar to previous modules, you will notice the code is heavily documented with numerous instructions/guides to aid you in completing the task.*

<br>

<span style="font-variant: small-caps; font-weight: 700">Steps</span>

1. ~~Initialize Auth0AI client singleton.~~ _<span style='color: green; font-variant: small-caps'>← Done for you</span>_

2. ~~Guard against a missing Auth0AI client (*defensive coding*)~~ _<span style='color: green; font-variant: small-caps'>← Done for you</span>_

3. Add the custom scope (aka 'permission') we created earlier to the existing scopes array.

4. Ensure the <kbd>userID</kbd> parameter is a <mark>promise</mark> that returns the user’s ID.

	i.e. <kbd>getUser</kbd> → <kbd>user.sub</kbd>

5. Insert the <kbd>audience</kbd> value we created earlier.

6. Enhance <kbd>onAuthorizationRequest</kbd> by plugging in our custom <kbd>handleOnAuthorize</kbd> helper function.

	<br>

	> [!NOTE]
	>
	> TODO: REVIEW EXPLANATION
	>
	> The <kbd>handleOnAuthorize</kbd> is a small factory (helper) function designed to provide a more intuitive user experience.
	>
	> If a Vercel datastream writer is provided, the function enables directly streaming messages to the user (*bypassing the model*) so that they understand what is happening -- otherwise it can be a confusing experience.
	>
	> The function does not actually run the tool, it simply emits events.
	>
	> This greatly enhances user responsiveness and ultimately improves interaction with Aiya.

<br>

7. Ensure any errors (i.e. from `onUnauthorized`) are *normalized*.

  	This callback provides a lot of opportunity to improve the UX even further. This is where you *could* handle cases such as where the user *denies* authorization.

	The <kbd>handleOnAuthorize</kbd> is meant to provide you with a *pattern* you can use to differentiate between denial, missing enrollment, or generic errors.

	The SDK provides normalized error codes to make this easier. For example:
      - <kbd>AccessDeniedInterrupt</kbd>
      - <kbd>UserDoesNotHavePushNotificationsInterrupt</kbd>

		*Check out the SDK types (`node_modules/@auth0/ai/dist/esm/interrupts/CIBAInterrupts.d.ts`) for more.*

	<br>

	> [!TIP]
	>
	> *Not sure what to do here?*
	>
	> This wrapper returns to a *tool*, which then returns to the *streaming function*.
	>
	> How does the *tool* handle/return errors? 🤔
	>
	> Refer to **Step 4**: try passing an *async function* that returns an error object.
	> 	- The goal is to ensure that an error is returned *gracefully* if it occurs and does not 'throw' or *halt* the current action entirely.
	> 	- If the function halts processing the Agent will not be able to properly triage and find alternatives solutions.

	<br>

8. Now, spread the incoming options so they are passed along to <kbd>withAsyncUserConfirmation</kbd>.

	Not sure what a "spread" is? *Ask Aiya*!

	```diff
	- // 	...options, /** 👀 ✅ Step 8: The Auth0AI wrapper spreads the same options as our wrapper! TypeScript interface to the rescue? 🧐 */
	+ ...options,

9.  Lastly, make sure the tool being wrapped is *actually injected*!
	```diff
	- // })(tool) /** ✅ Step 9: Don't forget to inject the `tool` being wrapped! */;
	+ })(tool);
	```

---
#### <span style="font-variant: small-caps">Congrats!</span>
*You have completed Task 6.*

You successfully...
<ul>
  <li style="list-style-type:'✅ ';">
    enriched the object passed to <kbd>auth0AI.withAsyncUserConfirmation</kbd> with values for the custom scope and audience
  </li>
  <li style="list-style-type:'✅ '">
    implemented and passed custom async functions for <kbd>userID, onAuthorizationRequest, onUnauthorized</kbd>
  </li>
  <li style="list-style-type:'✅ '">
    laid the groundwork and implemented the wrapper function needed to allow Aiya to transfer funds on your behalf!
  </li>

</ul>

---

<br>

## Task 7: Wrap the Tool

#### <span style="font-variant: small-caps">Goal</span>
Use the Auth0AI <kbd>withAsyncConfirmation</kbd> we just wrapped to ensure the <kbd>transferFunds</kbd> tool does not run without proper authorization.

This will be accomplished by requiring Aiya to fetch a *fresh and ephemeral* access token.

<span style="font-variant: small-caps; font-weight: 700">Setup</span>

- From your code editor, open `lib/auth0/ai/transfer-funds.ts`.

<span style="font-variant: small-caps; font-weight: 700">Steps</span>

1. Wrap <kbd>transferFunds</kbd> with <kbd>withAsyncAuthorization</kbd>.

	You will need to:
      - import the function from the `lib/auth0/ai` directory.
      - *wrap the tool* -- instead of simply returning it, pass it as the <kbd>tool</kbd> parameter of <kbd>withAsyncAuthorization</kbd>.
      - <kbd>transferFunds</kbd> should ultimately *still return* the original tool.
      - <kbd>bindingMessage</kbd> can be a simple string like `Please approve the transfer.`

	<br>

	> [!NOTE]
	>
	> ***What is <kbd>bindingMessage</kbd>?***
	>
	> When using the Auth0 Guardian SDK this message can be displayed to the user in order to provide context about the request. It is *not* used in our demo but still required.

	<br>

2. Import <kbd>getCIBACredentials</kbd> and use it to retrieve an <kbd>accessToken</kbd> to be sent in the <kbd>Authorization</kbd> header of the API call.

3. Update the tool <kbd>description</kbd>.
	- Right now the tool states to always require confirmation. However, we are implementing confirmation via push notification so having Aiya confirm first would be very annoying.
	- Read the <kbd>description</kbd> and modify the instructions so Aiya *never* asks for confirmation.

		<br>

		> [!TIP]
		> When instructing <abbr title='large language models'>LLMs</abbr> be explicit but concise.

		<br>

---
#### <span style="font-variant: small-caps">Congrats!</span>
*You have completed Task 7.*

At this point you could *technically* use the tool!

If Aiya attempted to run the tool, the Auth0 AI <kbd>withAsyncConfirmation</kbd> would be triggered and the user would receive a push notification (*if enrolled*).

However, the user experience is lacking. What if they are not enrolled? Will they know they just received a push notification?

Feel free to give it a try, just know you'll be missing out on a better UX! ***We recommend you *wait* until you have finished the module.***

---

<br>

## Task 8: Enhance the UX

#### <span style="font-variant: small-caps">Goal</span>
To enhance the user's experience we need a way to *inject* the streaming writer into `withAsyncAuthorization` so the authorization portion of the flow (where the push notification gets sent) can stream *status messages* to the chat UI.

*The plain exported tool has no place to accept that writer.*

Although this is *not* a *requirement* to enable the core feature functionality, it sure does make for a better user experience!

#### <span style="font-variant: small-caps"><em>What</em> are we doing?</span>

I'm glad you asked...
- We are going to “lift” (aka *wrap*) the existing wrapper into a factor function that takes <kbd>writer</kbd> (as an argument) and returns the authorized tool instance.
- Then we call it a "higher-order factory" to sound cool and potentially confuse you. 😎

---
##### What is a “higher-order factory”?***

*A long, long time ago...* 🤭 ...*jk*

It is just a *fancy word for a fancy function*!

##### What a higher-order factory <span style="font-variant: small-caps"><em>is</em></span> and what it is <span style="font-variant: small-caps"><em>not</em></span>

We won't dive *too deep* into Javascript, but maybe we can still teach a few things:

- It is <span style="font-variant: small-caps; font-weight: 700">not</span> a <kbd>class</kbd>.
  - Javascript is not *entirely* an object-oriented programming language. **Surprise**! But, it also ***is*** and object-oriented programming language. 😵‍💫

  	JavaScript is a *multi-paradigm language* with a *prototype-based object system*. It supports OOP (encapsulation, inheritance, polymorphism), but its mechanics differ from *“classical”* class-based OO

  - For quite some time there was no such thing as a class! Classes were introduced in ES6.

  	A <kbd>class</kbd> is *a syntactic sugar coating* around constructor functions + prototypes. In other words, just *an alternative way* of doing things.
  - JS classes…
	- create instances with methods shared on the prototype;
	- support <kbd>extends</kbd>, <kbd>super</kbd>, static methods, and now (as of ES2022) <kbd>#private</kbd> fields.

- It <span style="font-variant: small-caps; font-weight: 700">is</span> a <kbd>factory</kbd>.
  - A factory is a function that returns an object, often containing methods and/or private state (via closures).
- It is <span style="font-variant: small-caps; font-weight: 700">not</span> a [*currying function*](https://javascript.info/currying-partials). Although it ***is*** similar to one,
- It <span style="font-variant: small-caps; font-weight: 700">is</span>, technically, a *wrapper*.
  - Or, more accurately, a *wrapper* around a *wrapper*.

***If you are wanting to know more, ask Aiya (or flag down a lab attendant and test their knowledge!).***

---

#### <span style="font-variant: small-caps"><em>Why</em> are we doing this?</span>

In the Vercel AI SDK, the datastream writer is what ***streams messages from Aiya to the chat interface***.

***To control the datastream writer, you control the world!*** OR maybe just Aiya? That's prety good too. ¯\\\_(ツ)_/¯

*Either way*, it's a powerful tool.

In order to properly update the UI and provide a better user experience, <kbd>withAsyncAuthorization</kbd> needs the datastream writer (specifically for <kbd>onAuthorizationRequest</kbd>).

Without being able to stream message updates, the user is left with a loading indicator and no indication of what is happening. Not good!

<br>

### <span style="font-variant: small-caps">Let's get to work!</span>


#### <span style="font-variant: small-caps">Steps</span>

1. Open `lib/ai/tools/transfer-funds.ts`. *This is the tool that Aiya uses to transfer funds.*

   <br>

	> [!TIP]
	> *Similar to previous modules, you will notice the code is heavily documented with numerous instructions/guides to aid you in completing the task.*

	<br>

2. Implement a “higher-order factory” (remember, it's just *fancy name for a fancy function*) that injects a datastream <kbd>writer</kbd> into the <kbd>withAsyncAuthorization</kbd> function.

	<br>

	> [!IMPORTANT]
	> ***This can be a confusing concept, but it's an incredibly easy task. Stay with us!***
	>
	> <span style="font-variant: small-caps; font-weight: 900">tl/dr</span>
	>
	> **Before Factory**
	>
	>  We would have used the <kbd>Auth0AI</kbd> wrapper, which, similar to our wrapper, permits passing additional arguments while maintaining the original tool's shape.
	>
	> **After Factory**
	>
	> We can pass <kbd>writer</kbd> into the <kbd>Auth0AI</kbd> function to be used before returning the original tool.

	<br>

	***What are we actually doing?***

	We are basically copying a similar concept used by Auth0 to *create* the <kbd>withAsyncConfirmation</kbd> function. Don't reinvent the wheel, right?
      - We need to pass the datastream <kbd>writer</kbd> into the <kbd>withAsyncAuthorization</kbd> so that we can *use it* in the <kbd>onAuthorizationRequest</kbd> to stream updates to the user.
      - But we *also* need to keep the tool response in the expected shape for the Vercel SDK.

	***How?***

	A “higher-order factory function” (*of course*)! We need to “wrap the wrapper”.

  	It's easy. Just create a function that *returns* the wrapped tool.

	<br>

	> [!TIP]
	>
	> We will give you a hint...
	>
	>
	> ```diff
	> - export const transferFunds = /* ✅ TASK 7 - STEP 1: */ withAsyncAuthorization({
	> + export const transferFunds = /* ✅ TASK 8 */ () => withAsyncAuthorization({...
	> ```

	<br>

---
#### <span style="font-variant: small-caps">Congrats!</span>
*You have completed Task 8.*

Super easy, right? It just sounds complicated.

*But now not only do you know how to 'inject' the datastream writer, you have a better understanding of how the Auth0 AI SDK itself works.*

***Imagine all the things you can do now!***

---

<br>

### Task 9: Update Registry

This one is an easy one, we *promise*!

### <span style="font-variant: small-caps">Goal</span>

In order for Aiya to know that a tool exists, the tool needs to be added to the *tool registry*.

We attempted a transfer with Aiya earlier so the tool is *clearly in the registry*. So what are we doing? In Task 8 we just ***changed*** the tool. New tool → new... *adventure*? ¯\\\_(ツ)_/¯

In the previous task we transformed <kbd>transfer-funds</kbd> into a higher-order factory function. ***Now we need to call it***.

*Let’s make sure it is entered into the registry correctly.*

<span style="font-variant: small-caps; font-weight: 700">Steps</span>

1. Open `lib/ai/tool-registry.ts`.
2. Simply change <kbd>transferFunds</kbd> → <kbd>transferFunds()</kbd>. 🙌
	```diff
	- transferFunds
	+ transferFunds()
	```

***But wait, there's more!***

3. Open ```app/(chat)/api/chat/[id]/_handlers/post.ts```
4. Scroll to **line 81** and ***uncomment*** ```transferFunds()```. You *might* see a red squiggly, *this can be ignored* (for now). ```transferFunds()``` does not require an arg to compile and run. The writer arg is *optional*
	```diff
	- // transferFunds: transferFunds(),
	+ transferFunds: transferFunds(),
	```

***But, where is the datastream writer? I thought we were injecting it?***

Ultimately we *do* want to call <kbd>transferFunds</kbd> with a datastream writer, but we do not have that available, *yet*. That is why it was necessary to make the <kbd>writer</kbd> *optional*.

Once the datastream writer is available, in the actual <kbd>createUIMessageStream</kbd> execute function, we can *re-initialize* transferFunds with the datastream writer. But we still need to inject it earlier so that Aiya is aware it exists, otherwise it just gets messy.

Nifty trick, *right*? 🤓

5. Speaking of that, let's do it now! Scroll to **line 110** and ***uncomment*** ```transferFunds: transferFunds(dataStream)```, and remove the line above it.

	```diff
	- transferFunds,
	- // transferFunds: transferFunds(dataStream),
	+ transferFunds: transferFunds(dataStream),
	```

> [!NOTE]
>
> The code in the <kbd>POST</kbd> function is on the ***advanced*** side of the Vercel SDK implementation.
>
> If you are not familiar with Vercel’s AI SDK, it might seem overwhelming – but it’s not as crazy as you’d think.
>
> It utilizes multiple Agents, numerous language model wrappers, and some other fun "stuff".
>
> If you’re interested in learning more, ask Aiya (*or a lab attendant*).

---
#### <span style="font-variant: small-caps">Congrats!</span>
*You have completed Task 9.*

Only one more to go...

---

<br>

## Task 10: Try **it**

#### <span style="font-variant: small-caps">Steps</span>

1. Stop the application and restart it again with:

	```bash
	npm run dev
	```

2. Navigate to [http://localhost:3000](http://localhost:3000)

3. Ask the Aiya to transfer funds from your checking to savings, (*or whichever accounts you would like*).

   ```
   Transfer $25 from checking to savings.
   ```

	![Aiya Init Transfer](./assets/Module06/images/init-transfer.png)

4. If you are ***NOT*** already enrolled in push notifications, you will be prompted to enroll.

	![Aiya Poll](./assets/Module06/images/enroll-push.png)

	> [!NOTE]
	>
	> You typically would ***not** want to enroll in MFA in-line for security reasons.

	> Because push notifications are a more secure authenticator, we typically advise handling push enrollment *during initial registration* OR by gatekeeping it with another authenticator *first*.
	>

	<br>

5. Follow the on-screen steps to use Auth0 Guardian to enroll.

6. Click **Continue Transfer**.

	![Continue Transfer](./assets/Module06/images/continue-transfer.png)

7. Now look for a push notification in the **Auth0 Guardian app**.

	![Guardian Push](./assets/Module06/images/push.jpg)

8. Once you approve the notification, the funds should transfer and you will see a response from Aiya!

	![Funds Transfer Confirm](./assets/Module06/images/transfer-complete.png)



---
#### <span style="font-variant: small-caps">Congrats!</span>
*You have completed the **entire** module.* Thank you for sticking with us!

This was a very engaging module with quite a bit of code to analyze and refactor.

Throughout this module, you were able to set up successfully enable the funds transfer functionality through Aiya by incorporating ***CIBA*** into the application using Auth0's AI SDK and Auth0 Guardian.
