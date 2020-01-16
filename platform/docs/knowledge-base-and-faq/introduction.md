---
id: introduction
title: Introduction to OST Wallet
sidebar_label: - Introduction
---

OST Wallet is a non-custodial wallet solution for Tokens minted on OST Platform. It is made available through our Mobile Wallet SDKs and can be easily incorporated into any mobile app.

## Crypto Wallet Definition
A cryptocurrency wallet is defined as something that stores public and private keys that can be used to receive or send cryptocurrency. 

Specifically, the public key/address is the address used to receive cryptocurrency and the private key is the required to sign transactions to spend cryptocurrency from the public address that forms a pair with the private key.

The term "wallet" is often overloaded. It may be any one of the following: 
* a device that stores a private key (at least one of); this can be hardware, but can also simply be a piece of paper with the private key written down on it (a “paper wallet”) 
* a device that stores a private key plus the ability to sign data such as transaction details or a message (a paper wallet would not meet this definition) 
* a device that stores a private key plus the ability to transmit the signature

:::note Mobile First Approach
Given that Tokens are valuable, and that if keys are compromised it could result in the user being unable to access their tokens, OST promotes a mobile-first approach that leverages the security gained by the checks and audits associated with publishing an app via the app stores. Going mobile first also enables us to leverage the security features of modern mobile devices such as fingerprint and facial recognition, and secure enclave (iOS) and keystore (Android) to securely generate the required keys and encrypt them on a users device.
:::

## Mobile Wallet SDKs
The OST Wallet SDK enables end-users to interact with Tokens within existing mass-market mobile apps. Developers can integrate Tokens into any app without encumbering the user experience, and take advantage of OSTs innovative wallet recovery methods.

* [Android](/platform/docs/sdk/mobile-wallet-sdks/android/) 
* [iOS](/platform/docs/sdk/mobile-wallet-sdks/iOS)
* [React Native](/platform/docs/sdk/mobile-wallet-sdks/react-native)

OST Wallet is a core component of OST Platform. It enables users to take ownership of their tokens and to sign for user initiated transactions.

:::warning OST Wallet SDK is required to use OST Platform
You must have a mobile app and integrate the OST Wallet SDK to use OST Platform. OST Wallet SDK relies on core components (hardware) of a users mobile device and is required for a user to sign token transactions.
:::

![ERD_user_setup-Diagram](/platform/docs/assets/ERD_user_setup.jpg)

## Wallet Features
OST Wallet SDK comes packed with useful featuers designed for mainstream users. This page gives a descriptive account of each feature.

* Non-custodial: Users control their funds. All keys are stored on their devices.
* [Seamless End User Experience](/platform/docs/wallet/features/#seamless-user-experience)
    * 6 digit PIN for access and control
    * Biometrics: The Wallet SDK uses fingerprint and facial recognition or the user 6 digit PIN to secure access to wallet actions such as device and session authorization, and revocation.
* [Multi-Device Access](/platform/docs/wallet/multi-device/): No key sharing across devices
* [Ephemeral Session Keys](/platform/docs/wallet/session-keys/) to allow for seamless in-app transactions: Pre-authorized sessions mean that in-app transactions within pre-defined time and value limits can be signed with no input from the user.
* [Innovative Recovery Mechanisms](/platform/docs/wallet/recovery): Users can recover access to their tokens using a 6 digit PIN 
* Support for web initiated transactions (that are singed on the users' mobile device)