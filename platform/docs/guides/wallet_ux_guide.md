---
id: wallet_ux_guide
title: Wallet UX Guide
sidebar_label: Wallet UX
---

![UX Guide Title](/platform/docs/assets/wallet-ux-guide/Wallet-UX-title.jpg)


We use an example of a restaurant recommendation application to illustrate how a Brand could use the Wallet SDK to integrate the functionality of a non-custodial wallet into their application. The UX case study aims to serve as a reference for Brand developers and help create a faster and smoother implementation of the Wallet SDK with the application

We’ll be using a fictitious idea of sharing your favorite local food experiences to illustrate the key concepts of the Wallet SDK implementation and Tokenization.

<br>

## Workflow: Introduction and application update

The goal of the splash screen is to introduce the user to Brand Tokens. Here, a Brand can introduce their Token economy and its benefits. 

The CTA on this page is for the user to update the application to the latest version so that their version of the application has the OST Wallet SDK integrated. 

![Update](/platform/docs/assets/wallet-ux-guide/0.0-update-to-2.0.jpg)
![onbaording](/platform/docs/assets/wallet-ux-guide/0.1-Onboarding.jpg)


## Workflow: 


### 1. Create a Wallet 

A user needs a Brand Token wallet to participate in Brand Token economy.
To create a Brand Token wallet, the user needs to enter a PIN. The PIN must be at least 6-digits. The 6-digit PIN will also be used to recover the Wallet and has reduced the barrier for users to interact with tokens without having to write down their 12-word seed phrase.

![create wallet](/platform/docs/assets/wallet-ux-guide/1-Create-a-Wallet.jpg)

### 2. Authorize a session 

A session refers to a duration of time when the sessionKeys can seamlessly sign a transaction on behalf of the user for in-app transactions under the authorized spending limit. The user’s 6-digit PIN can be used to authorize a session.  

![Authorize](/platform/docs/assets/wallet-ux-guide/2-Authorize-a-Session.jpg)


### 3. Reduce friction using biometrics 

A 6-digit PIN is nicer than a private key, but using biometrics on top of a 6-digit PIN gets your users the security they need with none of the hassles. 

![image](/platform/docs/assets/wallet-ux-guide/3-Reduce-Friction.jpg)

### 4. Drive engagement with earning actions 

Building a Brand economy lets you reward your users for engaging with your application and adding value to your application. 

![image](/platform/docs/assets/wallet-ux-guide/4-Drive-Engagement.jpg)


### 5. Give your users spending options 

To keep your users engaged and strengthen the perception of your Brand, use spending and redemption options that resonate with your users.

![image](/platform/docs/assets/wallet-ux-guide/5-Spending-Options.jpg)

If your token economy has a web counterpart, spend actions can be authorized by using the Mobile Wallet.

![image](/platform/docs/assets/wallet-ux-guide/5-WebStore.jpg)

### 6. Balances and Activity history

After every earning or spending activity, allow the user the choice to look at their activity history and balances. Whenever the user views their balances, you could show them either how to earn more Brand Tokens or options for how they could spend their tokens.

![image](/platform/docs/assets/wallet-ux-guide/6-Balances-and-Activity.jpg)

### 7.  Authorizing another device via a QR code

The OST Wallet SDK natively supports multi-device access. Take advantage of the modular device management options by encouraging users to add devices. A QR code is a quick and easy way- the new device displays a QR code that can be scanned by an authorized device and once the authorized device approves the request, the new device is also authorized!

![image](/platform/docs/assets/wallet-ux-guide/7-Multi-Device.jpg)


### 8. Using mnemonic phrases to authorize a device 

For the crypto-savvier user that is excited by your Brand’s commitment to openness and community, you can enable authorizing a new device using a mnemonic phrase. 
To do so, an authorized device shows the mnemonic phrase (after verifying the PIN or biometrics, of course! )

![image](/platform/docs/assets/wallet-ux-guide/8-Backup-Mnemonic.jpg)



And the user enters this mnemonic phrase on a new device to authorize that device. 

![image](/platform/docs/assets/wallet-ux-guide/9-Mnemonic-Entry.jpg)

### 9. Recovery 


Oh no, a user lost the phone they had your application on. Thankfully, recovering access to funds is made painless with OST’s Wallet SDK  

![image](/platform/docs/assets/wallet-ux-guide/10-Recover-Wallet.jpg)