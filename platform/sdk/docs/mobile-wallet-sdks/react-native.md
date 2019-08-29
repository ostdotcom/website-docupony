---
id: react-native
title: React Native Wallet SDK Setup
sidebar_label: React Native
---
Please refer to our GitHub documentation for detailed information. The following page gives an overview of how to get started with the React Native Wallet SDK.

## GitHub Links
* [GitHub Readme](https://github.com/ostdotcom/ost-wallet-sdk-react-native/blob/develop/README.md)
    * [SDK Methods](https://github.com/ostdotcom/ost-wallet-sdk-react-native/blob/develop/README.md#sdk-methods)
    * [SDK Workflow Callbacks](https://github.com/ostdotcom/ost-wallet-sdk-react-native/blob/develop/README.md#sdk-workflow-callbacks)
* [Additional GitHub documentation](https://github.com/ostdotcom/ost-wallet-sdk-react-native/tree/develop/documentation)
    * [OST Wallet SDK Getter Methods](https://github.com/ostdotcom/ost-wallet-sdk-react-native/blob/develop/documentation/OstWalletSdkGetMethods.md)
    * [OST JSON API](https://github.com/ostdotcom/ost-wallet-sdk-react-native/blob/develop/documentation/OstJsonApi.md)
    * [OST Wallet UI (User Interface Components)](https://github.com/ostdotcom/ost-wallet-sdk-react-native/blob/develop/documentation/OstWalletUI.md)
    * [Android](https://github.com/ostdotcom/ost-wallet-sdk-react-native/blob/develop/documentation/android_setup.md) and [iOS](https://github.com/ostdotcom/ost-wallet-sdk-react-native/blob/develop/documentation/ios_setup.md) set-up steps

## Introduction
OST React Native Wallet SDK is the official Wallet SDK for the React Native platform. OST React Native Wallet SDK is a mobile application development SDK that enables developers to integrate the functionality of a non-custodial crypto-wallet into consumer applications.

**OST React Native Wallet SDK...**
* Safely generates and stores keys on the user's mobile device
* Signs ethereum transactions and data as defined by contracts using EIP-1077
* Enables users to recover access to their tokens in case the user loses their authorized device


## Installing React Native SDK

1. Install React Native and create a react-native project

Follow the [official React Native getting started guide](https://facebook.github.io/react-native/docs/0.59/getting-started) to install React Native and create a react-native project

2. Install the OST React Native SDK in your project
Run following command in your react-native project root

```bash
 npm install @ostdotcom/ost-wallet-sdk-react-native
```

3. Linking the OST React native SDk with your project

```bash
 react-native link @ostdotcom/ost-wallet-sdk-react-native
```

## Set-up Steps for Android and iOS
* [Android Set-up](https://github.com/ostdotcom/ost-wallet-sdk-react-native/blob/develop/documentation/android_setup.md)
* [iOS Set-up](https://github.com/ostdotcom/ost-wallet-sdk-react-native/blob/develop/documentation/ios_setup.md)