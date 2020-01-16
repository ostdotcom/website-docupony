---
id: introduction
title: Getting Started
sidebar_label: Getting Started
---

Robust RESTful APIs and SDKs to integrate your Token into your applications with ease while observing the highest security standards and without encumbering the user experience. No in-house blockchain expertise required.

Server Side APIs and SDKs provide various endpoints/methods that can be used to design and manage Token Economies. Wallet SDKs enable end-users to interact with Tokens within existing mobile apps.

![platform-overview](/platform/docs/assets/Platform-Integrations.jpg)

![platform-overview](/platform/docs/assets/ost-wallet-recovery.jpg)

Server Side SDKs are available in 
* [PHP](/platform/docs/sdk/server-side-sdks/php/)
* [Ruby](/platform/docs/sdk/server-side-sdks/ruby/)
* [Java](/platform/docs/sdk/server-side-sdks/java/)
* [Node.js](/platform/docs/sdk/server-side-sdks/nodejs/)

**Using OST Platform SDKs has a number of advantages**
* **Simplicity** The SDKs reduce the complexity of integration by handling multiple authentication scenarios automatically, allowing for a more seamless user experience.
* **Performance** Caching, key management and nonce management ensure that end-users’ overall experience is smooth.
* **Security** Separating the Server Side API interactions from the Mobile Wallet SDK ensures that private keys are generated and stored securely on the user’s device and not shared across the network.

:::note User own their own Tokens
The Mobile Wallet SDK provides for users to <u>own</u> their Tokens without requiring them to directly manage their private crypto keys. This essentially means providing private key management, authorization and recovery services in addition to authentication.
:::
	
Wallet SDKs are available for 
* [Android](https://github.com/ostdotcom/ost-client-android-sdk)
* [iOS](https://github.com/ostdotcom/ost-client-ios-sdk)
* [React Native ](/platform/docs/sdk/mobile-wallet-sdks/react-native/)

## Developer Guides
The following SDK guides are designed to help you get familiarized with the bare necessities, giving you a quick and clean approach to getting up and running fast.

* Integrate the OST Server Side SDK with quickstart guide available for 
    * [PHP](/platform/docs/sdk/server-side-sdks/php/) 
    * [Ruby](/platform/docs/sdk/server-side-sdks/ruby/)
    * [Java](/platform/docs/sdk/server-side-sdks/java/)
    * [Node.js](/platform/docs/sdk/server-side-sdks/nodejs/)
* Integrate the Wallet SDK for 
    * [Android](/platform/docs/sdk/mobile-wallet-sdks/android/)
    * [iOS](/platform/docs/sdk/mobile-wallet-sdks/iOS)
    * A [React Native Wallet SDK](/platform/docs/sdk/mobile-wallet-sdks/react-native/) is also available
* [Create a wallet for a user](/platform/docs/guides/create-user-wallet/)
* [Send some tokens to the user](/platform/docs/guides/execute-transactions/#executing-company-to-user-transactions)
* [Test a user initiated transaction](/platform/docs/guides/execute-transactions/#executing-user-intiated-transactions-in-web)
* Familiarize yourself with some important concepts and helpful definitions through our [Useful Definitions guide](/platform/docs/definitions/)