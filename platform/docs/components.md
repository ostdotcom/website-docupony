---
id: components
title: OST Platform Overview
sidebar_label: Components
---

The diagram below illustrates how the OST Server Side SDK and OST Wallet SDK work together and interact with your technology.

![platform-interaction](/platform/docs/assets/platform-integrations.jpg)

:::important OST Server Side SDKs
**OST Server Side SDKs** are designed so that server side components can support different approaches. The SDKs will be used for server to server interactions and will be paired with the relevant Wallet SDK. They can also be paired with your web application.

The SDKs provide various methods and URLs for different services like `users`, `tokens`, `transactions`, and wallet services corresponding to an end-user of the economy.
:::

:::important OST Wallet SDKs
**OST Wallet SDKs** enables users to transact with Brand Tokens from within your mobile app, without requiring them to directly manage their private crypto keys. This involves private key management, authorization and recovery services in addition to authentication.
:::