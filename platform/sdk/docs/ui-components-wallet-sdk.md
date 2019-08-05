---
id: ui-components-wallet-sdk
title: User Interface Components in the OST Wallet SDKs
sidebar_label: User Interface Components Available
---

Beginning in version 2.3.0 of our Mobile Wallet SDKs, we have started to add user-interface components to the SDKs. The intent is to add components for each workflow to make easier for app developers to integrate the Wallet SDKs into their apps. The UI components will be available in each SDK [Android](/platform/docs/sdk/mobile-wallet-sdks/android/), [iOS](/platform/docs/sdk/mobile-wallet-sdks/iOS), and [React Native](/platform/docs/sdk/mobile-wallet-sdks/react-native). 

Theming will also be added so that developers can configure the components as needed.

:::note Basic Configuration
In the inital beta version, you can configure the app logo image and app name. Component level configurations will be added soon! These are described in the [Theming](/platform/docs/sdk/ui-components-wallet-sdk/#theming) section below.
:::

## UI Components - Current Status

| Workflow | UI Components | SDK Version | Theming | 
| --- | --- | :---: | :---: |
| activateUser | <ul><li>Create PIN</li><li>Confirm PIN</li><li>PIN Match Failed</li><li>Activating User Loader</li></ul> | Available v2.3.0 | Coming Soon! |
| initiateDeviceRecovery | <ul><li>Device List</li><li>Start Recovery Button</li><li>Enter PIN</li><li>Recovering Wallet Loader</li><li>Success Alert</li></ul> | Available v2.3.0 | Coming Soon! | 
| abortDeviceRecovery | <ul><li>Abort Recovery (Enter PIN)</li><li>Abort Recovery Confirmation</li></ul> | Available v2.3.0 | Coming Soon! | 
| addSession | <ul><li>Add Session (Enter PIN)</li><ul>| In Development | |  
| resetPin | <ul><li>Enter Current PIN</li><li>Enter New PIN</li><li>Confirm PIN</li><li>PIN Match Failed</li></ul> | In Development | |
| performQRAction | | |  |
| getDeviceMnemonics | | | | 
| executeTransaction | | | |
| authorizeCurrentDeviceWithMnemonics  | | | |
| logoutAllSessions | | | |
| setupDevice | Not Applicable | N/A | N/A |

:::note SDK Release version
The latest release of the Mobile Wallet SDKs is 2.3.0
:::

## UI Components Screenshots

### activateUser
### initiateDeviceRecovery
### abortDeviceRecovery 
### addSession
### resetPin

## Theming
More details coming soon!

## Learn More
To learn more, check out UI components section in each of the Wallet SDK GitHub Readme's. Scroll down to the sections titled 'OstWalletUI.'
* [Android Wallet SDK](https://github.com/ostdotcom/ost-wallet-sdk-android/tree/release-2.3)
* [iOS Wallet SDK](https://github.com/ostdotcom/ost-wallet-sdk-ios/tree/release-2.3)
* [React-Native Wallet SDK](https://github.com/ostdotcom/ost-wallet-sdk-react-native/tree/release-2.3)