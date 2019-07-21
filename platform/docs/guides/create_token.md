---
id: create_token
title: Create Token Guide
sidebar_label: Create Token
---

## 1. Create an Account
The first thing you need to do to get started with OST Platform is to [register for a free account](https://platform.ost.com/sign-up). You will have to activate your account using the activation link sent to you upon registration.


![create-account](/platform/docs/assets/token-setup/Register.png)

## 2. Add Company's Additional Information
In order to optimise your experience on OST Platform, we kindly ask you to provide your company name, whether your product has a mobile application, and the current estimate of your monthly active users.

![create-account](/platform/docs/assets/token-setup/Additional_information.png)

## 3. Set Up Brand Token
During token setup you will set up Token Name (only letters, numbers, spaces allowed, at max 20 characters and 3 words) and select a Token Identifier (at max 4 letters or numbers, at min 1 letter required, no special characters allowed) for your brand token. You also need to set the conversion rate between your Brand Token and the staked value token (e.g. OST Token, USDC).

![create-account](/platform/docs/assets/token-setup/Token_setup.png)


##  4. Install MetaMask and Associate Account Owner Address
MetaMask is required to participate in OST Platform.  

* MetaMask provides a browser plugin to create a wallet and receive an initial allotment of OST-Test on sandbox environment. This wallet is further used to sign for token creation transactions on Ropsten Test Network.
* On Production environment, we use MetaMask’s Interface to connect to two widely used hardware wallets: Trezor and Ledger.

![Two-Factor Authentication](/platform/docs/assets/token-setup/Install_metamask.png)


**Account Owner Address**

* This is an important address. If you lose the associated private key, you will lose access to Brand Tokens you mint. It can be the public address of your metamask account or you can choose to associate a hardware wallet address via metamask as the owner address of the OST Platform account.
* You associate the owner address with OST Platform by doing a personal signature. This signature is to ensure you as a user are the owner of the metamask account and it's real.

Once you associate the owner address the token set up process starts. This process involves running multiple blockchain transactions on Ethereum blockchain and OpenST Side Chains, so the process takes several minutes to complete.

![create-account](/platform/docs/assets/token-setup/Account_setup.png)


## 5. Mint Tokens

OST Platform enables you to easily and safely create your own Brand Tokens on highly scalable OpenST Side Blockchains. The OpenST technology protocol enables Brand Tokens to be created, or "minted", on sidechains by staking OST-Test on the public Ropsten Ethereum test blockchain. The minting process is as simple as setting the number of Brand Tokens to mint and confirming the mint request. 

![create-account](/platform/docs/assets/token-setup/Mint_tokens.png)


## Next Steps

1. [Obtain your API keys](/platform/docs/sdk/getting_started/authentication/#obtaining-your-api-keys)

2. [Create Wallet Guide](/platform/docs/guides/create_wallet/)

