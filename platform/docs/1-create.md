---
id: 1-create
title: 1. Create Token
sidebar_label: Step 1. Create Token
---

:::tip Create Token
| Step | Description | Skillset |
| --- | --- | --- |
| **1. Create token** | <ul><li>Register on OST Platform</li><li>Choose token name and identifier</li><li>Associate an ETH address</li><li>Stake and mint</li><li>Connect to OST Wallet App (optional)</li></ul> | Non-technical |
:::

## a. Register on OST Platform 
The first thing you need to do to get started with OST Platform is to [register for a free account](https://platform.ost.com/sign-up). You will have to activate your account using the activation link sent to you upon registration.

![create-account](/platform/docs/assets/token-setup/register.png)

To optimise your experience on OST Platform, we ask you to provide your company name, whether your product has a mobile application, and the current estimate of your monthly active users.

![create-account](/platform/docs/assets/token-setup/additional_information.png)

## b. Choose token name and identifier
During token setup you will set Token Name and select a Token Identifier for your Brand Token. You also need to set the conversion rate between your Brand Token and the staked value token (e.g. OST Token, USDC).

![create-account](/platform/docs/assets/token-setup/token_setup.png)

:::note Character Restrictions
* **Token Name:** Letters, numbers, spaces allowed, max 20 characters and 3 words
* **Token Identifier:** No special characters allowed, Min 1 letter required, Max 4 letters or numbers
:::

:::warning Conversion Rate
We recommend using the default conversion rate in Sandbox i.e. 1 token = 1 OST. You can then make a more informed decision when setting-up your Brand Token in Production. If you need help setting the conversion rate, you can reach out to us at support@ost.com.

Things to consider when setting the conversion rate:
* Fiat value of each token (this will be subject to change if you stake a non-stablecoin)
* Fiat value of each action
* Typical token denomination: 10s, 100s, 1000s?
:::

## c. Associate an ETH Address

:::note Install MetaMask
MetaMask is required to participate in OST Platform
:::

* MetaMask provides a browser plugin to create an Etheruem address and wallet. You can opt to use your own Ethereum address if you have one. The address that you use will be the Account Owner Address.
* The MetaMask wallet is used to sign for the token creation transactions on Ethereum ropsten test network.
* In OST Platform Sandbox, you will receive an initial allotment / stake of OST-Test. You can use this stake to Mint your Brand Tokens in Sandbox.
* In Production, you can choose to associate a hardware wallet address using MetaMask’s interface (two hardware wallets are supported: Trezor and Ledger)

![Two-Factor Authentication](/platform/docs/assets/token-setup/install_metamask.png)

:::warning Account Owner Address
* This is an important address. If you lose the associated private key, you will lose access to Brand Tokens you mint.
* You associate the owner address with OST Platform by doing a personal signature. This signature is to ensure you as a user are the owner of the MetaMask account and it's real.
:::

Once you associate the owner address the token set-up process starts. This process involves running multiple blockchain transactions on Ethereum blockchain and OpenST Side Chains, so the process takes several minutes to complete.

![create-account](/platform/docs/assets/token-setup/account_setup.png)

## d. Stake and mint
Once you have staked something, the minting process is as simple as setting the number of Brand Tokens to mint and confirming the mint request. 

![create-account](/platform/docs/assets/token-setup/mint_tokens.png)

## e. Connect to the OST Wallet App (Optional)
Simply log-in to OST Platform, click on the **Wallet** tab and select Connect. For more detailed instructions, see [here](/platform/docs/wallet/app/#connect-your-brand-token-to-ost-wallet-app).

<hr>

## Watch a Short Video on How To Create Brand Tokens

<div align="center">
    <iframe width="680" height="384"
        src="https://www.youtube.com/embed/zF7DHOYvmi0">
    </iframe>
</div>
<br>
