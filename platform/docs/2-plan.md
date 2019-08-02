---
id: 2-plan
title: Plan and Design Your Token
sidebar_label: Step 2. Plan and Design
---

:::tip Create Token > Plan and Design > Start Integration > Launch to End-users!
| Step | Description | Skillset | Approx Duration | 
| --- | --- | :---: | :---: |
| **2. Plan and Design** | <ul><li>Buy, earn, spend, redeem actions</li><li>What to stake</li><li>Conversion rate</li><li>Mobile and web UX and design</li></ul> | Non-technical | ~1 week |
:::

:::note Note
Step 2 can be conducted in parallal with Step 3. Step 2 and Step 3 must be finalised before moving to Production and launching to end-users (Step 4).
:::

## a. Buy, earn, spend, redeem actions
The primary drivers in an ecosystem are buy, earn, spend, and redeem. These must be balanced in order to have a well functioning and  sustainable ecosystem.

| Action | Example | 
| --- | --- |
| Buy | Tokens purchased with fiat | 
| Earn | Compensation in return for micro-contributions, services or tasks performed |
| Spend | Payment for merch, other assets, services or tasks |
| Redeem (cash-out) | Tokens are redeemed for gift cards, other crypto, or fiat |

![TokenEconomyFlows](/platform/docs/assets/token-economy-flows.png)

## b. What to stake?
With OST Platform you can stake either USDC (a stablecoin) or OST tokens.

### Why Stake a Stablecoin?
By default, Tokens are backed by staking OST tokens on Ethereum mainnet. Their value is backed by OST tokens at a fixed conversion rate set by you when you first create your BT. As a result, the value of your BT rises and falls with the market-determined price of OST tokens.

If you would like your BTs to have a stable value, you can back them by staking stablecoins instead of OST tokens. Stablecoins are cryptocurrencies designed to minimise the effects of market-driven price volatility by being backed by a fiat currency, such as US Dollars. By staking stablecoins, you minimize fluctuations in the value of your BT.

:::note USDC
USDC is a type of stablecoin where each USDC issued and in circulation is backed by $1 USD held in a bank account audited monthly. This backing means that 1 USDC can always be redeemed for US$1.00. This effectively gives USDC a stable price.
:::

![create-account](/platform/docs/assets/token-setup/token_setup.png)

## c. Conversion Rate
The Conversion Rate is the value of a Token relative to the underlying stake, the value token. OST Platform sets a default conversation rate of 1BT = 1OST. If you like, you can set an alternative conversion rate by selecting Edit under Advanced Options. 

We recommend using the default conversion rate in Sandbox i.e. 1 BT = 1 OST. You can then make a more informed decision when setting-up your Token in Production. If you need help setting the conversion rate, you can reach out to us at support@ost.com.

Things to consider when setting the conversion rate:
* Fiat value of each token (this will be subject to change if you stake a non-stablecoin)
* Fiat value of each action
* Typical token denomination: 10s, 100s, 1000s?

:::warning Conversion Rate
- Once you mint your token, the conversion rate is fixed and cannot be changed.
- Conversion rates do not transfer from Sandbox to Production and must be set again during the token setup in the Production environment.
:::

## d. Mobile and web UX and design
We have provided [Wallet UX Guidelines](/platform/docs/ux/) with screens and flows and helpful suggestions to get you started! We are also working on making available UI screens through our Wallet SDKs. These will be available in Aug / Sep 2019.