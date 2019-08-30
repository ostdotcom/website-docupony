---
id: ui-components-wallet-sdk
title: User Interface Components Available in Mobile Wallet SDKs
sidebar_label: User Interface Components (NEW)
---

Beginning version 2.3.0 (beta) of our Mobile Wallet SDKs, we started to add user-interface components to the SDKs. The intent is to add components for each workflow to make it easier for app developers to integrate the Wallet SDKs into their own apps. The UI components are available for each SDK: [Android](/platform/docs/sdk/mobile-wallet-sdks/android/), [iOS](/platform/docs/sdk/mobile-wallet-sdks/iOS), and [React Native](/platform/docs/sdk/mobile-wallet-sdks/react-native). 

Theming is supported so that developers can configure the components as needed.

:::note Basic Configuration
In the inital beta version, you can just configure the app logo image and link to terms and conditions. Component level configurations will be added soon! These are described in the [Theming](/platform/docs/sdk/ui-components-wallet-sdk/#theming) section below.
:::

## UI Components - Current Status

| Workflow | UI Components | SDK Version | Theming | 
| --- | --- | :---: | :---: |
| activateUser | <ul><li>Enter PIN (Create PIN)</li><li>Enter PIN (Confirm PIN)</li><li>PIN Match Failed Msg</li><li>Activating User Loader</li></ul> | Available v2.3.0 | Aug-2019 |
| initiateDeviceRecovery | <ul><li>Device List</li><li>Start Recovery Button</li><li>Enter PIN (Initiate Recovery)</li><li>Recovering Wallet Loader</li><li>Initiate Recovery Success Message</li></ul> | Available v2.3.0 | Aug-2019 | 
| abortDeviceRecovery | <ul><li>Enter PIN (Abort Recovery)</li></ul> | Available v2.3.0 | Aug-2019 | 
| addSession | <ul><li>Enter PIN (Add Session)</li><li>Authorizing Session Loader</li><li>Biometric Face</li><li>Biometric Thumb</li><li>Enter PIN (if biometric fails)</li><ul> | In Development | Aug-2019 |  
| resetPin | <ul><li>Enter Current PIN</li><li>Enter New PIN</li><li>Confirm New PIN</li><li>PIN Match Failed Msg</li></ul> | In Development | Aug-2019 |
| getDeviceMnemonics | <ul><li>Authenticate with biometrics (Thumb/Face)</li><li>View 12-word Mnemonic</li></ul> | In Development | Aug-2019 | 
| authorizeCurrentDeviceWithMnemonics  | <ul><li>Enter 12-word Mnemonic</li><li>Authorize Button</li></ul> | In Development | Aug-2019 |
| revokeDevice | <ul><li>Device List</li><li>No devices found </li><li>Revoke Device Button</li></ul> | In Development | Aug-2019 |
| setBiometricPreference |  |  In Development | Aug-2019 |
| performQRAction | | |  |
| logoutAllSessions | | | |
| executeTransaction | | | |gulp generate-all-docs-local-server
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
<img alt-text="abort-recovery-enter-pin" src="/platform/docs/assets/ui-thru-sdk/device-recovery/abort-recovery-enter-pin.png" width="50%">
</div>

### resetPIN
<div style="no-wrap">
<img alt-text="reset-pin-1" src="/platform/docs/assets/ui-thru-sdk/reset-pin/reset-pin-1.png" width="50%"><img alt-text="reset-pin-2" src="/platform/docs/assets/ui-thru-sdk/reset-pin/reset-pin-2.png" width="50%"><img alt-text="reset-pin-3" src="/platform/docs/assets/ui-thru-sdk/reset-pin/reset-pin-3.png" width="50%">
</div>

### addSession
<div style="no-wrap">
<img alt-text="authorize-session" src="/platform/docs/assets/ui-thru-sdk/add-session/authorize-session.png" width="50%"><img alt-text="auth-loader" src="/platform/docs/assets/ui-thru-sdk/add-session/auth-loader.png" width="50%"><img alt-text="biometric-face" src="/platform/docs/assets/ui-thru-sdk/add-session/biometric-face.png" width="50%"><img alt-text="biometric-face-failed" src="/platform/docs/assets/ui-thru-sdk/add-session/biometric-face-failed.png" width="50%"><img alt-text="biometric-thumb" src="/platform/docs/assets/ui-thru-sdk/add-session/biometric-thumb.png" width="50%"><img alt-text="biometric-face-failed" src="/platform/docs/assets/ui-thru-sdk/add-session/biometric-face-failed.png" width="50%">
</div>

### getDeviceMnemonics
<div style="no-wrap">
<img alt-text="mnemonic-phrase-1" src="/platform/docs/assets/ui-thru-sdk/mnemonic/mnemonic-phrase-1.png" width="50%"><img alt-text="mnemonic-phrase-2" src="/platform/docs/assets/ui-thru-sdk/mnemonic/mnemonic-phrase-2.png" width="50%">
</div>

## Theming
The following is an overview of the components that will be configurable.

<img alt-text="theming" src="/platform/docs/assets/ui-thru-sdk/theming.jpg" width="100%">


## Learn More
To learn more, check out the UI components section in each of the Wallet SDK GitHub Readme files. Scroll down to the sections titled OstWalletUI.
* [Android Wallet SDK](https://github.com/ostdotcom/ost-wallet-sdk-android/tree/release-2.3)
* [iOS Wallet SDK](https://github.com/ostdotcom/ost-wallet-sdk-ios/tree/release-2.3)
* [React-Native Wallet SDK](https://github.com/ostdotcom/ost-wallet-sdk-react-native/tree/release-2.3)