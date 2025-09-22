### Summary

The bAInk, a respected local bank that has served its community for over 20 years, recently green-lit plans to modernize their existing consumer facing products and services. The bank worked with third party consultants to bring to life online banking services via a web portal and mobile application. These projects were met with great success and the bank saw a major uptick in service adoption and funds deposited into their institution. 

As a result, the bank executives began looking further to modernize their platforms. This eventually pivoted to include AI with hopes to accelerate the growth of their platforms. As a result, this initiative gave life to Aiya, the companion AI assistant created to streamline navigation of online banking services like balance transfers, account management, and online bill payments. 

As newly minted The bAInk contract developers for the next 2 hours, we will dive into the implementation of Aiya through the lens of Auth0’s Auth for AI Agents suite of features. 

### Lab 1 

In this lab, we confirm access to a proper Auth0 tenant, validate local environment configurations, and clone the application starter files from the respective Github repository. 

### Lab 2

In this lab, we begin to set up the application and validate that a local copy of the app can run on our machines.

### Lab 3

In this lab, we configure our local environments to include the appropriate Auth0 variables for proper application functionality. We also dive into the Auth0 tenant to confirm tenant resource configurations as well. 

### Lab 4 

In this lab, we incorporate Auth0 Fine-Grained Authorization (FGA) into the fold and begin to configure the FGA environment in preparation for implementing the security of data in RAG pipelines. This is crucial to ensuring Aiya is able to communicate properly with end users through a secure manner.

### Lab 5 

In this lab, we begin to implement FGA functionality into the application. This is where we will begin to refactor some of the code snippets that have been outlined in the foundational template code for Aiya. The goal is to get a working implementation to verify that Aiya is behaving as it should when prompted with specific instructions.

### Lab 6

In this lab, we incorporate Client-Initiated Backchannel Authentication (CIBA), a feature that enables us to implement Async Authorization. Effectively, this enables end users to authorize Aiya to complete requests on their behalf through a push notification sent to their devices. We will dive into this implementation and learn hands-on how it’s incorporated into the application.
