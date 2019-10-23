---
id: ui-components-wallet-sdk
title: User Interface Components Available in Mobile Wallet SDKs
sidebar_label: User Interface Components
---

In version 2.3.1 (relased 28-Aug-2019) of our Mobile Wallet SDKs, we introduced user-interface (UI) components or views to expedite the development process and make it easier for developers to integrate with OST Platform.

This pages introduces the core features and points to detailed documentation on GitHub. 

## Watch a detailed video on how to initialize the Wallet SDK and make use of the User Interface Components

**Topics covered**
1. How initialise the Wallet SDK
2. How to set-up a user device
3. Getter methods and how to call them
4. How to activate a user
5. How to configure the UI components

<div align="center">
    <iframe width="680" height="384"
        src="https://www.youtube.com/embed/CCykqAsatUs">
    </iframe>
</div>
<br>

## Workflows w/ UI Components (Views)
There are 12 supported workflows. Each workflow has one or more UI views. Views are re-used and both the content (text) and theme (design) are configurable for each workflow.

| Supported Workflows |Views |
| --- | --- |
| 1. Activate User | Create PIN, Confirm PIN |
| 2. Add Session | Enter PIN |
| 3. Get Mnemonic Phrase | Enter PIN, Show Mnemonics |
| 4. Reset a User's PIN | Enter PIN, Set New PIN, Confirm New PIN |
| 5. Initiate Recovery | Device List, Action Button, Enter PIN |
| 6. Abort Device Recovery | Device List, Action Button, Enter PIN |
| 7. Revoke Device | Device List, Action Button, Enter PIN |
| 8. Update Biometric Preference | Enter PIN |
| 9. Authorize Current Device With Mnemonics | Enter Mnemonics, Action Button, Enter PIN |
| 10. Get Current Device QR-Code | Show QR |
| 11. Scan QR-Code to Authorize Device | Scan QR, Accept Button, Reject Button, Enter PIN|
| 12. Scan QR-Code to Execute Transaction | Scan QR, Accept Button, Reject Button, Enter PIN |

### Loaders
In every workflow we support two loaders with text configuration:
* `initial_loader`: Loader shown before workflow request construct
* `loader`: Loader shown after workflow request construct

## List of Views

| View Configuration Keys | Description |
| --- | --- |
| create_pin | User sets PIN for first time |
| confirm_pin | User confirms PIN again | 
| get_pin | User provides PIN for authentication |
| set_new_pin | User sets new PIN |
| confirm_new_pin | User confirms new PIN again |
| show_mnemnonics | Shows 12 word mnemonic phrase of device |
| provide_mnemonics | Get 12 word mnemonic phrase from user | 
| show_qr | Show QR code of device | 
| scan_qr | Scan QR code of another (registered) device or scan QR code of a transaction | 
| verify_device | Dispays device data to be verified / authorized |
| verify_transaction | Displays transaction data to be verified / authorized | |
| device_list | 	Shows list of authorized devices for user to choose from | 

## GitHub Documentation
Detailed documentation is being maintained on GitHub
* [Android](https://github.com/ostdotcom/ost-wallet-sdk-android/blob/develop/documentation/OstWalletUI.md)
* [iOS](https://github.com/ostdotcom/ost-wallet-sdk-ios/blob/develop/documentation/OstWalletUI.md)
* [React Native](https://github.com/ostdotcom/ost-wallet-sdk-react-native/blob/develop/documentation/OstWalletUI.md)

App developers can configure the content (text) and theme (design) of each of the UI components available. To configure either, the SDK needs to be provided with JSON. The default configurations can be found below.

### Content Config
* [Android](https://github.com/ostdotcom/ost-wallet-sdk-android/blob/develop/documentation/ContentConfig.md)
* [iOS](https://github.com/ostdotcom/ost-wallet-sdk-ios/blob/develop/documentation/ContentConfig.md)
* [React Native](https://github.com/ostdotcom/ost-wallet-sdk-android/blob/develop/documentation/ContentConfig.md)

#### PIN View (e.g. Create PIN)
<img alt-text="device list" src="/platform/docs/assets/ui-thru-sdk/PinViewLabelTypes.png" width="90%">

#### Show Device List View
<img alt-text="device list" src="/platform/docs/assets/ui-thru-sdk/DeviceListLabelTypes.png" width="90%">

#### Show Mnemonics View
<img alt-text="device list" src="/platform/docs/assets/ui-thru-sdk/ViewMnemonicsLabelTypes.png" width="90%">

#### Enter Mnemonics View
<img alt-text="device list" src="/platform/docs/assets/ui-thru-sdk/ProvideMnemonics.png" width="90%">

#### Show QR Code To Authorize Device View
<img alt-text="device list" src="/platform/docs/assets/ui-thru-sdk/ShowQR.png" width="90%">

#### Scan QR Code View
<img alt-text="device list" src="/platform/docs/assets/ui-thru-sdk/ScanQR.png" width="90%">

#### Authorize New Device View
<img alt-text="device list" src="/platform/docs/assets/ui-thru-sdk/VerifyDevice.png" width="90%">

#### Confirm Transaction View
<img alt-text="device list" src="/platform/docs/assets/ui-thru-sdk/VerifyTX.png" width="90%">

### Theming: Theme Config
* [Android](https://github.com/ostdotcom/ost-wallet-sdk-android/blob/develop/documentation/ThemeConfig.md)
* [iOS](https://github.com/ostdotcom/ost-wallet-sdk-ios/blob/develop/documentation/ThemeConfig.md)
* [React Native](https://github.com/ostdotcom/ost-wallet-sdk-android/blob/develop/documentation/ThemeConfig.md)
 
#### Navigation Bar
<img alt-text="navigation bar" src="/platform/docs/assets/ui-thru-sdk/NavBar.png" width="80%">

#### Sample Screen (Create PIN)
<img alt-text="sample screen" src="/platform/docs/assets/ui-thru-sdk/PinView.png" width="80%">

#### Sample Card (Device)
<img alt-text="sample card" src="/platform/docs/assets/ui-thru-sdk/Card.png" width="70%">

::: note Custom Fonts
To support custom font in your application, add your font in /src/main/assets
:::

## UI Events and Listeners
Developers can subscribe to specific event of each UI workflow. Supported events are:
* requestAcknowledged
* flowComplete
* flowInterrupt

## To Learn More Or Ask Questions Join us on Slack

:::note Join our Public Slack space!
We would love to hear your feedback! Join our public slack space and let's chat. Click [here](https://join.slack.com/t/tryost/shared_invite/enQtNjk5MTI4NDY5MjIyLTFlZWYyODNhMjA0YmNmM2ZmMTJkZDM4MDU0NGJlNDc3ZWEwMjY5ZWNiNjNiZDcyOTIyZTljNGFmN2E2NzY2MDk).
:::