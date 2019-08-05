---
id: security-features
title: OST Platform Security Features
sidebar_label: Security Features
---

## OST Wallet: 1st crypto wallet w/ session keys

8/ @OSTdotcom we have designed a wallet UX and security model that enables non-custodial wallets to be seamlessly integrated into mainstream apps.

Users do not need to manually sign every transaction.

Users control their own keys, but do not need to write down 12 words.


"17/ 

- To further reduce friction, the OST Wallet SDK also supports the use of biometrics for the second level of authentication of the user, i.e. a user can use biometrics to authorize a session, request a mnemonic phrase etc."

18/ 

-For recovery, 6 digit PIN, on its own, does not provide enough entropy to be secure. However, OST Wallet SDK combines inputs from user (PIN), app developer, and OST, through cryptographically secure process to generate a recoveryKey to request recovery from smart-contract

19/ 

-The recovery smart contract (known as the delayedRecoveryModule) also enforces a 12 hour waiting period during which the user can abort the recovery request using any of their authorized devices, further protecting the user from malicious recovery requests.



Jason's wallet tweet
https://docs.google.com/spreadsheets/d/1LXT-WS9D07GtdveKWWV5p1cOXbXNDmKsZ-tg1z_15nY/edit#gid=130530926

## Security Audits
OST smart contracts were audited by Cure53

### Background Reading
* We organized a 2-day deep-dive of our initial spec with Cure53 to ensure that the SDK would be designed for maximum security
* During the workshop, we uncovered some potential vulnerabilities wrt supporting browsers (our original spec included browser-first experiences) due to the memory management and general lack of availability of a secure location to store keys 
* We, therefore, decided to go with a mobile-first approach
* We also uncovered potential vulnerabilities associated with copying and storing keys and the creation of honeypots and therefore decided to store no keys in order to protect the value owned by our Partners' end users
* Finding the balance between holding no keys, and also wanting to ensure that access to tokens is recoverable, we decided to use a PIN/Passphrase encryption for keys, and store encrypted keys.

