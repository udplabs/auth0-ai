## The Story
the bAInk, a respected local bank that has served its community for over 20 years, recently green-lit plans to modernize their existing consumer facing products and services. The bank worked with third party consultants to bring to life online banking services via a web portal and mobile application. These projects were met with great success and the bank saw a major uptick in service adoption and funds deposited into their institution.

As a result, the bank executives began looking further to modernize their platforms. This eventually pivoted to include AI with hopes to accelerate the growth of their platforms. As a result, this initiative gave life to *Aiya*, a companion AI assistant created to streamline navigation of online banking services like balance transfers, account management, and online bill payments.

## The Challenge(s)
The developers at the bAInk are facing issues figuring out what needs to be done to ensure Aiya is responding to prompts in a secure fashion. While the goal is to provide the bAInk customers with an elevated user experience, it is paramount that the data is protected with the highest levels of security and scrutiny.
- Aiya needs to be able to operate without the possibility of leaking sensitive data.
- Aiya *must* abide by existing (and future) per-account permissions.

## The Solution
In order to help the bAInk developers facilitate a secure way for Aiya to divulge sensitive information to its customers, we look to <span style="font-variant: small-caps"><b>Auth0’s Auth for Agents</b></span>. *More specifically*, Fine-Grained Authorization (FGA) for Retrieval-Agumented Generation (RAG) and asynchronous authorization using Client-Initiated Backchannel Authentication (CIBA). These features will help us guide the developers towards a higher degree of security, ensuring that sensitive data is protected without sacrificing the goal of an improved user experience.


## The Journey
Thanks for joining the the bAInk development team! You will be getting hands-on resume-building experience configuring your own instance of an Auth0 enterprise and Auth0 <abbr title="Fine-Grained Authorization">FGA</abbr>. There will be multiple opportunities to refactor a bit of code to get us to a fully working application. *We are excited to have you on the team!*

You will be contributing to a demo app using Next.js (App Router) that showcases Auth0 Auth for AI Agents as well as Auth0 <abbr title="Fine-Grained Authorization">FGA</abbr> powering <abbr title="Retrieval-Augmented Generation">RAG</abbr> and securing AI tools. Your companion AI assistant, Aiya, will be available inside the app (*once you get it spun up*) to help you out.

Once the application is beginning to function, you can start to prompt Aiya for things like:

* `What am I supposed to be doing?`
* `Explain step 3` to expand on the guide.
* `hint` or `help` to get [progressively stronger] nudges
* `explain this file: {{insert file including path}}` to summarize code you’re viewing
* `Show me the code` to just see the final code.

In addition, you will notice dynamic suggested prompts that will occasionally appear above the chat input. Take advantage of these helpful hints!

Think of Aiya like a senior pair‑programmer. *Ask precise questions*. If you’re blocked, paste the error and a short description of what you tried.

---
#### *Aiya is powered by **ChatGPT 5 (mini)** -- take advantage of the powerful tool at your disposal!*
---

#### *So buckle up! There will be much to learn and quite a bit of code to review!*