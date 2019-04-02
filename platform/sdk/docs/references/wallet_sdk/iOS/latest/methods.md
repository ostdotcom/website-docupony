---
id: methods
title: iOS SDK Methods
sidebar_label: Methods
---


## Types of Methods

1. `Workflows`: Workflows are the core functions provided by wallet SDK to do wallet related actions. Workflows can be called directly by importing the SDK.

	* Application must confirm to `OstWorkflowDelegate` protocol. The `OstWorkflowDelegate` protocol defines methods that allow application to interact with `OstWalletSdk`.


2. `Getters`: These functions are synchronous and will return the value when requested.



## Wokrflows

### 1. initialize

You must initialize the SDK before start using it.

Recommended location to call **OstWalletSdk.initialize()** is in [application](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622921-application) method of [UIApplicationDelegate](https://developer.apple.com/documentation/uikit/uiapplicationdelegate). 

```
OstWalletSdk.initialize(apiEndPoint: String)
```

| Parameter | Description |
|---|---|
| **apiEndPoint** <br> **String**	| OST PLATFORM API ENDPOINT: <br> 1. Sandbox Environment: `https://api.ost.com/testnet/v2/` <br> 2. Production Environment: `https://api.ost.com/mainnet/v2/` |


#### Sample code to initialize SDK

```swift
import OstWalletSdk

func application(_ application: UIApplication, 
didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    do {
        try OstWalletSdk.initialize(apiEndPoint: <platform_API_ENDPOINT>)
     } catch let ostError {
          // Handle the error 
     }
     return true
}
```



<br>
### 2. setupDevice
This workflow needs `userId` and `tokenId` so `setupDevice` should be called after your app login or signup is successful.
Using the mapping between userId in OST Platform and your app user, you have access to `userId` and `tokenId`.

**If the user is logged in, then `setupDevice` should be called every time the app launches, this ensures that the current device is registered before communicating with OST Platform server.**


```
OstWalletSdk.setupDevice(
    userId: String,
    tokenId: String,
    delegate: OstWorkflowDelegate
)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform  |
| **tokenId** <br> **String**	| Unique identifier of the token economy |
| **delegate** <br> **OstWorkflowDelegate**	|An object that implements the callback function available in `OstWorkflowDelegate` protocol. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkflowDelegate protocol reference](/platform/docs/sdk/references/wallet_sdk/iOS/latest/protocols/).<br> This object should implement `registerDevice` callback function. `registerDevice` will be called during the execution of this workflow.  |

<br>

### 3. activateUser
It `authorizes` the registered device and activates the user. User activation deploys  **TokenHolder**, Device manager  contracts on blockchain. Session keys are also created and authorized during `activateUser` workflow. So after `user activation`, users can perform wallet actions like executing transactions and reset pin. 

```
OstWalletSdk.activateUser(
    userId: String,
    userPin: String,
    passphrasePrefix: String,
    spendingLimit: String,
    expireAfterInSec: TimeInterval,
    delegate: OstWorkflowDelegate
)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform  |
| **userPin** <br> **String**	| User's PIN created during wallet setup.|
| **passphrasePrefix** <br> **String**	| A constant unique identifier for a your user. |
| **spendingLimit** <br> **String**	| Spending limit of session key in [atto BT](/platform/docs/guides/execute_transaction/#converting-brand-token-to-atto-brand-token).  |
| **expireAfterInSec** <br> **TimeInterval**	| Expire time of session key in seconds. |
| **delegate** <br> **OstWorkflowDelegate**	| An object that implements the callback function available in `OstWorkflowDelegate` protocol. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkflowDelegate protocol reference](/platform/docs/sdk/references/wallet_sdk/iOS/latest/protocols/).  |



<br>
### 4. addSession
This workflow will create and authorize the session key that is needed to do the transactions. This flow should be called if the session key is expired or not present. 

```
OstWalletSdk.addSession(
    userId: String,
    spendingLimit: String,
    expiresAfterInSecs: TimeInterval,
    delegate: OstWorkflowDelegate
)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	|  Unique identifier of the user stored in OST Platform|
| **spendingLimit** <br> **String**	| Spending limit of session key in [atto BT](/platform/docs/guides/execute_transaction/#converting-brand-token-to-atto-brand-token).   |
| **expiresAfterInSecs** <br> **long**	| Expire time of session key in seconds.  |
| **delegate** <br> **OstWorkflowDelegate**	| An object that implements the callback function available in `OstWorkflowDelegate` protocol. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkflowDelegate protocol reference](/platform/docs/sdk/references/wallet_sdk/iOS/latest/protocols/). |





<br>
### 5. perfromQRAction
This workflow will perform operations after reading data from a QRCode. This workflow can used to add a new device and to do the transactions.

```
OstWalletSdk.perfromQRAction(
    userId: String,
    payload: String,
    delegate: OstWorkflowDelegate
)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform|
| **data** <br> **String**	| JSON object string scanned from QR code. <br> [Sample QRCode JSON](/platform/docs/sdk/wallet_flows/execute_transaction/#sample-qrcode-data) |
| **delegate** <br> **OstWorkflowDelegate**	| An object that implements the callback function available in `OstWorkflowDelegate` protocol. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkflowDelegate protocol reference](/platform/docs/sdk/references/wallet_sdk/iOS/latest/protocols/). |



<br>
### 6. getDeviceMnemonics
To get the 12 words recovery phrase of the current device key. Users will use it to prove that it is their wallet.  

```
OstWalletSdk.getDeviceMnemonics(
    userId: String,
    delegate: OstWorkflowDelegate
)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform |
| **delegate** <br> **OstWorkflowDelegate**	| An object that implements the callback function available in `OstWorkflowDelegate` protocol. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkflowDelegate protocol reference](/platform/docs/sdk/references/wallet_sdk/iOS/latest/protocols/). |



<br>

### 7. executeTransaction
Workflow should be used to do the `user-to-company` and `user-to-user` transactions.

```
OstWalletSdk.executeTransaction(
    userId: String,
    tokenHolderAddresses: [String],
    amounts: [String],
    transactionType: OstExecuteTransactionType,
    meta: [String: String],
    delegate: OstWorkflowDelegate
)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform|
| **tokenHolderAddresses** <br> **[String]**	|  **TokenHolder**  addresses of beneficiary users.  |
| **amounts** <br> **[String]**	| Arrya of Amount to be transfered in atto.  |
| **transactionType** <br> **OstExecuteTransactionType**	| Transaction type can take 1 o fthe two values: <br> 1. `DirectTransfer`:  In this type of transaction, the amount of brand token will be transfered directly to the receiver user. <br> 2. `Pay`: In this type of transaction the amount of fiat passed will first be converted into brand token and after this conversion the transfer will happen in converted brand token amount.|
| **meta** <br> **[String: String]**	| Dictionary object having extra information that a developer can pass about the transfer. This dictionary object can have 3 properties. <br><br>Example meta:  <br>[<br>&nbsp; &nbsp;"name":"Thanks for like", <br>&nbsp; &nbsp;"type": "user_to_user", <br>&nbsp; &nbsp;  "details": "like"<br>] |
| **delegate** <br> **OstWorkflowDelegate**	| An object that implements the callback function available in `OstWorkflowDelegate` protocol. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkflowDelegate protocol reference](/platform/docs/sdk/references/wallet_sdk/iOS/latest/protocols/). |




