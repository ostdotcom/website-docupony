---
id: authentication
title: Server Side API Authentication
sidebar_label: Authentication
---

OST servers authenticate your API requests using your account's API keys. If you do not include your key when making an API request or use a key that is incorrect or outdated, OST Platform API will return an error.

:::note Sandbox vs Production
Every account is provided with separate keys for Sandbox and Production. All API requests exist in either Sandbox or Production. Entities in one environment: users, devices, sessions, and so forth cannot be manipulated by entities in the other.
:::

**Key pair: API key and API secret**
* API keys are meant to identify your account with OST, they aren’t secret. In other words, they can safely be published in an Android or iOS app.
* **API secret should be kept confidential and only stored on your own servers. Your account's secret API key can perform any API request to OST.**

## Obtaining your API keys
Your API keys are available in the Developers page in OST Platform. 

:::warning
Use your Sandbox API keys for development and testing and keep them segregated from your Production keys. This will ensure that you don't accidentially manipulate Production data.
:::

## Sandbox and Production Environments
Sandbox (testnet) and Production (mainnet) function almost identically, with a few necessary differences:

* In Sandbox, either OST-Test (OSTT) or USDC-Test (USDCT) is used to mint Brand Tokens. We grant 10,000 OSTT or USDCT as a stake for you to get started.
* You can view blockchain data for both environments on [OST VIEW](https://view.ost.com) -- select either Testnet or Mainnet in dropdown there.


## Keep your keys safe
:::warning Keep your keys safe
Your secret API key can be used to make any API call on behalf of your account. You should only grant access to your API keys to those that need them. Ensure they are kept out of any version control system that you may be using.
:::

## Rolling keys
If an API key is compromised, roll the key in the OST Platform Developers page to block it and generate a new one.

When rolling an API key, you can choose to delete the old key immediately or allow it to work for 24 hours, providing you with time to make the transition. In either case, the new key can be used immediately.

## Wallet SDK Authentication
OST has created Wallet SDKs, providing private key management, authorization and recovery of user wallet services from an Android or iOS app. **With our Mobile Wallet SDK, OST shoulders the burden of creating a wallet for users to own their tokens without requiring them to directly manage their private crypto keys.** The private keys are limited to the device and the person with access to the device. Our Wallet SDKs use“Personal” sign authentication to communicate with our servers.

:::note Wallet SDK 'Api Signer' token
Your app will receive a token created by Wallet SDK which we call **‘Api Signer’**. 
* Your app can then send the token to an endpoint on your server, where it can be used to register a device on OST Platform server
* Once the ‘Api Signer’ token is registered, the Wallet SDK can directly start communicating with OST APIs
* The Wallet SDK ‘Personal’ signs the API request using ‘Api Signer’
* OST Platform validates ‘Personal’ signed API calls by recovering the API key address
:::