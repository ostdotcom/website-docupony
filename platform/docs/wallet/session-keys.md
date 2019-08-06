---
id: session-keys
title: Ephemeral Session Keys
sidebar_label: - Session Keys
---

In the context of Tokens used in OST's client economies, the public address is represented by a TokenHolder contract. The configured owner of a TokenHolder contract can authorize "ephemeral" keys, sessionKeys, to transact on the user's behalf for a predetermined amount of time and with a defined maximum spend per transaction.

:::note Ephemeral Session Keys
1. Ephemeral sessionKeys obviate the need for users to sign every transaction within the application thereby creating a more seamless user experience
2. The authorization of ephemeral sessionKeys requires the owner to sign a transaction
:::

During an active session, transactions of a value lower than the spendingLimit are signed without explicit involvement from the user. We recommend that clients link the creation of these transactions to explicit user activity within their application. A user can also revoke active sessions, revoke other authorized devices and sign out of the TokenHolder thereby revoking all sessions. 

A multi-signature contract, the MultiSig, is configured as the owner of the TokenHolder contract and one or more keys are configured as owners to that MultiSig. This means that multiple owner keys can have authority over a TokenHolder contract.  Therefore, a user can have owner keys present on multiple devices (such as mobile phones and tablets), so that when moving between devices, the keys are not shared. 

:::warning MultiSig Contract, Owner of TokenHolder
1. To add additional, remove or replace owner keys, a pre-agreed number of existing owners must sign the transaction
2. This pre-agreed number is required signatures is intuitively called the threshold of the MultiSig
3. To change the number of signatures required, the pre-agreed number of owners must sign the transaction.
4. Using GnosisSafe as the MultiSig enables us to use "executable transactions" (transactions that are signed by one key, but for which the computations are paid by a different key), per [EIP-1077](https://eips.ethereum.org/EIPS/eip-1077). As a result, owner keys do not need to the hold base currency to pay for gas. 
:::