<br>
### 8. authorizeCurrentDeviceWithMnemonics
This workflow should be used to add a new device using 12 words recovery phrase. 

```
OstWalletSdk.authorizeCurrentDeviceWithMnemonics(
    userId: String,
    mnemonics: [String],
    delegate: OstWorkflowDelegate
)

```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform|
| **mnemonics** <br> **[String]**	| Array of String having 12 words |
| **delegate** <br> **OstWorkflowDelegate**	| An object that implements the callback function available in `OstWorkflowDelegate` protocol. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkflowDelegate protocol reference](/platform/docs/sdk/references/wallet_sdk/iOS/latest/protocols/).  |








<br>    
### 9. resetPin
This workflow can be used to change the PIN.

**User will have to provide the current PIN in order to change the it.**

```
OstWalletSdk.resetPin(
    userId: String,
    passPhrasePrefix: String,
    oldUserPin: String,
    newUserPin: String,
    delegate: OstWorkflowDelegate
)
```


| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier for the user of economy |
| **passPhrasePrefix** <br> **String**	| A constant unique identifier for a your user. |
| **oldUserPin** <br> **String**	| Current wallet PIN  |
| **newUserPin** <br> **String**	| New wallet PIN |
| **delegate** <br> **OstWorkflowDelegate**	| An object that implements the callback function available in `OstWorkflowDelegate` protocol. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkflowDelegate protocol reference](/platform/docs/sdk/references/wallet_sdk/iOS/latest/protocols/).  |


## Getters


### 1. getAddDeviceQRCode
This workflow will return the QRCode in the form of [CIImage object](https://developer.apple.com/documentation/coreimage/ciimage) that can be used to show on screen. This QRCode can then be scanned to add the new device.

```
OstWalletSdk.getAddDeviceQRCode(
    userId: String
) throws -> CIImage?
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform |


**Returns**

| Type | Description |
|---|---|
| **CIImage**	| QRCode [CIImage](https://developer.apple.com/documentation/coreimage/ciimage) object. |

