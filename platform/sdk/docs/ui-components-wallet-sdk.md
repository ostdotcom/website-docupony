---
id: ui-components-wallet-sdk
title: User Interface Components Available in Mobile Wallet SDKs
sidebar_label: User Interface Components (NEW)
---

Beginning version 2.3.0 (beta) of our Mobile Wallet SDKs, we started to add user-interface components to the SDKs. The intent is to add components for each workflow to make it easier for app developers to integrate the Wallet SDKs into their own apps. The UI components are available for each SDK: [Android](/platform/docs/sdk/mobile-wallet-sdks/android/), [iOS](/platform/docs/sdk/mobile-wallet-sdks/iOS), and [React Native](/platform/docs/sdk/mobile-wallet-sdks/react-native). 

Theming is supported so that developers can configure the components as needed.

:::note Basic Configuration
In the inital beta version, you can just configure the app logo image and app name. Component level configurations will be added soon! These are described in the [Theming](/platform/docs/sdk/ui-components-wallet-sdk/#theming) section below.
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
<div style="no-wrap">
<img alt-text="create-pin" src="/platform/docs/assets/ui-thru-sdk/activate-user/create-pin.png" width="50%"><img alt-text="confirm-pin" src="/platform/docs/assets/ui-thru-sdk/activate-user/confirm-pin.png" width="50%"><img alt-text="activating-user-loader" src="/platform/docs/assets/ui-thru-sdk/activate-user/activating-user-loader.png" width="50%"><img alt-text="pin-match-failed" src="/platform/docs/assets/ui-thru-sdk/activate-user/pin-match-failed.png" width="50%">
</div>

### initiateDeviceRecovery
<div style="no-wrap">
<img alt-text="recovery-enter-pin" src="/platform/docs/assets/ui-thru-sdk/device-recovery/recovery-enter-pin.png" width="50%"><img alt-text="recovery-loader" src="/platform/docs/assets/ui-thru-sdk/device-recovery/recovery-loader.png" width="50%"><img alt-text="recovery-confirmation-success" src="/platform/docs/assets/ui-thru-sdk/device-recovery/recovery-confirmation-success.png" width="50%">
</div>

### abortDeviceRecovery 
<div style="no-wrap">
<img alt-text="abort-recovery-enter-pin" src="/platform/docs/assets/ui-thru-sdk/device-recovery/abort-recovery-enter-pin.png" width="50%"><img alt-text="abort-recovery-device-list" src="/platform/docs/assets/ui-thru-sdk/device-recovery/abort-recovery-device-list.png" width="50%"><img alt-text="abort-recovery-confirmation" src="/platform/docs/assets/ui-thru-sdk/device-recovery/abort-recovery-confirmation.png" width="50%">
</div>

## Theming
Please check back soon! More details will be published on 6th Aug 2019.

## Learn More
To learn more, check out the UI components section in each of the Wallet SDK GitHub Readme files. Scroll down to the sections titled OstWalletUI.
* [Android Wallet SDK](https://github.com/ostdotcom/ost-wallet-sdk-android/tree/release-2.3)
* [iOS Wallet SDK](https://github.com/ostdotcom/ost-wallet-sdk-ios/tree/release-2.3)
* [React-Native Wallet SDK](https://github.com/ostdotcom/ost-wallet-sdk-react-native/tree/release-2.3)