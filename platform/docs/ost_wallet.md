---
id: ost_wallet
title: Explore OST Wallet App and Wallet SDKs
sidebar_label: OST Wallet App
---

## What is OST Wallet App?
With the OST Wallet SDK the user can set a 6 digit PIN to authorize Session Keys. These ephemeral Session Keys, which remain active for a period of time, remove the need for users to sign every transaction within the application. When a session expires, the user may use the 6 digit PIN to authorize a new session.

To further reduce friction, the OST Wallet SDK also supports the use of biometrics.

The intended user experience is that most users will set a 6 digit PIN and then add their biometrics. From that point on all day-to-day usage of the wallet (e.g. spend tokens ) can be done with the biometrics. The PIN is only used thereafter for recovery or if the biometrics are not functioning. (Note: The user does not need to use her PIN or biometrics to view her wallet balance or ledger, rather only to re-authorize a session to spend tokens.)

Wallet Recovery With PIN + Smart Contract
OST Platform enables users to use fully functional wallets with only setting 6 digit PINs for recovery. Normally a 6 digit PIN, on its own, does not provide enough entropy to be secure. The OST Wallet SDK achieves security by combining inputs from the user (PIN), an encrypted secret from the company, and from OST. The concatenated string undergoes a transformation through a cryptographically secure process to generate a recoveryKey that can be used to request recovery using a smart-contract. The recovery smart contract (known as the delayedRecoveryModule) enforces a 12 hour waiting period during which the user can abort the recovery request using any of their authorized devices, further protecting the user from malicious recovery requests. We encourage you to learn more about OST’s innovative wallet recovery model by reviewing the detailed specifications and SDK.

(Optionally OST clients can also enable experiences for their users to recover access to their Brand Tokens from a second device and/or recover from 12 written words, however, these are optional implementations.)

## Connect Your Brand Token to OST Wallet App
> Note: iPhone users need to first download the TestFlight app from Apple to download the OST Wallet App


The OST Wallet simulates integrations for your Brand Token in Sandbox mode. To use the OST Wallet App follow these steps:

1. Log in to [OST Platfrom](https://platform.ost.com/login)

2. If you haven't already set-up your Brand Token, first follow the [Create Token guide](/platform/docs/guides/create_token/)
    * Set-up your token
    * Mint some Brand Tokens

3. Once you mint some Brand Tokens in sandbox mode, the `Wallet` option in the left-navigation is activated.
![ConnectWalletImage](/platform/docs/assets/Wallet%20/SetupWallet.png)

4. Select `Connect` to add your Brand Token economy to the OST Wallet App
    * You will receive an email with instructions to download the app and join your Brand Token Economy

### Invite Your Colleagues

5. Next, invite your colleagues and start sending and receiving tokens to each other!
![InviteUsers](/platform/docs/assets/Wallet%20/InviteUsers.png)

### Explore Wallet Features & Functions

6. Explore other areas of the app, in particular the `Settings` tab