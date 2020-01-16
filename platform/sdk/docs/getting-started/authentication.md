---
id: authentication
title: Authentication
sidebar_label: Authentication
---

OST servers authenticate your API requests using your accounts API keys. If you do not include your key when making an API request or use a key that is incorrect or outdated, OST Platform API will return an error.

**API key pair: API key and API secret**
* API keys are meant to identify your account with OST, they aren’t secret
* In other words, they can be safely published in an Android or iOS app
* API secret should be kept confidential and only stored on your own servers. Your account's secret API key can perform any API request to OST.

:::note Sandbox vs Production
Every account is provided with separate keys for Sandbox and Production. Entities in one environment: users, devices, sessions, and so forth cannot be manipulated by entities in the other -- i.e. API requests exist in either Sandbox or Production.
:::

## Authentication Methods
| Authentication Method	| Description |
| --- | --- |
| Hash-based message authentication (HMAC) | Every API request on OST Platform API Endpoint requires hash-based message authentication. When using the Server Side SDKs, authentication is handled for you. In other languages you have to implement the signature generation by computing the HMAC sha256 digest of the API secret. You can find the details of the server side authentication process here. |
| Personal Signing	| Wallet SDK provides secure authentication by signing of data from user's mobile device. The SDK ensures a high level of privacy and trust, since the private keys with which it signs data never have to leave the mobile device. You can find the details of the authentication process within wallet SDK here. |
| Smartphone application	| Within client company's native application where client company demands the user to authenticate before the user authorizes sessions or devices. |

## Obtaining your API keys
Your API keys are available in the Developers page in OST Platform

![start-your-integration](/platform/docs/assets/dev_page.png)

:::warning
Use your Sandbox API keys for development and testing and keep them segregated from your Production keys. This will ensure that you don't accidentially manipulate Production data.
:::

## Sandbox and Production Environments
Sandbox (testnet) and Production (mainnet) function almost identically, with a few necessary differences:
* In Sandbox, either OST-Test (OSTT) or USDC-Test (USDCT) is used to mint Tokens. We grant 10,000 OSTT or USDCT as a stake for you to get started.
* You can view blockchain data for both environments on [OST VIEW](https://view.ost.com) -- select either Testnet or Mainnet in dropdown there.

## Keep your keys safe
:::warning Keep your keys safe
Your secret API key can be used to make any API call on behalf of your account. You should only grant access to your API keys to those that need them. Ensure they are kept out of any version control system that you may be using.
:::

## Rolling keys
If an API key is compromised, roll the key in the OST Platform Developers page to block it and generate a new one.

When rolling an API key, you can choose to delete the old key immediately or allow it to work for 24 hours, providing you with time to make the transition. In either case, the new key can be used immediately.

## Wallet SDK Authentication
OST has created Wallet SDKs, providing private key management, authorization and recovery of user wallet services from an Android or iOS app. With our Mobile Wallet SDK, OST shoulders the burden of creating a wallet for users to own their tokens without requiring them to directly manage their private crypto keys. The private keys are limited to the device and the person with access to the device. Our Wallet SDKs use“Personal” sign authentication to communicate with our servers.

:::note Wallet SDK 'Api Signer' token
Your app will receive a token created by Wallet SDK which we call **‘Api Signer’**. 
* Your app can then send the token to an endpoint on your server, where it can be used to register a device on OST Platform server
* Once the ‘Api Signer’ token is registered, the Wallet SDK can start communicating with OST APIs
* The Wallet SDK ‘Personal’ signs the API request using ‘Api Signer’
* OST Platform validates ‘Personal’ signed API calls by recovering the API key address
:::