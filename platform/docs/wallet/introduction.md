---
id: introduction
title: Introduction to OST Wallet
sidebar_label: Introduction
---

OST Wallet is a non-custodial wallet solution for Brand Tokens minted on OST Platform. It is made available through our Mobile Wallet SDKs and can be easily incorporated into any mobile app.

**Mobile Wallet SDKs**
* [Android](/platform/docs/sdk/mobile-wallet-sdks/android/) 
* [iOS](/platform/docs/sdk/mobile-wallet-sdks/iOS)

OST Wallet is a **core component** of OST Platform. It enables users to take ownership of their tokens as well as participate in a Brand Token Economy and sign for user initiated transactions.

:::note OST Wallet SDK is required to use OST Platform
You must have a mobile app and integrate the OST Wallet SDK to use OST Platform. OST Wallet SDK relies on core components (hardware) of a users mobile device and is required for a user to participate in a Brand Token Economy.
:::

## OST Wallet SDK Features
For a more detailed overview of features, check the [Features](/platform/docs/wallet/features/) page.
* Non-custodial: Users control their funds. All keys are stored on their devices.
* Multi-device: No key sharing across devices
* Session keys to allow for seamless in-app transactions: Pre-authorized sessions mean that in-app transactions within pre-defined time and value limits can be signed with no input from the user
* Recovery mechanism: Users can recover access to their tokens using a **6 digit PIN**
* Support for web transactions via QR code
* Support for a [Seamless User Experience](/platform/docs/wallet/introduction/#seamless-user-experience)
    * **6 digit PIN** for access and control
    * **Biometrics**: The Wallet SDK uses fingerprint and facial recognition or the user **6 digit PIN** to secure access to wallet actions such as device and session authorization and revocation

## Seamless User Experience
A user can use a **6 digit PIN** to authorize an ephemeral sessionKey. These ephemeral sessionKeys, which remain active for a period of time chosen by the user or developer of the application (based on the implementation) obviate the need for the user to sign every transaction within the application thereby creating a more seamless user experience. When a session expires, the user can authorise a new session with **6 digit PIN**.

To further reduce friction, the OST Wallet SDK also supports the use of **biometrics** for the second level of authentication of the user, i.e. a user can use **biometrics** to authorize a session, request a mnemonic phrase. Check the [Wallet UX Guidelines](/platform/docs/wallet/ux/) to understand the possible flows and recommended user experience (UX).

:::note Intended User Experience
The intended user experience is that most users will set a **6 digit PIN** and then add their **biometrics**, from that point on, all day-to-day usage of the wallet can be done with **biometrics**. The PIN is only used thereafter for recovery or if **biometrics** are not functioning. 

**The user does not need to use her PIN or **biometrics** to view her wallet balance or ledger, rather only to re-authorize a session to spend tokens.**
:::