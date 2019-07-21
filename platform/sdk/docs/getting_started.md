---
id: getting_started
title: Getting Started
sidebar_label: Getting Started
---

Robust RESTful APIs and SDKs to integrate your Brand Token into your applications with ease while observing the highest security standards. The Server-Side APIs and SDKs provide various endpoints/methods that can be used by developers to design and manage their Brand Token Economies.

The OST Wallet SDKs enables end-users to comfortably and safely interact with Brand Tokens within existing mass-market mobile apps. Developers can integrate Brand Tokens into any app without encumbering the user experience, and take advantage of OST’s innovative wallet recovery methods.

Using OST Platform SDKs provides a number of advantages
Simplicity: The SDKs reduce the complexity of integration by handling multiple authentication scenarios automatically, allowing for a more seamless user experience.
Performance: Caching, key management and nonce management ensure that end-users’ overall experience is smooth.
Security: Separating the Server Side API interactions from the mobile wallet SDK ensures that private keys are generated and stored securely on the user’s device and not shared across the network.


<--- From master
# Overview

---
id: overview
title: Overview
sidebar_label: Overview
---

![platform-overview](/platform/docs/assets/Platform-Integrations.jpg)

We provide Server Side SDKs mobile and Wallet SDKs to complete your integration:

* The OST Platform Server Side SDKs provide your application with various methods for different services like users, tokens, wallet services corresponding to an end-user of your economy. 

	Server SDKs are available for  [PHP](/platform/docs/sdk/server_sdk_setup/php/), [Ruby](/platform/docs/sdk/server_sdk_setup/ruby/), [Java](/platform/docs/sdk/server_sdk_setup/java/), [Node.js](/platform/docs/sdk/server_sdk_setup/nodejs/).

* The Wallet SDK adds support for users to own their tokens without requiring them to directly manage their private crypto keys. This essentially means providing private key management, authorization and recovery services in addition to authentication.
	
	Wallet SDKs are available for [Android](https://github.com/ostdotcom/ost-client-android-sdk) and [iOS](https://github.com/ostdotcom/ost-client-ios-sdk). A [React Native Wallet SDK](/platform/docs/sdk/wallet_sdk_setup/react-native/) is also available.

## Getting Started
The following SDK guides are designed to help you get familiarized with the bare necessities, giving you a quick and clean approach to getting up and running.

* Integrate the OST Server Side SDK with quickstart guide available for [PHP](platform/docs/sdk/server_sdk_setup/php/), [Ruby](/platform/docs/sdk/server_sdk_setup/ruby/), [Java](/platform/docs/sdk/server_sdk_setup/java/) and [Node.js](/platform/docs/sdk/server_sdk_setup/nodejs/).
* Set up Wallet SDK on [Android](/platform/docs/sdk/wallet_sdk_setup/android/) and/or [iOS](/platform/docs/sdk/wallet_sdk_setup/iOS/) devices.
* [React Native Wallet SDK](/platform/docs/sdk/wallet_sdk_setup/react-native/) is also available.
* [Create a wallet for a user](/platform/docs/guides/create_wallet/) 
* [Send some tokens to the user](/platform/docs/guides/execute_transaction/#executing-company-to-user-transactions)
* [Test a user initiated transaction](/platform/docs/guides/execute_transaction/#executing-user-intiated-transactions-in-web)
* Familiarize yourself with some important concepts and helpful definitions through [this guide.](/platform/docs/additional_resources/glossary/)


## Sample Apps
This section shares the sample applications that we put together for your reference to show how integration with Wallet SDK works.

* [Android sample application](https://github.com/ostdotcom/ost-wallet-sdk-android/tree/release-2.0/app)
* [iOS sample application](https://github.com/ostdotcom/ios-demo-app/tree/develop)
