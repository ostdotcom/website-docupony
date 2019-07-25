---
id: authentication
title: Authentication
sidebar_label: Authentication
---

## Server Side API Authentication
OST servers authenticate your API requests using your account’s API keys. If you do not include your key when making an API request, or use one that is incorrect or outdated, OST Platform API returns an error.

Every account is provided with separate keys for sandbox environment and for production environment. All API requests exist in either sandbox mode or production mode, and entities—users, devices, sessions, and so forth—in one mode cannot be manipulated by entities in the other.

There is a key pair: API key and API secret

* API keys are meant to identify your account with OST, they aren’t secret. In other words, they can safely be published in an Android or iOS app. 
* API secret should be kept confidential and only stored on your own servers. Your account's secret API key can perform any API request to OST.

**Every account is provided with two pairs of keys: one for sandbox environment and one for production environment.**

### Obtaining your API keys

Your API keys are available in the Developers page in OST Platform. 

**Use only your sandbox environment API keys for testing and development.** This ensures that you don't modify your live production data.

### Sandbox and Production mode
The sandbox and production modes function almost identically, with a few necessary differences:

* In sandbox mode, OST-Test is used to mint Brand Tokens. We grant 10,000 OST-Test for you to get started.
* You can view blockchain data of both environments on OST View by selecting either Testnet in dropdown for sandbox or Mainnet for production.

You can view test data by toggling back to OST Platform Sandbox mode.

### Keeping your keys safe

Your secret API key can be used to make any API call on behalf of your account. You should only grant access to your API keys to those that need them. Ensure they are kept out of any version control system that you may be using.

### Rolling keys

If an API key is compromised, roll the key in the Developers Page to block it and generate a new one.

When rolling an API key, you can choose to delete the old key immediately or allow it to work for 24 hours, providing you with time to make the transitions. In either case, the new key can be used immediately.


## Wallet SDK Authentication
OST has created Wallet SDK, providing private key management, authorization and recovery of user wallet services from an Android app or iOS app. With our wallet SDK, OST shoulders the burden of creating a wallet for users to own their tokens without requiring them to directly manage their private crypto keys. The private keys are limited to the device and the person with access to the device. And our wallet SDK uses “Personal” sign authentication to communicates to our servers.

Your app will receive a token created by Wallet SDK which we call ‘Api Signer’. Your app can then send the token to an endpoint on your server, where it can be used to register a device on OST Platform server. Once the ‘Api Signer’ token is registered, the wallet SDK can directly start communicating with OST APIs. The SDK ‘Personal’ signs the API request using the ‘Api Signer’. The OST Platform validates the ‘personal’ signed API call by recovering the API key address.