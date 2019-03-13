---
id: workflows
title: iOS SDK workflows
sidebar_label: workflows
---


Workflows are the core functionality functions provided by wallet SDK to do wallet related tasks. Workflows can be called directly by importing the SDK but the controller or view calling the class should implement the  `OstWorkFlowCallbackDelegate` protocol.

## Calling the Workflows

```swift
import OstSdk

func application(_ application: UIApplication, 
didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    do {
        try OstSdk.initialize(apiEndPoint: <KIT_API_ENDPOINT>)
     } catch let ostError {
           
     }
     return true
}
```

## Wokrflow API

### 1. initialize

You must initialize the SDK before calling any other workflows. It initializes all the required instances and run db migrations. 

Recommended location to call **OstSdk.init()** is in [application](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622921-application) method of [UIApplicationDelegate](https://developer.apple.com/documentation/uikit/uiapplicationdelegate). 

```
OstSdk.initialize(apiEndPoint: String)
```

| Parameter | Description |
|---|---|
| **apiEndPoint** <br> **String**	| OST KIT API endpoints: <br> 1. Sandbox Environment: `https://api.ost.com/testnet/v2/` <br> 2. Production Environment: `https://api.ost.com/mainnet/v2/` |



#### Sample implementation

```
func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    do {
        try OstSdk.initialize(apiEndPoint: <KIT_API_ENDPOINT>)
     } catch let ostError {
           
     }
     return true
}
```

<br>
### 2. setupDevice
After init, setupDevice should be called everytime the app launches. It ensures that the current device is registered before communicating with OST KIT server. This will register the device if the current device is not registered. In case the device is already registered this function wouldn't do anything. 

**Recommended location to call setupDevice() is after successful login or signup.**

```
OstSdk.setupDevice(
    userId: String,
    tokenId: String,
    delegate: OstWorkFlowCallbackDelegate
    )
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier for the user of economy |
| **tokenId** <br> **String**	| Unique identifier for the token economy |
| **delegate** <br> **OstWorkFlowCallbackDelegate**	|An object that implements the callback function available in `OstWorkFlowCallbackDelegate` protocol. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallbackDelegate protocol reference](/kit/docs/sdk/references/wallet_sdk/iOS/latest/protocols/).<br> This object should implement `registerDevice` callback function. `registerDevice` will be called during the execution of this workflow.  |

<br>

### 3. activateUser
It `authorises` the registered device and activates the user. User activation deploys various contracts on blockchain. So after `user activation` user can perform wallet actions like doing transactions, etc. Session keys are also created during `activateUser` workflow.

```
OstSdk.activateUser(
    userId: String,
    pin: String,
    passphrasePrefix: String,
    spendingLimit: String,
    expireAfter: TimeInterval,
    delegate: OstWorkFlowCallbackDelegate
    )
```

| Parameter | Description |
|---|---|

| **userId** <br> **String**	| Unique iedntifier for token economy |
| **pin** <br> **String**	| User's PIN |
| **passphrasePrefix** <br> **String**	| A constant unique identifier for a your user. This will be one of the 3 inputs needed to create recovery key for the user. |
| **spendingLimit** <br> **String**	| Spending limit of session key in Wei.  |
| **expireAfter** <br> **TimeInterval**	| Expire time of session key in seconds. |
| **delegate** <br> **OstWorkFlowCallbackDelegate**	| An object that implements the callback function available in `OstWorkFlowCallbackDelegate` protocol. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallbackDelegate protocol reference](/kit/docs/sdk/references/wallet_sdk/iOS/latest/protocols/).  |



<br>
### 4. addSession
This workflow will create and authorize the session keys that are needed to do the transactions. This flow should be called in the absence of session keys. 

```
OstSdk.addSession(
    userId: String,
    spendingLimit: String,
    expireAfter: TimeInterval,
    delegate: OstWorkFlowCallbackDelegate
    )
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier for the user of economy |
| **expiresAfterInSecs** <br> **long**	| Expire time of session key in seconds.  |
| **spendingLimitInWei** <br> **String**	| Spending limit of session key in Wei.   |
| **delegate** <br> **OstWorkFlowCallbackDelegate**	| An object that implements the callback function available in `OstWorkFlowCallbackDelegate` protocol. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallbackDelegate protocol reference](/kit/docs/sdk/references/wallet_sdk/iOS/latest/protocols/). |





