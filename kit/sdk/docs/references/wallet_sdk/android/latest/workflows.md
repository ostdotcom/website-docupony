---
id: workflows
title: Android SDK workflows
sidebar_label: Workflows
---


Workflows are the core functionality functions provided by wallet SDK to do wallet related tasks. Workflows can be called directly by importing the SDK but the `Java class` calling these workflows should implement the `OstWorkFlowCallback interface`.

## Calling Workflows

```
import com.ost.mobilesdk.OstSdk;
....
....


 @Override
    public void onCreate() {
        super.onCreate();

        OstSdk.init(getApplicationContext(), BASE_URL_KIT);
    }
```

## Wokrflow API

### 1. init

You must initialize the SDK before calling any other workflows. It initializes all the required instances and run db migrations. **Recommended location to call init() is in Application sub-class.**

```
  void init(context, baseUrl)
```

| Parameter | Description |
|---|---|
| **context** <br> **ApplicationContext**	| Application context can be retrieved by calling **getApplicationContext()**  |
| **baseUrl** <br> **String**	| OST KIT API endpoints: <br> 1. Sandbox Environment: `https://api.ost.com/testnet/v2/` <br> 2. Production Environment: `https://api.ost.com/mainnet/v2/` |



#### Sample implementation

```
public void onCreate() {
        super.onCreate();
        OstSdk.init(getApplicationContext(), BASE_URL);
}
```

<br>
### 2. setupDevice
This workflow needs `userId` and `tokenId` in the arguments so `setupDevice` should be called after your app login or signup is successfull. 
 Using the mapping between OST KIT userId and your app user you have access to `userId` and `tokenId` of OST KIT user. Now you can call `setupDevice` workflow but make sure `setupDevice` should be called everytime the app launches, this ensures that the current device is registered before communicating with OST KIT server.

**Recommended location to call setupDevice() is in MainActivity.**

```
void setupDevice( String userId, 
                  String tokenId, 
                  OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier for the user of economy |
| **tokenId** <br> **String**	| Unique identifier for the token economy |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/kit/docs/sdk/references/wallet_sdk/android/latest/interfaces/). This should implement `registerDevice` function. `registerDevice` will be called during the execution of this workflow.  |

<br>

### 3. activateUser
It `authorises` the registered device and activates the user. User activation deploys various contracts on blockchain. So after `user activation` user can perform wallet actions like doing transactions, etc. Session keys are also created during `activateUser` workflow.

```
void activateUser(UserPassphrase passphrase, 
                  long expiresAfterInSecs, 
                  String spendingLimitInWei, 
                  OstWorkFlowCallback callback)
```

| Parameter | Description |
|---|---|
| **userPassPhrase** <br> **UserPassphrase**	| Unique iedntifier for token economy |
| **expiresAfterInSecs** <br> **long**	| Expire time of session key in seconds. |
| **spendingLimitInWei** <br> **String**	| Spending limit of session key in Wei.  |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/kit/docs/sdk/references/wallet_sdk/android/latest/interfaces/).  |



<br>
### 4. addSession
This workflow will create and authorize the session keys that are needed to do the transactions. This flow should be called in the absence of session keys. 

```
 void addSession( String userId, 
                  long expireAfterInSecs, 
                  String spendingLimitInWei, 
                  OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier for the user of economy |
| **expiresAfterInSecs** <br> **long**	| Expire time of session key in seconds.  |
| **spendingLimitInWei** <br> **String**	| Spending limit of session key in Wei.   |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/kit/docs/sdk/references/wallet_sdk/android/latest/interfaces/).   |





<br>
### 5. ostPerform
This workflow will perform operations after reading datat from a QRCode. This workflow can used to add a new device and to do the transactions on the websites.

```
  void ostPerform(String userId, 
                  String data, 
                  OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier for the user of economy |
| **data** <br> **String**	| JSON object string scanned from QR code. |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/kit/docs/sdk/references/wallet_sdk/android/latest/interfaces/).   |



<br>
### 6. getPaperWallet
To get the 12 words of the current device keys.

```
 void getPaperWallet( String userId, 
                      OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier for the user of economy |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/kit/docs/sdk/references/wallet_sdk/android/latest/interfaces/).  |



<br>

### 7. executeTransaction
To workflow should be used to do transactions.

```
void executeTransaction(String userId, 
                        String tokenId, 
                        List tokenHolderAddresses, 
                        List amounts, 
                        String ruleName, 
                        OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier for the user of economy |
| **tokenId** <br> **String**	| Unique identifier for the token economy |
| **tokenHolderAddresses** <br> **List**	| Token holder addresses of amount receiver |
| **amounts** <br> **List**	| Amoun to be transfered in Wei.  |
| **ruleName** <br> **String**	|  Rule name to be executed.  |
| **workFlowCallback** <br> **OstWorkFlowCallback**	|An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/kit/docs/sdk/references/wallet_sdk/android/latest/interfaces/).  |




<br>
### 8. addDeviceMnemonics
This workflow should be used to add a new device using 12 words. 

```
void addDeviceUsingMnemonics( String userId, 
                              byte[] mnemonics, 
                              OstWorkFlowCallback ostWorkFlowCallback)

```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier for the user of economy |
| **mnemonics** <br> **byte[]**	| byte array of 12 words. |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/kit/docs/sdk/references/wallet_sdk/android/latest/interfaces/).   |



<br>

### 9. getAddDeviceQRCode
This workflow will return the QRCode Bitmap that can be used to show on screen. This QRCode can then be scanned to add the new device.

```
Bitmap getAddDeviceQRCode(String userId)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier for the user of economy |





<br>    
### 10. resetPin
This workflow can be used to change the PIN. User will have to provide the current PIN in order to change the it.

```
  void resetPin(String userId,  String appSalt, String currentPin, String newPin, OstWorkFlowCallback workFlowCallback)
```


| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier for the user of economy |
| **appSalt** <br> **String**	|   |
| **currentPin** <br> **String**	| Current PIN  |
| **newPin** <br> **String**	| New PIN |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/kit/docs/sdk/references/wallet_sdk/android/latest/interfaces/). |