[Security Guidelines for generating passphasePrefix](/platform/docs/go-live-checklist/#server-side-checklist)

## Ephemeral Session Keys
In the context of Tokens used in OST's client economies, the public address is represented by a **TokenHolder** contract. The configured owner of a **TokenHolder** contract can authorize "ephemeral" keys, sessionKeys, to transact on the user's behalf for a predetermined amount of time and with a defined maximum spend per transaction.

:::note Ephemeral Session Keys
1. Ephemeral sessionKeys obviate the need for users to sign every transaction within the application thereby creating a more seamless user experience
2. The authorization of ephemeral sessionKeys requires the owner to sign a transaction
:::

During an active session, transactions of a value lower than the spendingLimit are signed without explicit involvement from the user. We recommend that clients link the creation of these transactions to explicit user activity within their application. A user can also revoke active sessions, revoke other authorized devices and sign out of the **TokenHolder** thereby revoking all sessions. 

A multi-signature contract, the **MultiSig**, is configured as the owner of the **TokenHolder** contract and one or more keys are configured as owners to that **MultiSig**. This means that multiple owner keys can have authority over a **TokenHolder** contract.  Therefore, a user can have owner keys present on multiple devices (such as mobile phones and tablets), so that when moving between devices, the keys are not shared. 

:::warning MultiSig Contract, Owner of TokenHolder
1. To add additional, remove or replace owner keys, a pre-agreed number of existing owners must sign the transaction
2. This pre-agreed number is required signatures is intuitively called the threshold of the **MultiSig**
3. To change the number of signatures required, the pre-agreed number of owners must sign the transaction.
4. Using GnosisSafe as the **MultiSig** enables us to use "executable transactions" (transactions that are signed by one key, but for which the computations are paid by a different key), per [EIP-1077](https://eips.ethereum.org/EIPS/eip-1077). As a result, owner keys do not need to the hold base currency to pay for gas. 
:::

## 6-digit User PIN
**One of the core innovations of OST Wallet** is that is enables users to use wallets with only setting **6 digit PIN**s for recovery. Normally a **6 digit PIN**, on its own, does not provide enough entropy to be secure. The OST Wallet SDK achieves security by combining inputs from the user (PIN), an encrypted secret from the company, and from OST. The concatenated string undergoes a transformation through a cryptographically secure process to generate a recoveryKey that can be used to request recovery using a smart-contract. The recovery smart contract (known as the **DelayedRecoveryModule**) enforces a 12 hour waiting period during which the user can abort the recovery request using any of their authorized devices, further protecting the user from malicious recovery requests. 

(Optionally OST clients can also enable experiences for their users to recover access to their Tokens from a second device and/or recover from 12 written words, however, these are optional implementations.)

## Wallet Recovery
With the Wallet SDK, OST supports its clients in integrating the functionality of a non-custodial cryptocurrency wallet into their mobile applications. The users' private keys are generated and stored on their mobile device.

This guide describes the ways in which application developers can work with the OST Wallet SDK to enable their users to regain access to their funds in case they lose access to their mobile device. 

The current features of OST's key management solution that enable recovery are:
 
1. The user's funds are held in a smart contract on the blockchain. This contract called the **TokenHolder** contract serves as the public address where the balances sit. 
2. The  **TokenHolder** contract is owned by a **MultiSig** contract. Multiple private keys that sit on the user's mobile devices can own the **MultiSig** contract
3. Each user's Wallet also includes a recovery module that is owned by a key that is created using inputs from the user (a **6 digit PIN**), the client and OST. 

![OSTWalletRecovery](/platform/docs/assets/ost-wallet-recovery.jpg)

### Recovery using a **6 digit PIN**
The methods described above are robust and secure. However, they are attractive to the security-minded savvy user that has thought ahead before their device was compromised or lost. Most users, especially when operating within the context of Web2 applications would find some of the steps to be burdensome. This method of recovery uses a smart contract that requires inputs from the user (a **6 digit PIN**) the application, and OST to grant access to a new key. An additional element of time delay is added between the initiation of the recovery and granting access to a new key to give the participants time to about any malicious recovery processes that may be initiated. 

![recovery-pin](/platform/docs/assets/create-pin.png)

### Recovery using additional devices 
The OST Wallet SDK natively supports multiple devices. The easiest way to regain access in case of a compromised device is to already have a second device. If a user is able to add a second (or even third) trusted device, the way to recover from a lost of the hacked device is to revoke its access. 

Adding and removing devices, which really just alters the list of the owners of the **MultiSig** contract described above is a transaction that requires a signature from owners. The number of signatures needed can be adjusted by a user; as a matter of likelihood, we default to one owner signature in the examples here.

Thus, there is the process of adding a and additional device which must happen before recovery is needed. Given that there is an authorized device, the user can use this device to replace the key from the compromised device with one from a new deivce. 

![recovery-using-additional-device](/platform/docs/assets/qr-scan.png)

To add a device as an owner of the  **TokenHolder** contract, an existing owner must sign the transaction to add the device. To create the transaction to add a new key, a  QR code is generated on the new device; the user can scan this code with their old device and confirm the details to authorize the new device. 

To remove a device as an owner, the user would need to go to a device management page and choose the device to revoke. Upon signing a confirmation the compromised device would cease to be an owner. 

### Recovery using 12 words 
Writing down a 12-word recovery key is pretty much the best-known way to back up cryptocurrency wallets. The 12-word seed-phrase that is displayed by a device represents an additional device. Therefore, if a user writes down their seed phrase and confirms that they have secured it, from a smart-contract perspective, it is equivalent to having a second device with a key on it.

As with the recovery from the additional device, the user should have written down their seed-phrase before losing their device.

![recovery-12-words](/platform/docs/assets/seed-phrase.png)

The process of regaining access to the Wallet using the seed phrase would involve typing the words in the correct order. When they do so, a valid key to their Wallet is generated and stored on their device.

## Multi-Device
The OST Wallet SDK natively supports multi-device access. Thus a user can have independent private keys on different devices, all controlling the same **TokenHolder** contract. This allows for more modular management of keys and revocation of keys that may have been compromised. These features are used in the OST smart-contract based recovery wherein a user input (which is minimally a **6 digit PIN**), an application or client input (which is minimally a 30 character string) and input from OST are combined in a cryptographically secure manner to prove the user's ownership of the Tokens and authorize a new device.

The user input -assumed to be a **6 digit PIN**- is also used to guard access to sensitive operations such as authorizing devices, viewing the mnemonic phrase, etc.  

![ERDUserSetupDiagram](/platform/docs/assets/ERD_user_setup.jpg)


## Security Audit Recommendation
:::warning Security Audit
We strongly recommend that your application is reviewed by security assessors/auditors to evaluate the general security of the application and also an analysis of the security vulnerabilities caused by the usage of 3rd party libraries and other dependencies.
:::