<br>
### 5. ostPerform
This workflow will perform operations after reading datat from a QRCode. This workflow can used to add a new device and to do the transactions on the websites.

```
OstSdk.perfrom(
    userId: String,
    payload: String,
    delegate: OstWorkFlowCallbackDelegate
    )
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier for the user of economy |
| **data** <br> **String**	| JSON object string scanned from QR code. |
| **delegate** <br> **OstWorkFlowCallbackDelegate**	| An object that implements the callback function available in `OstWorkFlowCallbackDelegate` protocol. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallbackDelegate protocol reference](/kit/docs/sdk/references/wallet_sdk/iOS/latest/protocols/). |



<br>
### 6. getPaperWallet
To get the 12 words of the current device keys.

```
OstSdk.getPaperWallet(
    userId: String,
    delegate: OstWorkFlowCallbackDelegate
    )
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier for the user of economy |
| **delegate** <br> **OstWorkFlowCallbackDelegate**	| An object that implements the callback function available in `OstWorkFlowCallbackDelegate` protocol. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallbackDelegate protocol reference](/kit/docs/sdk/references/wallet_sdk/iOS/latest/protocols/). |



<br>

### 7. executeTransaction
To workflow should be used to do transactions.

```
OstSdk.executeTransaction(
    userId: String,
    tokenId: String,
    transactionType: OstExecuteTransactionType,
    toAddresses: [String],
    amounts: [String],
    delegate: OstWorkFlowCallbackDelegate
    )
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier for the user of economy |
| **tokenId** <br> **String**	| Unique identifier for the token economy |
| **transactionType** <br> **OstExecuteTransactionType**	| OstExecuteTransactionType object containing rules details that needs to be executed during this transaction.|
| **toAddresses** <br> **[String]**	| Token holder addresses of amount receiver |
| **amounts** <br> **[String]**	| Amoun to be transfered in Wei.  |
| **delegate** <br> **OstWorkFlowCallbackDelegate**	| An object that implements the callback function available in `OstWorkFlowCallbackDelegate` protocol. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallbackDelegate protocol reference](/kit/docs/sdk/references/wallet_sdk/iOS/latest/protocols/). |




<br>
### 8. addDeviceMnemonics
This workflow should be used to add a new device using 12 words. 

```
OstSdk.addDeviceWithMnemonicsString(
    userId: String,
    mnemonics: String,
    delegate: OstWorkFlowCallbackDelegate
    )

```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier for the user of economy |
| **mnemonics** <br> **String**	| String object having 12 words |
| **delegate** <br> **OstWorkFlowCallbackDelegate**	| An object that implements the callback function available in `OstWorkFlowCallbackDelegate` protocol. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallbackDelegate protocol reference](/kit/docs/sdk/references/wallet_sdk/iOS/latest/protocols/).  |



<br>

### 9. getAddDeviceQRCode
This workflow will return the QRCode Bitmap that can be used to show on screen. This QRCode can then be scanned to add the new device.

```
OstSdk.getAddDeviceQRCode(
    userId: String
    ) throws -> CIImage?
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier for the user of economy |


**Returns**

| Type | Description |
|---|---|
| **CIImage**	| QRCode [CIImage](https://developer.apple.com/documentation/coreimage/ciimage) object. |






<br>    
### 10. resetPin
This workflow can be used to change the PIN. User will have to provide the current PIN in order to change the it.

```
OstSdk.resetPin(
    userId: String,
    passPhrasePrefix: String,
    oldPin: String,
    newPin: String,
    delegate: OstWorkFlowCallbackDelegate
    )
```


| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier for the user of economy |
| **passPhrasePrefix** <br> **String**	| A constant unique identifier for a your user. This will be one of the 3 inputs needed to create recovery key for the user.   |
| **oldPin** <br> **String**	| Current wallet PIN  |
| **newPin** <br> **String**	| New wallet PIN |
| **delegate** <br> **OstWorkFlowCallbackDelegate**	| An object that implements the callback function available in `OstWorkFlowCallbackDelegate` protocol. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallbackDelegate protocol reference](/kit/docs/sdk/references/wallet_sdk/iOS/latest/protocols/).  |
