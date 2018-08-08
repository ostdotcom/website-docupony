---
id: version-1.1.0-guide_buy_in
title: Integrating Payment Processors to Simulate Buy-In
sidebar_label: Simulate Buy-In Using Payment Processors
original_id: guide_buy_in


---
While OST KIT is in Alpha, all of our token economies are operated on Ropsten testnet. Therefore, OSTα, the base token needed for running your token economy, has no real-world value. However, in order to have a fully functioning token economy i.e. one that incorporates Buy-Spend-Earn dynamics from users, you'll need to enable users to buy-in to your economy. This guide walks you through the process of integrating a payment processor (we use Stripe as an example) with your App and using a combination of their APIs and ours to simulate "buying" of Branded Tokens while we are on the testnet.

In this [<u>guide</u>](https://drive.google.com/open?id=1z5yEgEauPbwvKBNnwMnPC-8QVt299T9O), we include sample code for the Ruby SDK, the Quickstart guide for the SDK is [<u>here</u>](https://dev.ost.com/docs/sdk_ruby.html).
