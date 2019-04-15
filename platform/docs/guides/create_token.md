---
id: create_token
title: Create Token Guide
sidebar_label: Create Token
---

## 1. Create an account
The first thing you need to do to get started with OST Platform is to [register for a free account](https://platform.ost.com/sign-up). You will have to activate your account using the activation link sent to you upon registration.


![create-account](/platform/docs/assets/token-setup/Register.png)


## 2. Two-Factor Authentication
OST supports two-factor authentication to provide increased login security for users connecting to OST Platform. It is automatically enabled for all accounts. You need to download an authentication app like Google Authenticator, a free app that is readily available on both [Google Play](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en) and the [Apple App](https://itunes.apple.com/in/app/google-authenticator/id388497605?mt=8) Store. See the [installation guide](https://support.google.com/accounts/answer/1066447?co=GENIE.Platform%3DAndroid&hl=en) for more information.



The app will ask you to Add an Account by Scanning a barcode.

On OST Platform interface you will  see a QR code. Scan this QR code through the Google Authenticator app on your smartphone by selecting the option ‘Scan a barcode’. 

Once the QR code has been scanned, you will be able to see your OST Platform account added to the list of accounts inside your Google Authenticator app.

**This step is optional in sandbox mode.**

![Two-Factor Authentication](/platform/docs/assets/token-setup/2FA.png)




## 3. Set Up Brand Token
During token setup you will set up Token Name (only letters, numbers, spaces allowed, at max 20 characters and 3 words) and select a Token Identifier (at max 4 letters or numbers, at min 1 letter required, no special characters allowed) for your brand token. You also need to set the conversion rate between your Brand Token and the staked value token (e.g. OST Token).

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

