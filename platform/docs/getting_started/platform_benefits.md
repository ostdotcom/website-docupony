---
id: platform_benefits
title: Platform Benefits
sidebar_label: Platform Benefits
---

OST is a blockchain platform designed for the needs of businesses with hundreds of millions of users. It enables businesses to integrate their brand tokens into their applications. Developers can use *OST Platform* to create, test and launch Brand Tokens backed by OST. *OST Wallet SDK* facilitate the creation of users' wallets to hold their Brand Tokens and operate within a Token Economy.  The *Server-Side APIs and SDKs* provide various endpoints/methods required for different services like users, tokens, device & sessions operations etc. To serve our customers' needs, we build tools that enable hundreds of millions of users  with no crypto-savviness to safely interact with blockchain-based Brand Tokens.

In order for that to happen, the solution meets the following goals: 

 * Easy Brand Token setup
 * User holds keys securely
 * Seamless user experience
 * No gas calculation overheads
 * Easy to integrate into existing applications

## Easily create Brand Token
OST Platform's user interface enables you to set up your Brand Token. It is as simple as setting a Token Name, Token Identifier and a conversion rate between your Brand Token and OST. After the setup, you can mint Brand Tokens by specifying the number of tokens you choose to mint. The OST Platform infrastructure takes care of deploying various contracts to set up the economy on value chain and auxiliary chains. 
This involves deploying contracts for staking and minting : 
 * BrandedToken on value chain and
 * UtilityBrandedToken on an auxiliary chain.

During the token setup we also deploy contracts that play a key role in tokenizing your applications on the auxiliary chain:
 * TokenRules
 * PricerRule

## User holds keys securely
The OST Wallet SDK supports non-custodial wallets, where users hold the keys and can control the Brand Tokens in their Wallets. The mobile-first approach takes advantage of the security features of modern mobile devices to securely generate the required keys on the user's mobile device and encrypt them using the secure enclave (on iOS) or keystore (on Android).

The OST Wallet SDK natively supports multi-device access. Thus a user can have independent private keys on different devices, all controlling the same tokenHolder contract. This allows for more modular management of keys and revocation of keys that may have been compromised. These features are used in the OST smart-contract based recovery wherein a user input (which is minimally a 6 digit PIN), an application or client input (which is minimally a 30 character string) and input from OST are combined in a cryptographically secure manner to prove the user's ownership of the Brand Tokens and authorize a new device. 

The user input -assumed to be a 6 digit PIN- is also used to guard access to sensitive operations such as authorizing devices, viewing the mnemonic phrase, etc.  

![OSTWalletRecovery](/platform/docs/assets/ERD_for_user.png)

## Seamless user experience
A user can use a 6 digit PIN to authorize a [sessionKey](https://dev.ost.com/platform/docs/api/#sessions). These ephemeral sessionKeys, which remain active for a period of time chosen by the user or developer of the application (based on the implementation) obviate the need for the user to sign every transaction within the application thereby creating a more seamless user experience. Thus, the user can engage with the Brand Token economy without interruption during an authorized session. When a session expires, they may use the 6 digit PIN to authorize a new session.

To further reduce friction, the SDK also supports the use of biometrics for this the second level of authentication of the user i.e a user can use biometrics to authorize a session, request a mnemonic phrase etc.

The intended user experience is that most users will set a 6 digit PIN and then add their biometrics, from that point on all day-to-day usage of the wallet (e.g. spend tokens with the client ) can be done with the biometrics. The PIN is only used thereafter for recovery or if the biometrics are not functioning. (Note: The user does not need to use her PIN or biometrics to view her wallet balance or ledger, rather only to re-authorize a session to spend tokens.)

### Wallet Recovery
The intended user experience is that OST clients can enable their users to use fully functional wallets with only setting 6 digit PINs for recovery. Optionally OST clients can also enable experiences for their users to recover access to their Brand Tokens from a second device and/or recover from 12 written words, however, these are optional implementations.

![OSTWalletRecovery](/platform/docs/assets/ost-wallet-recovery.jpg)

## No gas calculation overhead  
OST Platform has worked towards simplifying pricing model for client companies. You no longer have to worry about the gas costs for deploying contracts and executing transactions on auxiliary chains. 

## Easy to integrate 
All the functionality above is bundled into [iOS](https://dev.ost.com/platform/docs/sdk/references/wallet_sdk/iOS/latest/methods/) and [Android](https://dev.ost.com/platform/docs/sdk/references/wallet_sdk/android/latest/methods/) SDKs that a Brand can use to integrate this functionality into their application. Also provided is a [UX case study](https://dev.stagingost.com/platform/docs/guides/wallet_ux_guide/) with screens and flows and helpful suggestions and a reference implementation in the form of [sample iOS app](https://github.com/ostdotcom/ost-wallet-sdk-ios/tree/develop/demo-app) and [sample Android app](https://github.com/ostdotcom/ost-wallet-sdk-android/tree/develop/app).

As a summary, here are the responsibilities of the different parties. As is evident, the focus here is on the user and Client developer's ease of use to ensure that clients are able to focus on their businesses and integrate quickly. To further support Brands and their user's in engaging safely with the Brand Tokens, OST will review the implementations of the SDKs to ensure that they meet the design and security standards.

### End-User's Role
The natural person owner, aka "user" can regain access to their Branded Tokens by doing the following:
 * Remember their PIN

### OST Client's Role  
 * Authenticate the user when the user logs in.
 * [Generate and safely store a 30 character "secret" for each user](https://dev.stagingost.com/platform/docs/guides/create_wallet/#generating-passphaseprefix). This "secret" is used for the recovery and thus must be unique to each user. 
 * Create user experiences around the various workflows described in the SDK guides
 * Upon user generation OST servers return a system generated user-id. All mapping of user-id to the user should be managed by the client company.

### OST's Role 
 * Generate and safely store a "salt" for each user. This "secret" is used for the recovery and thus must be unique to each user. 
 * Create the recoveryOwner private key using the inputs (will exactly match the recoveryOwner that was made when the wallet was initially created).
 * Create and safely store Ethereum private keys.
 * Maintain the various endpoints required to authorize and revoke devices and sessions 
 * Transmit the signed transactions to the OST servers for submission to the blockchain.
 * Submit the transaction to the blockchain and pay for their processing.
 * Initiate and execute recovery mechanisms when all requirements for recovery are met.

To integrate the SDK, start with the quick-start guide for iOS and Android 
