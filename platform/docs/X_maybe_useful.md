caution, note, important, tip, warning.

:::warning Caution title
Caution
:::

:::note Note title
Note
:::

:::note Important title
Important
:::

:::tip Tip title
Tip
:::

:::warning Wanring title
Warning
:::

* Cost-effective microtransactions: The OST Platform transactions are executed on public sidechains. The sidechains offer fast and inexpensive transactions

| S. No. | Section  |
|---|---|
| 1  | [Types Of Transactions](#types-of-transactions)  |
| 2  | [atto Conversions (OST to atto OST, BT to atto BT, USD to atto USD)](#conversions-to-atto)  |
| 3  | [**Rules** Contract](#rules-contract)  |
| 4  | [Generating QRCode with Transaction Data](#generating-qrcode-with-transaction-data)  |
| 5  | [Executing company-to-user Transactions](#executing-company-to-user-transactions)  |
| 6  | [Executing `user` intiated transactions](#executing-user-initiated-transactions) |


1. [Register on OST Platform](https://platform.ost.com/sign-up)

2. Create your unique Token

3. Launch your Token in the OST Wallet app and explore the OST Wallet SDK

4. Design your token ecosystem (earn, spend, and redeem actions) and corresponding mobile and web screens

5. Get get access to your [API keys and API secret](https://platform.ost.com/testnet/developer)

6. Choose your preferred Server Side SDK: [PHP](/platform/docs/sdk/server-side-sdks/php/), [Ruby](/platform/docs/sdk/server-side-sdks/ruby/), [Java](/platform/docs/sdk/server-side-sdks/java/), [Node.js](/platform/docs/sdk/server-side-sdks/nodejs/). Optionally, you can choose to work direct with [OST Platform APIs](/platform/docs/api).

7. Choose your Mobile Wallet SDK(s): [Android](/platform/docs/sdk/mobile-wallet-sdks/android/), [iOS](/platform/docs/sdk/mobile-wallet-sdks/iOS), [React Native](/platform/docs/sdk/mobile-wallet-sdks/react-native/)

8. Start your development work and integration with OST Platform SDKs! First, test in our Sandbox then request to move to Production. We recommend following these steps to get started:
    * [Create a wallet for a user](/platform/docs/1-create)
    * [Send Tokens to your users](/platform/docs/guides/execute-transactions/#executing-company-to-user-transactions)
    * [Test a user initiated transaction](/platform/docs/guides/execute-transactions/#executing-user-intiated-transactions-in-web)


Stake and Mint is the process of first **staking** a value token on Ethereum mainnet and then using that stake to **mint** your Tokens. Your Tokens are backed by what is staked. This gives them value and differentiates them from traditional rewards points.

---
id: distribute-tokens
title: Distribute Tokens to Your Users
sidebar_label: Distribute Tokens
---

You can distribute tokens to your end users through company-to-user transactions. To kick-start an token ecosystem and incentivise new users, companies often airdrop tokens to users after they activate their wallet.

:::note 
If you build a product  or solution that requires third parties to purchase tokens from you, those tokens can be distributed through traditional means e.g. like a prepaid phone card, sold online.
:::

![UX Guide Title](/platform/docs/assets/wallet-ux-guide/Wallet-UX-Guidelines-Hero.jpg)

<hr>

## Watch a Short Video on Our Developer Resources

<div align="center">
    <iframe width="680" height="384"
        src="https://www.youtube.com/embed/AUgBHPDkYnU">
    </iframe>
</div>
<br>

android.md
Sample Implementation of [BaseFragment class](https://github.com/ostdotcom/ost-wallet-sdk-android/tree/develop/ostwalletsrc/main/java/ost/com/sampleostsdkapplication/fragments/BaseFragment.java) is available as a part of [OST Wallet App ](https://github.com/ostdotcom/ost-wallet-sdk-android/tree/develop/ostwallet)

[Sample implementation inheriting `BaseFragment`](https://github.com/ostdotcom/ost-wallet-sdk-android/blob/release-2.0/app/src/main/java/ost/com/sampleostsdkapplication/fragments/LoginFragment.java)

    // "Case Studies": [
    //   "use-cases/lgbt",
    //   "use-cases/spoo",
    //   "use-cases/pop"
    // ],

r  Sorry Daan,
I couldn't understand the issue.
The method registerDevice never returned any value.
The application needs to implement registerDevice method.
This method is invoked by the SDK during setup device workflow.

Also sent to the channel
1d
Daan van Tongeren  Sorry I meant method setupDevice in the Sdk
1d
r  Do, you mean setupDevice does not invoke registerDevice callback?
As per intended behavior:
If device already has registered device, sdk should not call registerDevice callback.
1d
Daan van Tongeren  No i mean we call the setupdevice method in the SDK when login but it does not return anything
1d
Daan van Tongeren  In the old demo app that process worked fine for us (login as well the signup)
9h
Daan van Tongeren  Just checked signup . Same issue when setupdevice is invoked
8h
Daan van Tongeren  @r how to move forward?

1. The ephemeral sessionKeys and owner keys are created on the user's mobile device. The OST Wallet SDK uses standard web3 libraries to generate the public-private key pairs on the device. The private key in each pair is stored on the device and encrypted with secure enclave (iOS) or keystore (Android).
2. Creation of the recoveryOwner key pair: The recoveryOwner is created using inputs from the Partner, OST and the user. The user's input is a 6-digit pin. The Partner and OST must provide pseudorandom inputs that are mapped to the user. For the sake of clarity, the Partner's input shall be referred to as the Partner User Secret and OST's input shall be referred to as OST User Salt.
3. These inputs are put through a cryptographically-sound key generation process (such as Scrypt) to create the private key that will be used as the recoveryOwner for the **DelayedRecoveryModule**.
4. Generating the recoveryController key: This is a private key generated and stored in OST Platform's servers. _There may be more than one private key in the servers for use by different Partner companies._
5. Creating the wallet: In order to create a user wallet in a, the following contracts are deployed:
    * A **MultiSig** contract. The public addresses from certain keys generated on the user's devices are set as owners for the MultiSig.
    * A **TokenHolder** contract. The MultiSig controls the TokenHolder contract, as its owner. The public addresses of certain key-pairs generated on the user's device are authorized as sessionKeys in the TokenHolder.
    * A **DelayedRecoveryModule** contract. The public addresses of the recoveryOwner and the recoveryController are stored on this contract. A number that represents blocks added to the blockchain, to approximate a period of delay before recovery can be executed (e.g., 14400 == 12 hours, assuming a block is added every 3 seconds), is also stored on this contract, as the recoveryBlockDelay.


## OST Wallet
11/ You can also download a demo app, OST Wallet, which provides an implementation of the transaction signing, wallet recovery, and device authorization, this is entirely usable today at

12/ Nitty gritty details on how it all works:

-The user is provided a an EIP1077 token holder contract with session keys for application sessions.

-Private keys are generated on the user’s mobile device and encrypted using either secure enclave (iOS) or keystore (Android).

14/ 

-The user creates a 6 digit PIN to authorize a session Key. This mimics how users are familiar with interacting with apps. 

-The ephemeral keys remain active for a period of time, eliminating need for user to sign every transaction in the app, enabling a more seamless UX

15/ 

-Thus, the user can use her wallet within an app without interruption during an authorized session. 

-When her session expires, she uses her 6 digit PIN to authorize a new session.

21/ If you are interested in wallet ux, I encourage you to check out OST Wallet: 

layer-2 + ephemeral keys + recovery from smart contract 

download beta app at https://ost.com and reviewing our docs at https://dev.ost.com 

Feedback and criticism greatly appreciated


    

