---
id: sdk
title: Introduction to the OST Wallet SDK
sidebar_label: Wallet SDK
---

The OST Wallet SDK enables end-users to interact with Brand Tokens within existing mass-market mobile apps. Developers can integrate Brand Tokens into any app without encumbering the user experience, and take advantage of OST’s innovative wallet recovery methods.

The [OST Wallet SDK](/platform/docs/guides/create-user-wallet/) supports non-custodial wallets, where users hold the keys and can transact with Brand Tokens using their mobile devices. The OST Wallet SDK natively supports multi-device access. Thus a user can have independent private keys on different devices, all controlling the same  **TokenHolder** contract. This allows for more modular management of keys and revocation of keys that may have been compromised.

Given that Brand Tokens are valuable, and that if keys are compromised it could result in the user being unable to access their tokens, OST promotes a mobile-first approach that leverages the security gained by the checks and audits associated with publishing an app via the app stores. Going mobile first also enables us to leverage the security features of modern mobile devices such as fingerprint and facial recognition, and secure enclave (iOS) and keystore (Android) to securely generate the required keys and encrypt them on a users device.

:::important Wallet Recovery via 6 digit PIN
These features are used in the OST Platform smart contract based recovery wherein a user input (which is minimally a **6 digit PIN**), an application or client input (which is minimally a 30 character string) and input from OST.com are combined in a cryptographically secure manner to prove the user's ownership of the Brand Tokens and authorize a new device.
:::

The user input -assumed to be a **6 digit PIN**- is also used to guard access to sensitive operations such as authorizing devices, viewing the mnemonic phrase, etc.  

![ERD_user_setup-Diagram](/platform/docs/assets/ERD_user_setup.jpg)