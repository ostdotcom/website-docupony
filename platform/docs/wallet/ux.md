---
id: ux
title: Create a Seamless User Experience using the OST Wallet SDK
sidebar_label: Wallet UX Guidelines
---

In this guide, we use an example of a fictitious restaurant recommendation application, “Spoon” to illustrate how a Brand could use the Wallet SDK to integrate the functionality of a user-friendly non-custodial Brand Token wallet into their application. The UX case study aims to serve as a reference for Brand developers and to help create a faster and smoother implementation of the Wallet SDK with the application.

We’ll be using user stories around sharing favorite local food experiences to illustrate the key concepts of the Wallet SDK implementation and to present some basic ideas for Tokenization.

## Workflow: Introduction and App Update

The goal of the splash screen is to introduce the user to Brand Tokens. Here, a Brand can introduce their Token economy and its benefits. 

The CTA on this page is for the user to update the App to the latest version which has the OST Wallet SDK integrated. (Note: Your users will be required to update the app from the app store before they can access the Brand Token wallet.)

![Update](/platform/docs/assets/wallet-ux-guide/0-Onboarding.jpg)

![onbaording](/platform/docs/assets/wallet-ux-guide/0-1.1-Update-to-2.0.jpg)


## Workflow: 

### 1. Create a Wallet 

A user needs a Brand Token wallet to participate in Brand Token economy.

To create a Brand Token Wallet, the user needs to enter a PIN. Setting a PIN helps emphasize to your users the importance of securing their Brand Tokens. The PIN must be at least 6-digits. The same **6 digit PIN** will also be used to recover the Wallet using OST’s Recovery from Smart Contract method which eliminates the need for users to write down a 12-word seed phrase or private key.  We describe the recovery process in more detail below.

:::warning User Authentication
Your users do not need to enter a PIN to create their wallet until they visit the wallet section of your app. Likewise, the user does not need to re-enter their Wallet PIN to use other parts of your app. You can decide when and where in your app that you want to first introduce the Wallet.
:::

![create wallet](/platform/docs/assets/wallet-ux-guide/1-Create-a-Wallet.jpg)

### 2. Authorize a session 

A helpful feature of the OST Wallet SDK is Session Keys. A session refers to a duration of time when sessionKeys can seamlessly sign a transaction on behalf of the user for in-app transactions under the authorized spending limit. The user’s **6 digit PIN** can be used to authorize a session.

The default duration for Sessions is 2 weeks. During those two weeks, once the user has authorized the session, she can confirm transactions without having to re-enter her PIN.  

![Authorize](/platform/docs/assets/wallet-ux-guide/2-Authorize-a-Session.jpg)


### 3. Reduce friction using biometrics 

A **6 digit PIN** is a much nicer experience than a private key, but using biometrics on top of a **6 digit PIN** gets your users the security they need with none of the hassles. 

![image](/platform/docs/assets/wallet-ux-guide/3-Reduce-Friction.jpg)


Once biometrics are implemented, the user can authorize new Sessions with her biometrics and only rely on the PIN as a backup if biometrics are not working. 


### 4. Drive engagement with earning actions 

Building a Brand economy lets you reward your users for engaging with your application and adding value to your application. 

![image](/platform/docs/assets/wallet-ux-guide/4-Drive-Engagement.jpg)


### 5. Give your users spending options 

To keep your users engaged and strengthen the perception of your Brand, use spending options that resonate with your users.

![image](/platform/docs/assets/wallet-ux-guide/5-Spending-Options.jpg)

<br>

