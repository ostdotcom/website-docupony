---
id: platform_benefits
title: Platform Benefits
sidebar_label: Platform Benefits
---

The **OST Platform** is designed to provide everything businesses with millions of users need to deploy Brand Tokens to drive engagement. It’s a complete set of developer tools that any company can integrate without any blockchain expertise. As a developer exploring the OST platform, we hope you enjoy engaging with the technology and interacting with the OST blockchain protocols, contracts, APIs, and SDKs.

The **Server-Side APIs and SDKs** provide various endpoints/methods that can be used by developers to design and manage their Brand Token Economies. The **OST Wallet SDKs** enable end-users to safely interact with Brand Tokens.

With the OST Platform: 
 * A company can easily deploy a Brand Token Economy
 * Users can hold keys securely
 * Users enjoy a seamless user experience
 * A company can easily to integrate blockchain-based Tokens into their application

## A company can easily deploy a Brand Token Economy
OOST Platform's user interface enables companies to create their Brand Tokens by choosing a Token Name, Token Identifier and a conversion rate between the Brand Token and OST.

OST Platform enables companies to deploy contracts and transact without worrying about calculating gas.

The Platform infrastructure handles the deployment of various smart-contracts to create these tokens such as: 
 * BrandedToken is a mainstream application’s value-backed token, designed specifically for its application’s context
 * UtilityBrandedToken is the representation of a BrandedToken on a sidechain, utilized in transactions within an application

The Platform also deploys contracts that are used to manage the Brand Token Economy, such as: 
 * TokenRules enables defining a token economy by registering token rules for transfers
 * PricerRule is a rule for transferring tokens in amounts equivalent to selected other currencies


## Users can hold keys securely
The OST Wallet SDK supports non-custodial wallets, where users hold the keys and can transact with the Brand Tokens using their mobile devices. The mobile-first approach takes advantage of the security features of modern mobile devices to securely generate the required keys on the user's mobile device and encrypt them using the secure enclave (on iOS) or keystore (on Android).

The OST Wallet SDK natively supports multi-device access. Thus a user can have independent private keys on different devices, all controlling the same tokenHolder contract. This allows for more modular management of keys and revocation of keys that may have been compromised. These features are used in the OST smart-contract based recovery wherein a user input (which is minimally a 6 digit PIN), an application or client input (which is minimally a 30 character string) and input from OST are combined in a cryptographically secure manner to prove the user's ownership of the Brand Tokens and authorize a new device. 

The user input -assumed to be a 6 digit PIN- is also used to guard access to sensitive operations such as authorizing devices, viewing the mnemonic phrase, etc.  

![OSTWalletRecovery](/platform/docs/assets/ERD_user_setup.jpg)

## Seamless user experience
A user can use a 6 digit PIN to authorize a sessionKey. These ephemeral sessionKeys, which remain active for a period of time chosen by the user or developer of the application (based on the implementation) obviate the need for the user to sign every transaction within the application thereby creating a more seamless user experience. Thus, the user can engage with the Brand Token economy without interruption during an authorized session. When a session expires, they may use the 6 digit PIN to authorize a new session.

To further reduce friction, the SDK also supports the use of biometrics for this the second level of authentication of the user i.e a user can use biometrics to authorize a session, request a mnemonic phrase etc.

The intended user experience is that most users will set a 6 digit PIN and then add their biometrics, from that point on all day-to-day usage of the wallet (e.g. spend tokens with the client ) can be done with the biometrics. The PIN is only used thereafter for recovery or if the biometrics are not functioning. (Note: The user does not need to use her PIN or biometrics to view her wallet balance or ledger, rather only to re-authorize a session to spend tokens.)

### Wallet Recovery
The intended user experience is that OST clients can enable their users to use fully functional wallets with only setting 6 digit PINs for recovery. The 6 digit PIN, on its own, does not provide enough entropy to be secure. The Wallet SDK combines inputs from the user (PIN), the Client, and from OST and the concatenated string undergoes a transformation through a cryptographically secure process to generate a recoveryKey that can be used to request recovery using a smart-contract. The recovery smart contract (known as the delayedRecoveryModule) enforces a 12 hour waiting period during which the user can abort the recovery request using any of their authorized devices, further protecting the user from malicious recovery requests.

Optionally OST clients can also enable experiences for their users to recover access to their Brand Tokens from a second device and/or recover from 12 written words, however, these are optional implementations.

![OSTWalletRecovery](/platform/docs/assets/ost-wallet-recovery.jpg)


## Easy to integrate 
All the functionality above is bundled into [iOS](https://dev.ost.com/platform/docs/sdk/references/wallet_sdk/iOS/latest/methods/) and [Android](https://dev.ost.com/platform/docs/sdk/references/wallet_sdk/android/latest/methods/) SDKs that a Brand can use to integrate this functionality into their application. Also provided is a [UX case study](https://dev.stagingost.com/platform/docs/guides/wallet_ux_guide/) with screens and flows and helpful suggestions and a reference implementation in the form of [sample iOS app](https://github.com/ostdotcom/ost-wallet-sdk-ios/tree/develop/demo-app) and [sample Android app](https://github.com/ostdotcom/ost-wallet-sdk-android/tree/develop/app). To further support Brands and their user's in engaging safely with the Brand Tokens, OST will review the implementations of the SDKs to ensure that they meet the design and security standards.

When you integrate Brand Tokens into your application, please remember to: 
 * Create and maintain a map of OST Platform user_id to the user's profile on their app
 * [Generate and safely store a 30 character "secret" for each user](https://dev.stagingost.com/platform/docs/guides/create_wallet/#generating-passphaseprefix). This "secret" is used for the recovery and thus must be unique to each user. 

To integrate using the SDKs, start with the quick-start guides [PHP](/platform/docs/server_sdk_setup/php/), [iOS](/platform/docs/wallet_sdk_setup/iOS/) and [Android](/platform/docs/wallet_sdk_setup/android/). 
