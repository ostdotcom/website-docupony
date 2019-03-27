---
id: platform_overview
title: Platform Overview
sidebar_label: Platform Overview
---

OST Platform is a complete technology solution enabling businesses to easily launch blockchain-based economies without requiring blockchain development. Developers can use **OST Platform** to create, test and launch Brand Tokens backed by value tokens such as the OST Token.

The diagram below illustrates how the different integration components of OST Platform work together and interact with your technology.

![platform-overview](/platform/docs/assets/Platform-Integrations.jpg)


**OST APIs and Server Side SDKs** make it simple and easy for developers to integrate brand tokens into their apps. The SDKs provide various methods and URLs for different services like users, tokens, transactions, wallet services corresponding to an end-user of the economy.

These SDKs are designed so that the server side components can support different approaches. They will be used for server to server interactions and they will be paired with the relevant wallet SDK. They can also be paired with your web application.

**OST Wallet SDK** enables users to transact with Brand Tokens from within your mobile app, without requiring them to directly manage their private crypto keys. This involves private key management, authorization and recovery services in addition to authentication.

The OST Platform is built on OpenST Protocol. The protocol enables the creation of BTs and allows BT economies to scale to billions of transactions. You can learn more about the OpenST Protocol at [OpenST.org](https://openst.org/).


### Advantages
Using OST Platform SDKs provides a number of advantages

* **Simplicity**: The SDKs reduce the complexity of integration by handling multiple authentication scenarios automatically, allowing for a more seamless user experience.
* **Performance**: Caching, key management and nonce management ensure that end-users' overall experience is smooth.
* **Security:** Separating the Server Side API interactions from the mobile wallet SDK ensures that private keys are generated and stored securely on the user's device and not shared across the network.

## Developer Resources
A number of platform-specific SDKs are available to integrate OST APIs and wallet SDK into your applications. These SDKs provide a safe and secure way to quickly implement a token economy within your app. 

The following SDKs are actively maintained and supported:

* [PHP](/platform/docs/server_sdk_setup/php/)  for server-side applications
* [Ruby](https://github.com/ostdotcom/ost-sdk-ruby) for server-side applications
* [Node](https://github.com/ostdotcom/ost-sdk-js).js for server-side applications
* [Java](https://github.com/ostdotcom/ost-sdk-java) for server-side applications

For wallet integration, we provide mobile wallet SDKs for Android and iOS applications.

* [iOS Wallet SDK](/platform/docs/wallet_sdk_setup/iOS/)
* [Android Wallet SDK](/platform/docs/wallet_sdk_setup/android/)


### Authentication Methods

| Authentication | Description |
|---|---|
| HMAC : hash-based message authentication | Every API request on OST Platform API Endpoint requires hash-based message authentication. You can obtain your API key and shared API secret for your brand token from the OST Platform [Developers page](https://patform.ost.com/testnet/developer) <br><br> When using the Server Side SDKs, authentication is handled for you. In other languages you have to implement the signature generation by computing the HMAC sha256 digest of the API secret. You can find the details of the [server side authentication process here.](/platform/docs/sdk/getting_started/authentication/#server-api-authentication)  |
| Personal Signing  |**Wallet SDK** provides secure authentication by signing of data from user's mobile device. The SDK ensures a high level of privacy and trust, since the private keys with which it signs data never have to leave the mobile device. You can find the details of the [authentication process within wallet SDK here.](/platform/docs/sdk/getting_started/authentication/#wallet-sdk-authentication)|
| Smartphone application | Within client company's native application where client company demands the user to authenticate before the user authorizes sessions or devices. |



