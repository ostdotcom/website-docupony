---
id: iOS
title: iOS SDK Setup
sidebar_label: iOS
---
Please refer to our GitHub documentation for detailed information. The following page gives an overview of how to get started with the iOS Wallet SDK.

## GitHub Links
* [GitHub Readme](https://github.com/ostdotcom/ost-wallet-sdk-ios/blob/develop/README.md)
    * [SDK Types of Methods](https://github.com/ostdotcom/ost-wallet-sdk-ios/blob/develop/README.md#types-of-methods)
    * [SDK Workflows](https://github.com/ostdotcom/ost-wallet-sdk-ios/blob/develop/README.md#workflows)
    * [SDK Getters](https://github.com/ostdotcom/ost-wallet-sdk-ios/blob/develop/README.md#getters)
    * [SDK Workflow Delegate Protocol](https://github.com/ostdotcom/ost-wallet-sdk-ios/blob/develop/README.md#ostworkflowdelegate-protocol)
* [Additional GitHub documentation](https://github.com/ostdotcom/ost-wallet-sdk-ios/tree/develop/documentation)
    * [OST JSON API](https://github.com/ostdotcom/ost-wallet-sdk-ios/blob/develop/documentation/OstJsonApi.md)
    * [OST Wallet UI (User Interface Components)](https://github.com/ostdotcom/ost-wallet-sdk-ios/blob/develop/documentation/OstWalletUI.md)
        * [Content Config](https://github.com/ostdotcom/ost-wallet-sdk-ios/blob/develop/documentation/ContentConfig.md)
        * [Theming: Theme Config](https://github.com/ostdotcom/ost-wallet-sdk-ios/blob/develop/documentation/ThemeConfig.md)

## 1. Prerequisite 
Install and complete integration with one of our Server Side SDKs
* [PHP](/platform/docs/sdk/server-side-sdks/php/)
* [Ruby](/platform/docs/sdk/server-side-sdks/ruby/)
* [Node.js](/platform/docs/sdk/server-side-sdks/nodejs/)
* [Java](/platform/docs/sdk/server-side-sdks/java/)

## 2. Requirements

| Item | Supported Version | 
| --- | ---: |
| iOS | 9.0 and above. Recommended version: 10.3 |
| Swift | 4.2 |

3. iOS Wallet SDK [Methods](/platform/docs/sdk/mobile-wallet-sdks/iOS/latest/methods/), [Protocol](/platform/docs/sdk/mobile-wallet-sdks/iOS/latest/protocols/) and [Classes](/platform/docs/sdk/mobile-wallet-sdks/iOS/latest/classes/)


## 3. Install iOS Wallet SDK

### A). Installing iOS Wallet SDK using [Carthage](https://github.com/Carthage/Carthage)
#### i). Installing [Carthage](https://github.com/Carthage/Carthage)

Get [Carthage](https://github.com/Carthage/Carthage) by running the following command on terminal

>  brew install carthage

You can also choose [other methods](https://github.com/Carthage/Carthage/#installing-carthage) to install [Carthage](https://github.com/Carthage/Carthage)

#### ii). Downloading Wallet SDK using Carthage
Carthage looks at a file called `Cartfile` to determine which libraries to install. Create a file in the same directory as your Xcode project called `Cartfile` and enter the following to tell Carthage which dependencies we want:

Add following entry in your `Cartfile`
> github "ostdotcom/ost-wallet-sdk-ios"

Now to actually install everything run the following in your terminal:

> carthage update --platform iOS

A `Cartfile.resolved` file and a `Carthage` directory will appear in the same directory where your `.xcodeproj` or `.xcworkspace` is.

#### iii). Copying the `OstWalletSdk.framework` file in your Xcode project
Open your project in Xcode, click on the project file in the left section of the screen and scroll down to the `Linked Frameworks and Libraries` section in Xcode.

`Carthage` folder will have the `.framework` files that we will add in Xcode project.

Now open the `Carthage/Build/iOS` folder in Finder:

Run this command
> open Carthage/Build/iOS

Open application target, under General tab, drag the built `OstWalletSdk.framework` binary from `Carthage/Build/iOS` folder into Linked Frameworks and Libraries section.

![copy-framework-file](/platform/docs/sdk/assets/copy-framework-file.png)

#### iv). Adding the `OstWalletSdk` dependencies in your Xcode project
We need to add the `.framework` files of dependencies present inside `Carthage/Build/iOS`.

Open `application targets` in Xcode. Under `Build Phases` click `+` icon and choose `New Run Script Phase`. Add the following command.

> /usr/local/bin/carthage copy-frameworks


Click the `+` under `Input Files` and add the following entry framework:

```
$(SRCROOT)/Carthage/Build/iOS/Alamofire.framework
$(SRCROOT)/Carthage/Build/iOS/BigInt.framework
$(SRCROOT)/Carthage/Build/iOS/CryptoEthereumSwift.framework
$(SRCROOT)/Carthage/Build/iOS/CryptoSwift.framework
$(SRCROOT)/Carthage/Build/iOS/EthereumKit.framework
$(SRCROOT)/Carthage/Build/iOS/FMDB.framework
$(SRCROOT)/Carthage/Build/iOS/SipHash.framework
$(SRCROOT)/Carthage/Build/iOS/TrustKit.framework
$(SRCROOT)/Carthage/Build/iOS/OstWalletSdk.framework
```

<br>
![copy-framework-file](/platform/docs/sdk/assets/add-dependency-framework-files.png)

#### v). Adding SDK configuration file

Create `OstWalletSdk.plist` file. This file has configuration attributes used by OstWalletSdk. You should copy paste the configuration values from below snippet.

Copy paste this configuration file

```
<?xml version="1.0" encoding="UTF-8"?>
 <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
 <plist version="1.0">
 <dict>
    <key>BlockGenerationTime</key>
    <integer>3</integer>
    <key>PricePointTokenSymbol</key>
    <string>OST</string>
    <key>PricePointCurrencySymbol</key>
    <string>USD</string>
    <key>RequestTimeoutDuration</key>
    <integer>30</integer>
    <key>PinMaxRetryCount</key>
    <integer>3</integer>
    <key>SessionBufferTime</key>
    <integer>3600</integer>
    <key>UseSeedPassword</key>
	<false/>
 </dict>
 </plist>
```

| Attribute | Description | 
| --- | --- | 
| BlockGenerationTime | The time in seconds it takes to mine a block on auxiliary chain. |
| PricePointTokenSymbol | This is the symbol of base currency. So its value will be OST. |
| PricePointCurrencySymbol | It is the symbol of quote currency used in price conversion. |
| RequestTimeoutDuration | Request timeout in seconds for https calls made by ostWalletSdk. |
| PinMaxRetryCount | Maximum retry count to get the wallet Pin from user.|
| SessionBufferTime | Buffer expiration time for session keys in seconds. Default value is 3600 seconds.|
| UseSeedPassword | The seed password is salt to PBKDF2 used to generate seed from the mnemonic. When UseSeedPassword set to true, different deterministic salts are used for different keys. |


:::warning
These configurations are MANDATORY for successful operation. Failing to set them will significantly impact usage.
:::

#### vi). Add `NSFaceIDUsageDescription` description in `info.plist`

The iOS Wallet SDK can use FaceID in lieu of fingerprint if the hardware supports it. To support faceID, please include  [NSFaceIDUsageDescription](https://developer.apple.com/documentation/bundleresources/information_property_list/nsfaceidusagedescription) key in your application's `info.plist` file and describe its usage.

**Note: [NSFaceIDUsageDescription](https://developer.apple.com/documentation/bundleresources/information_property_list/nsfaceidusagedescription) key is supported in iOS 11 and later.**

## 4. Initialize the Wallet SDK

SDK initialization should happen before calling any other `workflow`. To initialize the SDK, we need to call `init` workflow of Wallet SDK. It initializes all the required instances and run db migrations.

Recommended location to call **OstWalletSdk.initialize()** is in [application](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622921-application) method of [UIApplicationDelegate](https://developer.apple.com/documentation/uikit/uiapplicationdelegate).

```swift
func application(_ application: UIApplication,
                didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    do {
        try OstWalletSdk.init(apiEndPoint: <OST_PLATFORM_API_ENDPOINT>)
     } catch let ostError {
           // Handle error here
     }
     return true
}
```

**OST_PLATFORM_API_ENDPOINT**:
This will be the base API URL we need to provide to SDK while initializing.

**Sandbox environment endpoint**: "api.ost.com/testnet/v2"

**Production endpoint**: "api.ost.com/mainnet/v2"

## 5. Setting up communication between app and Wallet SDK

iOS Wallet SDK provides `workflows` that can be called by any controller class to perform wallet related actions. Communication between app and Wallet SDK happens through callback functions. We need to pass the callback functions in `workflows` provided by SDK. The group of callback functions for communication between app and Wallet SDK is provided in `OstWorkflowDelegate` protocol.

![walletSDKCommunication](/platform/docs/sdk/assets/communication-ios-sdk.png)

### a). Implementing the `OstWorkflowDelegate` protocol

There are different ways to implement `OstWorkflowDelegate` and pass them while calling workflows. We will create a dedicated class with name `OstWalletSdkInteract`. This class will implement the `OstWorkflowDelegate` protocol. We will use this class to create object that can be passed in SDK workflows as callback. 

Sample Implementation of [OstWalletSdkInteract class](https://github.com/ostdotcom/ios-demo-app/blob/develop/TestDemoApp/OstSdkInteract/OstSdkInteract.swift) is available as a part of [OST Wallet app](https://github.com/ostdotcom/ios-demo-app/tree/develop).


```swift
import Foundation
import OstWalletSdk
import MaterialComponents

class OstWalletSdkInteract: BaseModel, OstWorkFlowCallbackProtocol {

    extension OstWalletSdkInteract {

        func flowComplete(workflowContext: OstWorkflowContext, ostContextEntity: OstContextEntity) {

            var eventData:[String: Any] = [:];
            eventData["eventType"] = WorkflowEventType.flowComplete;
            eventData["workflowContext"] = workflowContext;
            eventData["ostContextEntity"] = ostContextEntity;
            self.fireEvent(eventData: eventData);
        }

        func flowInterrupted(workflowContext: OstWorkflowContext, error: OstError) {
        
            var eventData:[String: Any] = [:];
            eventData["eventType"] = WorkflowEventType.flowInterrupt;
            eventData["workflow"] = workflowContext.workflowType;
            eventData["workflowContext"] = workflowContext;
            eventData["ostError"] = error;
            self.fireEvent(eventData: eventData);
        }

        // more functions here
        .....

        .....

    }

```

### b). Using `OstWalletSdkInteract` class

`OstWalletSdkInteract` can be used to create object that can be passed as callback in workflows.

Example

In the example below, we are calling `OstWalletSdk.addSession` workflow and passing object of `OstWalletSdkInteract` class

```

 var sdkInteract: OstWalletSdkInteract = {
    let interact = OstWalletSdkInteract();
    return interact;
  }()

   OstWalletSdk.addSession(
                    userId: currentUser.ostUserId!,
                    spendingLimit: self.spendingLimitTestField.text!,
                    expireAfter: Double(expireAfter),
                    delegate: self.sdkInteract)
```

[Sample code](https://github.com/ostdotcom/ios-demo-app/blob/develop/TestDemoApp/Views/Wallet/AddSessionView.swift) showing above example in detail is available on github.


## OST Wallet App
To provide developers with sample integration of Wallet SDK, an [OST Wallet iOS app ](https://github.com/ostdotcom/ios-demo-app/tree/develop) is available on GitHub.

## Next Steps
1. [Create Wallet Guide](/platform/docs/1-create)
2. [Execute Transaction Guide](/platform/docs/guides/execute-transactions/)
