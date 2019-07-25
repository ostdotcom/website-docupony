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

2. Create your unique Brand Token

3. Launch your Brand Token in the OST Wallet app and explore the OST Wallet SDK

4. Design your token economy (earn, spend, and redeem actions) and corresponding mobile and web screens

5. Get get access to your [API keys and API secret](https://platform.ost.com/testnet/developer)

6. Choose your preferred Server Side SDK: [PHP](/platform/docs/sdk/server-side-sdks/php/), [Ruby](/platform/docs/sdk/server-side-sdks/ruby/), [Java](/platform/docs/sdk/server-side-sdks/java/), [Node.js](/platform/docs/sdk/server-side-sdks/nodejs/). Optionally, you can choose to work direct with [OST Platform APIs](/platform/docs/api).

7. Choose your Mobile Wallet SDK(s): [Android](/platform/docs/sdk/mobile-wallet-sdks/android/), [iOS](/platform/docs/sdk/mobile-wallet-sdks/iOS), [React Native](/platform/docs/sdk/mobile-wallet-sdks/react-native/)

8. Start your development work and integration with OST Platform SDKs! First, test in our Sandbox then request to move to Production. We recommend following these steps to get started:
    * [Create a wallet for a user](/platform/docs/1-create)
    * [Send Brand Tokens to your users](/platform/docs/guides/execute-transactions/#executing-company-to-user-transactions)
    * [Test a user initiated transaction](/platform/docs/guides/execute-transactions/#executing-user-intiated-transactions-in-web)


Stake and Mint is the process of first **staking** a value token on Ethereum mainnet and then using that stake to **mint** your Brand Tokens. Your Brand Tokens are backed by what is staked. This gives them value and differentiates them from traditional rewards points.

---
id: distribute-tokens
title: Distribute Tokens to Your Users
sidebar_label: Distribute Tokens
---

You can distribute tokens to your end users through company-to-user transactions. To kick-start an economy and incentivise new users, companies often airdrop tokens to users after they activate their wallet.

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

