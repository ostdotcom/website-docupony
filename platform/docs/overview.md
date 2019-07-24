---
id: overview
title: OST Platform Overview
sidebar_label: Overview
---

:::note OST Platform is built on OpenST Protocol and OpenST Mosaic
OST Platform is built on [OpenST Protocol](https://openst.org/) and OpenST Mosaic. Together, these allow for the creation of _value-backed_ Brand Tokens on scalable side-chains on Etheruem, and finalizing thousands of transactions per second asynchronously to Ethereum at low cost.
:::

The **OST Platform** is designed to provide everything businesses with millions of users need to deploy Brand Tokens to drive engagement. It’s a complete set of developer tools that any company can integrate without any blockchain expertise. As a developer exploring the OST Platform, we hope you enjoy engaging with the technology and interacting with the OST blockchain protocols, contracts, APIs, and SDKs.

The **Server Side APIs and SDKs** provide various endpoints/methods that can be used by developers to design and manage their Brand Token Economies. The **OST Wallet SDKs** enable end-users to safely interact with Brand Tokens.

## Easily deploy a Brand Token Economy
OST Platform's user interface enables companies to create Brand Tokens by choosing a Token Name, Token Identifier and a conversion rate between the Brand Token and OST.

You can follow the [create token guide](/platform/docs/1-create/) to deploy a Brand Token economy.

OST Platform infrastructure handles the deployment of various smart-contracts to create Brand Tokens such as:
 * **BrandedToken**: Mainstream application’s value-backed token, designed specifically for its application’s context
 * **UtilityBrandedToken**: Representation of a BrandedToken on a sidechain, utilized in transactions within an application

The Platform also deploys contracts that are used to manage the Brand Token Economy, such as:
 * **TokenRules**:** Enables defining a token economy by registering token rules for transfers
 * ****PricerRule**:** Rule for transferring tokens in amounts equivalent to selected other currencies (EUR, GBP, USD)

 **You will learn more about these contracts as you explore these pages.**

:::note Gas Fees
OST Platform enables companies to deploy contracts and transact without worrying about calculating gas.
:::

