---
id: whitelisting
title: Whitelisting
sidebar_label: Whitelisting
---

# Whitelisting Service
One of OST KYC's services is the Ethereum address whitelisting. This service ensures that the deposit address of the ICO client will be able to receive funds only from Ethereum addresses that have been whitelisted in the ICO's smart contract. 

## How does it work?
###  Updating the whitelisting contract address
 * ICO client needs to provide Whitelisting contract address.
* This address could be the same or different from the client's deposit address.

### Verified Operator Address (VOA)
This is an OST Ethereum address that needs to be set in the ICO client's contracts. Only this address is allowed to call the whitelisting transaction in the ICO's contract. 

### Whitelisting logic on the blockchain
After the whitelisting transaction was submitted we wait 90 seconds which is the time needed for 6 new blocks to be mined. If the block where the transaction was performed on is still existing after 90 seconds, we can say the transaction is confirmed and therefore the Ethereum address of the investor is whitelisted.