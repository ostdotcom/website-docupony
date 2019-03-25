---
id: introduction
title: Wallet Introduction
sidebar_label: Introduction
---
The Wallet SDK enables businesses to integrate into their mobile applications users' wallets to hold their Brand Tokens and operate within a Token Economy.

Balance and Ledger APIs offer the functionality to view into a chosen user’s activity and resulting balances. The Wallet SDK provides the additional support required for the ownership and management of Brand Tokens by end users so that they can keys and control their tokens.

Given that Brand Tokens are valuable, and that if keys are compromised it could result in the user being unable to access their tokens, OST promotes a mobile-first approach that leverages the security gained by the checks and audits associated with publishing an app via the app stores. Going mobile first also enables us to leverage the security features of modern mobile devices such as fingerprint and facial recognition, and the secure enclave to on-device encrypted storage. 

Once a user is created via API, a wallet can also be activated. Activating a wallet involves the deployment and registration of :

* **TokenHolder contract** - where the user's balances sit,
* **Multisig contract** - that controls the TokenHolder contract, and 
* **DelayedRecoveryModule contract** - that supports recovery via a 6 digit PIN. 

A user that has a TokenHolder contract associated with their id can earn and spend tokens.  Tokens that belong to them are mapped to the address of the TokenHolder contract. They can spend tokens by signing transactions using private keys on their registered mobile device. 

An activated user may authorize sessionKeys which enable seamless in-app transactions. They can authorize a session by using their 6 digit PIN. They may also choose to set up biometrics and use biometric authentication in place of the PIN.

The OST Wallet SDK natively supports multi-device access. Thus a user can have independent private keys on different devices, all controlling the same TokenHolder contract. A user can authorize a new device by signing an authorization transaction with an authorized device. 

A user can also choose to view and store a seed phrase and use the seed phrase to authorize a new device. 

During an active session, transactions of a value lower than the spendingLimit are signed without explicit involvement from the user. We recommend that clients link the creation of these transactions to explicit user activity within their application. A user can also revoke active sessions, revoke other authorized devices and sign out of the tokenHolder thereby revoking all sessions. 

When a user logs in to the application from a new device [with no registered key stored on it](/platform/docs/wallet/recovery/), the user can either add the device using one of the two methods described above or, if they have no other devices or seed phrases, choose to recover access to their wallet using the DelayedRecoveryModule smart contract using their 6 digit PIN.
