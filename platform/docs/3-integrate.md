---
id: 3-integrate
title: Start Integration in Sandbox
sidebar_label: Step 3. Start Integration
---

:::tip Create Token > Plan and Design > Start Integration > Launch to End-users!
| Step | Description | Skillset | Approx Duration | 
| --- | --- | :---: | :---: |
| **3. Start Integration** <br>(in Sandbox) | <ul><li>Access your API key and API secret</li><li>Review technical guides</li><li>Decide which APIs/SDKs to use</li><li>Perform test transactions</li><li>Finalise development and design</li></ul> | Technical | Up to 4 weeks <br>(see below) |
:::

## a. Access your API key and API secret
Log-in to OST Platform and go to the **Developers** tab. There you can find your API key and API secret. You need to confirm your email address before getting access.

![create-account](/platform/docs/assets/developers_tab.png)

:::note API Requests
Every API request has 4 mandatory parameters that must be included: 
* `api_key`: the API key as provided from developers page inside OST Platform dashboard.
* `api_request_timestamp`: the current unix timestamp in seconds.
* `api_signature`: the signature as the sha256 digest of the shared API secret and the correctly formatted query string as described below.
* `api_signature_kind`: the value for this parameter should be OST1-HMAC-SHA256. 
:::

## b. Review technical guides
Check-out our technical implementation guides for an overview of how to approach the integration, best practices, and tips. You can find these in the main menu on the left.

## c. Decide which APIs/SDKs to use

### Server Side SDKs
* [PHP](/platform/docs/sdk/server-side-sdks/php/)
* [Ruby](/platform/docs/sdk/server-side-sdks/ruby/)
* [Java](/platform/docs/sdk/server-side-sdks/java/)
* [Node.js](/platform/docs/sdk/server-side-sdks/nodejs/)

### Mobile Wallet SDKs
* [Android](/platform/docs/sdk/mobile-wallet-sdks/android/) 
* [iOS](/platform/docs/sdk/mobile-wallet-sdks/iOS)
* [Reach Native](/platform/docs/sdk/mobile-wallet-sdks/react-native)

## d. Perform test transactions
Perform test transactions in Sandbox to ensure everything is working as expected! Check our [Go-Live Checklist](/platform/docs/guides/golive-checklist/) for a list of things to consider.

:::tip user_ID Map
When you integrate Brand Tokens into your application, please remember to:
 * Create and maintain a map of OST Platform user_id to the user's profile on their app
 * [Generate and safely store a 30 character "secret" for each user](/platform/docs/guides/create-user-wallet/#generate-passphaseprefix). This "secret" is used for the recovery and thus must be unique to each user.
:::

## e. Finalise development and design (Step 2)
After you have conducted tests in Sandbox and have a better feel for the finalise these steps before moving to Step 4
* **Token name and identifier** (in Production, does not need to match Sandbox)
* **What to stake** and how much to stake to being with
* **Conversion rate:** Brand Token to underlying stake / value token
* **Mobile and web UX and design and implementation**
