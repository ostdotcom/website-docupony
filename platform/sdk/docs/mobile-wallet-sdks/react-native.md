---
id: react-native
title: React Native Wallet SDK Setup
sidebar_label: React Native
---
Please refer to our GitHub documentation for detailed information. The following page gives an overview of how to get started with the React Native Wallet SDK.

## GitHub Readme
* [React Native SDK Usage](https://github.com/ostdotcom/ost-wallet-sdk-react-native#sdk-usage)
* [React Native SDK Methods](https://github.com/ostdotcom/ost-wallet-sdk-react-native#sdk-methods)
* [React Native SDK Callbacks](https://github.com/ostdotcom/ost-wallet-sdk-react-native#sdk-workflow-callbacks)
* [OST JSON APIs](https://github.com/ostdotcom/ost-wallet-sdk-react-native#ost-json-apis)

## Introduction
OST React Native Wallet SDK is the official Wallet SDK for the React Native platform. OST React Native Wallet SDK is a mobile application development SDK that enables developers to integrate the functionality of a non-custodial crypto-wallet into consumer applications.

**The OST React Native Wallet SDK:**
* Safely generates and stores keys on the user's mobile device
* Signs ethereum transactions and data as defined by contracts using EIP-1077
* Enables users to recover access to their Tokens in case the user loses their authorized device


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

4. [Android setup for OST React Native SDK](https://github.com/ostdotcom/ost-wallet-sdk-react-native/blob/master/android_setup.md)

5. [iOS setup for OST React Native SDK](https://github.com/ostdotcom/ost-wallet-sdk-react-native/blob/master/ios_setup.md)
