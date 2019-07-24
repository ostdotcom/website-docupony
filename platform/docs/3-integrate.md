---
id: 3-integrate
title: 3. Start Integration
sidebar_label: Step 3. Start Integration
---

:::tip Start Integration
| Step | Description | Skillset |
| --- | --- | --- |
| **3. Start Integration** <br>(in Sandbox) | <ul><li>Review technical guides</li><li>Decide which APIs/SDKs to use</li><li>Perform test transactions</li><li>Request to move to Production</li></ul> | Technical |
:::

## a. Review technical guides
Check-out our technical implementation guides for an overview of how to approach the integration, best practices, and tips. You can find these in the main menu on the left.

## b. Decide which APIs/SDKs to use

### Server Side SDKs
* [PHP](/platform/docs/sdk/server-side-sdks/php/)
* [Ruby](/platform/docs/sdk/server-side-sdks/ruby/)
* [Java](/platform/docs/sdk/server-side-sdks/java/)
* [Node.js](/platform/docs/sdk/server-side-sdks/nodejs/)

### Mobile Wallet SDKs
* [Android](/platform/docs/sdk/mobile-wallet-sdks/android/) 
* [iOS](/platform/docs/sdk/mobile-wallet-sdks/ios/)

::: note OST Wallet App
Check-out the OST Wallet App for a sample implementation of the OST Wallet SDKs
:::

:::important user_ID Map
When you integrate Brand Tokens into your application, please remember to:
 * Create and maintain a map of OST Platform user_id to the user's profile on their app
 * [Generate and safely store a 30 character "secret" for each user](/platform/docs/guides/create-user-wallet/#generate-passphaseprefix). This "secret" is used for the recovery and thus must be unique to each user.
:::

## c. Perform test transactions
Perform test transactions in Sandbox to ensure everything is working as expected! Check our [Go-Live Checklist](/platform/docs/guides/golive-checklist/) for a list of things to consider.

## d. Request to move to Production
To move from Sandbox to Production, click on the toggle switch in [OST Platform dashboard](https://platform.ost.com) and follow the instructions. At the moment, you are required to fill-out a Google Form.

:::important Sandbox
The Sandbox will still be available to you after you have been permitted to Production.
:::