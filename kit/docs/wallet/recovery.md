---
id: recovery
title: Wallet recovery
sidebar_label: Wallet recovery
---

With the Wallet SDK, OST supports its partners in integrating the functionality of a non-custodial cryptocurrency wallet into their mobile applications. The users' private keys are generated and stored on their mobile device.

This guide describes the ways in which application developers can work with the OST Wallet SDK to enable their users to regain access to their funds in case they lose access to their mobile device. 

The current features of OST's key management solution that enable recovery are:
 
1. The user's funds are held in a smart contract on the blockchain. This contract called the TokenHolder contract serves as the public address where the balances sit. 
2. The TokenHolder contract is owned by a Multisig contract. Multiple private keys that sit on the user's mobile devices can own the multisig contract
3. Each user's Wallet also includes a recovery module that is owned by a key that is created using inputs from the user (a 6 digit PIN) , the Partner and OST. 


![ost-wallet-story](/kit/docs/assets/ost-wallet-story.jpg)


## Recovery using a 6 digit PIN

The methods described above are robust and secure. However, they are attractive to the security-minded savvy user that has thought ahead before their device was compromised or lost. Most users, especially when operating within the context of Web2 applications would find some of the steps to be burdensome. This method of recovery uses a smart contract that requires inputs from the user (a 6 digit PIN) the application, and OST to grant access to a new key. An additional element of time delay is added between the initiation of the recovery and granting access to a new key to give the participants time to about any malicious recovery processes that may be initiated. 

![recovery-pin](/kit/docs/assets/create-pin.png)

## Recovery using additional devices 

The OST Wallet SDK natively supports multiple devices. The easiest way to regain access in case of a compromised device is to already have a second device. If a user is able to add a second (or even third) trusted device, the way to recover from a lost of the hacked device is to revoke its access. 

Adding and removing devices, which really just alters the list of the owners of the multisig contract described above is a transaction that requires a signature from owners. The number of signatures needed can be adjusted by a user; as a matter of likelihood, we default to one owner signature in the examples here.

Thus, there is the process of adding a and additional device which must happen before recovery is needed. Given that there is an authorized device, the user can use this device to replace the key from the compromised device with one from a new deivce. 


![recovery-using-additional-device](/kit/docs/assets/qr-scan.png)


To add a device as an owner of the TokenHolder contract, an existing owner must sign the transaction to add the device. To create the transaction to add a new key, a  QR code is generated on the new device; the user can scan this code with their old device and confirm the details to authorize the new device. 


To remove a device as an owner, the user would need to go to a device management page and choose the device to revoke. Upon signing a confirmation the compromised device would cease to be an owner. 


## Recovery using 12 words 
Writing down a 12-word recovery key is pretty much the best-known way to back up crypto-currency wallets. The 12-word seed-phrase that is displayed by a device represents an additional device. Therefore, if a user writes down their seed phrase and confirms that they have secured it, from a smart-contract perspective, it is equivalent to having a second device with a key on it.

As with the recovery from the additional device, the user should have written down their seed-phrase before losing their device.

![recovery-12-words](/kit/docs/assets/seed-phrase.png)


The process of regaining access to the Wallet using the seed phrase would involve typing the words in the correct order. When they do so, a valid key to their Wallet is generated and stored on their device. 