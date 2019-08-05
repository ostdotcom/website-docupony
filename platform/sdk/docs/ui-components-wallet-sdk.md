---
id: ui-components-wallet-sdk
title: User Interface Components in the OST Wallet SDKs
sidebar_label: User Interface Components
---

Beginning version 2.3.0 (beta) of our Mobile Wallet SDKs, we started to add user-interface components to the SDKs. The intent is to add components for each workflow to make easier for app developers to integrate the Wallet SDKs into their apps. The UI components are available for each SDK [Android](/platform/docs/sdk/mobile-wallet-sdks/android/), [iOS](/platform/docs/sdk/mobile-wallet-sdks/iOS), and [React Native](/platform/docs/sdk/mobile-wallet-sdks/react-native). 

Theming will also be added so that developers can configure the components as needed.

:::note Basic Configuration
In the inital beta version, you can configure the app logo image and app name. Component level configurations will be added soon! These are described in the [Theming](/platform/docs/sdk/ui-components-wallet-sdk/#theming) section below.
:::

## UI Components - Current Status

| Workflow | UI Components | SDK Version | Theming | 
| --- | --- | :---: | :---: |
| activateUser | <ul><li>Create PIN</li><li>Confirm PIN</li><li>PIN Match Failed</li><li>Activating User Loader</li></ul> | Available v2.3.0 | Coming Soon! |
| initiateDeviceRecovery | <ul><li>Device List</li><li>Start Recovery Button</li><li>Enter PIN</li><li>Recovering Wallet Loader</li><li>Initiate Recovery Success Message</li></ul> | Available v2.3.0 | Coming Soon! | 
| abortDeviceRecovery | <ul><li>Abort Recovery (Enter PIN)</li><li>Abort Recovery Confirmation (Stop/Cancel)</li></ul> | Available v2.3.0 | Coming Soon! | 
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
![create-pin](/platform/docs/assets/ui-thru-sdk/activate-user/create-pin.png)
![confirm-pin](/platform/docs/assets/ui-thru-sdk/activate-user/confirm-pin.png)
![activating-user-loader](/platform/docs/assets/ui-thru-sdk/activate-user/activating-user-loader.png)
![pin-match-failed](/platform/docs/assets/ui-thru-sdk/activate-user/pin-match-failed.png)

### initiateDeviceRecovery
![recovery-enter-pin](/platform/docs/assets/ui-thru-sdk/device-recovery/recovery-enter-pin.png)
![recovery-loader](/platform/docs/assets/ui-thru-sdk/device-recovery/recovery-loader.png)
![recovery-confirmation-success](/platform/docs/assets/ui-thru-sdk/device-recovery/recovery-confirmation-success.png)

### abortDeviceRecovery 
![abort-recovery-enter-pin](/platform/docs/assets/ui-thru-sdk/device-recovery/abort-recovery-enter-pin.png)
![abort-recovery-device-list](/platform/docs/assets/ui-thru-sdk/device-recovery/abort-recovery-device-list.png)
![abort-recovery-confirmation](/platform/docs/assets/ui-thru-sdk/device-recovery/abort-recovery-confirmation.png)

## Theming
Please check back soon! More details will be published on 6th Aug 2019.

## Learn More
To learn more, check out the UI components section in each of the Wallet SDK GitHub Readme files. Scroll down to the sections titled OstWalletUI.
* [Android Wallet SDK](https://github.com/ostdotcom/ost-wallet-sdk-android/tree/release-2.3)
* [iOS Wallet SDK](https://github.com/ostdotcom/ost-wallet-sdk-ios/tree/release-2.3)
* [React-Native Wallet SDK](https://github.com/ostdotcom/ost-wallet-sdk-react-native/tree/release-2.3)