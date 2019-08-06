---
id: recovery
title: Innovative Wallet Recovery Mechanisms
sidebar_label: - Recovery Mechanisms
---

With the Wallet SDK, OST supports its clients in integrating the functionality of a non-custodial cryptocurrency wallet into their mobile applications. The users' private keys are generated and stored on their mobile device.

This guide describes the ways in which application developers can work with the OST Wallet SDK to enable their users to regain access to their funds in case they lose access to their mobile device. 

The current features of OST's key management solution that enable recovery are:
 
1. The user's funds are held in a smart contract on the blockchain. This contract called the TokenHolder contract serves as the public address where the balances sit. 
2. The  TokenHolder contract is owned by a MultiSig contract. Multiple private keys that sit on the user's mobile devices can own the MultiSig contract
3. Each user's Wallet also includes a recovery module that is owned by a key that is created using inputs from the user (a 6 digit PIN), the client and OST. 

![OSTWalletRecovery](/platform/docs/assets/ost-wallet-recovery.jpg)

### Recovery using a 6 digit PIN
The methods described above are robust and secure. However, they are attractive to the security-minded savvy user that has thought ahead before their device was compromised or lost. Most users, especially when operating within the context of Web2 applications would find some of the steps to be burdensome. This method of recovery uses a smart contract that requires inputs from the user (a 6 digit PIN) the application, and OST to grant access to a new key. An additional element of time delay is added between the initiation of the recovery and granting access to a new key to give the participants time to about any malicious recovery processes that may be initiated. 

![recovery-pin](/platform/docs/assets/create-pin.png)

### Recovery using additional devices 
The OST Wallet SDK natively supports multiple devices. The easiest way to regain access in case of a compromised device is to already have a second device. If a user is able to add a second (or even third) trusted device, the way to recover from a lost of the hacked device is to revoke its access. 

Adding and removing devices, which really just alters the list of the owners of the MultiSig contract described above is a transaction that requires a signature from owners. The number of signatures needed can be adjusted by a user; as a matter of likelihood, we default to one owner signature in the examples here.

Thus, there is the process of adding a and additional device which must happen before recovery is needed. Given that there is an authorized device, the user can use this device to replace the key from the compromised device with one from a new deivce. 

![recovery-using-additional-device](/platform/docs/assets/qr-scan.png)

To add a device as an owner of the  TokenHolder contract, an existing owner must sign the transaction to add the device. To create the transaction to add a new key, a  QR code is generated on the new device; the user can scan this code with their old device and confirm the details to authorize the new device. 

To remove a device as an owner, the user would need to go to a device management page and choose the device to revoke. Upon signing a confirmation the compromised device would cease to be an owner. 

### Recovery using 12 words 
Writing down a 12-word recovery key is pretty much the best-known way to back up cryptocurrency wallets. The 12-word seed-phrase that is displayed by a device represents an additional device. Therefore, if a user writes down their seed phrase and confirms that they have secured it, from a smart-contract perspective, it is equivalent to having a second device with a key on it.

As with the recovery from the additional device, the user should have written down their seed-phrase before losing their device.

![recovery-12-words](/platform/docs/assets/seed-phrase.png)

The process of regaining access to the Wallet using the seed phrase would involve typing the words in the correct order. When they do so, a valid key to their Wallet is generated and stored on their device. 

:::note Logging in on a New Device
When a user logs in to the application from a new device with no registered key stored on it, the user can either add the device using one of the two methods described above or, if they have no other devices or seed phrases, choose to recover access to their wallet using the DelayedRecoveryModule smart contract using their 6 digit PIN.
:::

<hr>

## Background Reading - Safekeeping of Cryptocurrency Assets
In the normal course, cryptocurrency assets are held by a private key controlled by a person. For cryptocurrency to be "held" means that the software that administers that cryptocurrency (e.g. a smart contract) maps a balance to the public address of an account on the blockchain of either a private key or smart contract.

A private key is generated with data, the "seed", represented by some number of random words (12 is common), the "seed phrase". The seed phrase can be used to generate multiple private keys. Having access to the seed phrase effectively means having access to any private keys that seed phrase can be used to generate. A private key has a corresponding public key, which has a corresponding public address. Private keys should not exist in more than one location at a time—if a private key is on one device, it should not be on another device—this is both a technical and a security concern.

Typically, when someone sets up a cryptocurrency wallet, she will be shown the seed phrase used to generate the wallet’s private keys and instructed to write down the seed phrase and store that information in a secure location. In the event the person loses access to her wallet, and therefore to her keys, she has lost access to the funds held by those keys. If she can regain access to her keys, then she regains access to her funds. She can regain or “recover” access by inputting the seed phrase into a replacement wallet, which will regenerate the keys that were in the lost wallet. Having access to the keys means having access to the funds.

Typically, and as a decentralization matter, access to the seed phrase that was used to generate private keys is limited to the wallet and the person with access to the wallet—although a service may have provided the wallet, that service does not have access to the seed phrase or any private keys generated from that seed phrase.

Generally, anyone with access to a private key can access the funds held by it. Generally, anyone with access to the seed phrase can regenerate that private key.