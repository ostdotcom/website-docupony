---
id: user-experience
title: Seamless User Experience
sidebar_label: - User Experience
---

A user can use a 6 digit PIN to authorize an ephemeral sessionKey. These ephemeral sessionKeys, which remain active for a period of time chosen by the user or developer of the application (based on the implementation) obviate the need for the user to sign every transaction within the application thereby creating a more seamless user experience. When a session expires, the user can authorise a new session with 6 digit PIN.

## 6-digit User PIN
One of the core innovations of OST Wallet is that is enables users to use wallets with only setting 6 digit PINs for recovery. Normally a 6 digit PIN, on its own, does not provide enough entropy to be secure. The OST Wallet SDK achieves security by combining inputs from the user (PIN), an encrypted secret from the company, and from OST. The concatenated string undergoes a transformation through a cryptographically secure process to generate a recoveryKey that can be used to request recovery using a smart-contract. The recovery smart contract (known as the DelayedRecoveryModule) enforces a 12 hour waiting period during which the user can abort the recovery request using any of their authorized devices, further protecting the user from malicious recovery requests. 

(Optionally OST clients can also enable experiences for their users to recover access to their Tokens from a second device and/or recover from 12 written words, however, these are optional implementations.)

## Biometrics
To reduce friction further, the OST Wallet SDK also supports the use of biometrics for the second level of authentication of the user, i.e. a user can use biometrics to authorize a session, request a mnemonic phrase. Check the [Wallet UX Guidelines](/platform/docs/ux/) to understand the possible flows and recommended user experience (UX).

:::note Intended User Experience
The intended user experience is that most users will set a 6 digit PIN and then add their biometrics, from that point on, all day-to-day usage of the wallet can be done with biometrics. The PIN is only used thereafter for recovery or if biometrics are not functioning. 

**The user does not need to use her PIN or biometrics to view her wallet balance or ledger, rather only to re-authorize a session to spend tokens.**
:::