If your token economy has a web app, spend actions can be authorized by using the Mobile Wallet QR.  
The suggested way to generate QR codes is to use a library that generates QR codes on the machine without making any external requests or without connecting to any third-party services. Here are a few examples of such libraries in [PHP](https://github.com/endroid/qr-code) , [NodeJS/Javascript](https://github.com/neocotic/qrious) and [Java/Android](https://github.com/zxing/zxing) 

![image](/platform/docs/assets/wallet-ux-guide/5-WebStore.jpg)

An alternate way of performing transactions in web is via push notification. You can send the transaction data to the mobile app using push notification. Your mobile application can then use the transaction data to show the transaction confirmation dialog to the app user, who then can confirm or cancel the transaction. An image is shown below to give you an example.

![image](/platform/docs/assets/wallet-ux-guide/5.3-WebStore.jpg)

### 6. Balances and Activity history

The Balance and Ledger APIs allow the user to look at their current Brand Token balance and transaction history. Whenever the user views their balances, we recommend showing them how to earn more tokens or options for how they could spend their tokens.

:::warning User Authentication
The user does not need to be authorized for a Wallet Session to view Balance and Ledger
:::

![image](/platform/docs/assets/wallet-ux-guide/6-Balances-and-Activity.jpg)

### 7. Authorizing another device via a QR code (Optional)

The OST Wallet SDK supports multiple devices accessing the same Wallet using the same PIN. Take advantage of the modular device management options by encouraging users to add devices. A QR code is a quick and easy way to set up a new device from an existing Wallet.  Enable users to scan the QR code to authorize the new device. Once the existing authorized device approves the request, the new device is also authorized and can use the same user PIN. Note: The user will have to set up biometrics again on the new device.

![image](/platform/docs/assets/wallet-ux-guide/7-Multi-Device.jpg)

### 8. Using mnemonic phrases to authorize a new device or recover a lost wallet (Optional) 

One of the innovations of the OST Wallet SDK is that you do not need to require your users to write down 12 words to add a new device or recover a wallet. However, if you want to add an additional layer of security, for the crypto-savvier user you can enable authorizing a new device using a mnemonic phrase.

To do so, an authorized device shows the mnemonic phrase (after verifying the PIN or biometrics, of course!)

**This is an optional feature.**

![image](/platform/docs/assets/wallet-ux-guide/8-Backup-Mnemonic.jpg)

The user enters their mnemonic phrase on a new device to authorize that device.

![image](/platform/docs/assets/wallet-ux-guide/9-Mnemonic-Entry.jpg)

### 9.  Recovery With PIN (Required) or mnemonic phrase (Optional)

Oh no, a user lost the phone they had your application on. Thankfully, recovering access to funds is made painless with OST’s Wallet SDK.   

![image](/platform/docs/assets/wallet-ux-guide/9-Recover-Wallet.jpg)

:::tip Recovery Process
Notify users via Email to inform about the initiation and completion of the recovery process
:::

![image](/platform/docs/assets/wallet-ux-guide/9.1-recovery-emails-2.jpg)

![image](/platform/docs/assets/wallet-ux-guide/9.2-wallet-abort.jpg)


### 10. Progress Indicators
Progress indicators help users understand the status and follow of an activity. Users usually notice when an activity takes more than 1-2 seconds.  (Usability studies - https://www.nngroup.com/articles/progress-indicators/). We’ll look at Fast and Long action guidelines.

**Fast Actions - In-app actions, transactions, etc (2-5 seconds or less)** 

If the operation completes under 5 seconds, use a looping animation to indicate the progress. The animated loop offers enough feedback that the action has been initiated, but it doesn’t give any information on user wait times. A progress bar for a fast action would be confusing. Do not use stationary progress indicators as they may confuse the users and cause them to worry that the process has stalled

![image](/platform/docs/assets/wallet-ux-guide/10.1-progress-tx.jpg)

**Long Actions - Creating & Recovering Wallet, Authorizing Sessions (10-30 seconds or more)**

If the operation a very lengthy where the users are more interested in the completion of the action than progress,  use notifications or snack bars instead of blocking the UI with progress indicators. Allow users to continue with other tasks instead of actively monitoring the progress without any disruption. Let’s take a look at a couple of these long operations including PIN verification for first session authorization and Wallet recovery initiation. 

![image](/platform/docs/assets/wallet-ux-guide/10.2-progress-tx-2.jpg)

* **Progress Indicator UX Studies** - https://www.nngroup.com/articles/progress-indicators/

* **Material Design** - https://material.io/design/components/progress-indicators.html#usage

* **iOS** - https://developer.apple.com/design/human-interface-guidelines/ios/controls/progress-indicators/ 

### 11. Transaction Error States

Good error messages allow users to be informed about the error that occurred and allow them to perform an action or change behavior as a result of the error i.e If a transaction fails, explain to users on why it failed and allow them to retry it (or) if a user doesn’t have enough token balance to complete the transaction ask the user to get more tokens.

![image](/platform/docs/assets/wallet-ux-guide/11-Failed_TX.jpg)

To learn more about how the OST Wallet SDK Recovery from PIN and Smart Contract is made possible in a safe and secure manner, please review the OST Wallet SDK Recovery documentation.

<hr>

## Watch a Video on the OST Wallet UX Guidelines
<div align="center">
    <iframe width="680" height="384"
        src="https://www.youtube.com/embed/-wgG8raRoTA">
    </iframe>
</div>