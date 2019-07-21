---
id: methods
title: Android SDK Methods
sidebar_label: Methods
---

## Types of Methods

1. `Workflows`: Workflows are the core functions provided by wallet SDK to do wallet related actions. Workflows can be called directly by importing the SDK.

	* Application must confirm to `OstWorkFlowCallback` interface. The `OstWorkFlowCallback` interface defines methods that allow application to interact with Android Wallet SDK.


2. `Getters`: These functions are synchronous and will return the value when requested.






## Workflows

### 1. initialize

You must initialize the SDK before start using it.
<br> **Recommended location to call initialize() is in [Application](https://developer.android.com/reference/android/app/Application) sub-class.**

```
  void initialize(context, baseUrl)
```

| Parameter | Description |
|---|---|
| **context** <br> **ApplicationContext**	| Application context can be retrieved by calling **getApplicationContext()**  |
| **baseUrl** <br> **String**	| OST Platform API endpoints: <br> 1. Sandbox Environment: `https://api.ost.com/testnet/v2/` <br> 2. Production Environment: `https://api.ost.com/mainnet/v2/` |

#### Sample code to initialize SDK

```java
import com.ost.mobilesdk.OstWalletSdk;
....
....

public class App extends Application {

	@Override
	public void onCreate() {
		super.onCreate();

		OstWalletSdk.initialize(getApplicationContext(), <OST_PLATFORM_API_ENDPOINT>);
	}
	
	...
	...
	...

}

```


<br>
### 2. setupDevice
This workflow needs `userId` and `tokenId` so `setupDevice` should be called after your app login or signup is successful.
Using the mapping between userId in OST Platform and your app user, you have access to `userId` and `tokenId`.

**If the user is logged in, then `setupDevice` should be called every time the app launches, this ensures that the current device is registered before communicating with OST Platform server.**


```
void setupDevice( String userId, 
                  String tokenId, 
                  OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform  |
| **tokenId** <br> **String**	| Unique identifier for the token economy |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/platform/docs/sdk/references/wallet_sdk/android/latest/interfaces/).<br> This should implement `registerDevice` function. `registerDevice` will be called during the execution of this workflow.  |

<br>

### 3. activateUser
It `authorizes` the registered device and activates the user. User activation deploys  **TokenHolder**, Device manager  contracts on blockchain. Session keys are also created and authorized during `activateUser` workflow. So after `user activation`, users can perform wallet actions like executing transactions and reset pin. 

```
void activateUser(UserPassphrase passphrase, 
                  long expiresAfterInSecs, 
                  String spendingLimit, 
                  OstWorkFlowCallback callback)
```

| Parameter | Description |
|---|---|
| **userPassPhrase** <br> **UserPassphrase**	| A simple struct to hold and transfer pin information via app and SDK. |
| **expiresAfterInSecs** <br> **long**	| Expire time of session key in seconds. |
| **spendingLimit** <br> **String**	| Spending limit of session key in [atto BT](/platform/docs/guides/execute_transaction/#converting-brand-token-to-atto-brand-token).  |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/platform/docs/sdk/references/wallet_sdk/android/latest/interfaces/).  |



<br>
### 4. addSession
This workflow will create and authorize the session key that is needed to do the transactions. This flow should be called if the session key is expired or not present. 

```
 void addSession( String userId, 
                  long expireAfterInSecs, 
                  String spendingLimit, 
                  OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform  |
| **expiresAfterInSecs** <br> **long**	| Expire time of session key in seconds.  |
| **spendingLimit** <br> **String**	| Spending limit of session key in [atto BT](/platform/docs/guides/execute_transaction/#converting-brand-token-to-atto-brand-token).   |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/platform/docs/sdk/references/wallet_sdk/android/latest/interfaces/).   |





<br>
### 5. performQRAction
This workflow will perform operations after reading data from a QRCode. This workflow can used to add a new device and to do the transactions.

```
  void performQRAction(String userId, 
                  String data, 
                  OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform  |
| **data** <br> **String**	| JSON object string scanned from QR code. |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/platform/docs/sdk/references/wallet_sdk/android/latest/interfaces/).   |



<br>
### 6. getDeviceMnemonics
To get the 12 words recovery phrase of the current device key. Users will use it to prove that it is their wallet.  

```
 void getPaperWallet( String userId, 
                      OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform  |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/platform/docs/sdk/references/wallet_sdk/android/latest/interfaces/).  |



<br>

### 7. executeTransaction
Workflow should be used to do the `user-to-company` and `user-to-user` transactions.

```java
void executeTransaction(String userId, 
                        String tokenId, 
                        List tokenHolderAddresses, 
                        List amounts, 
                        String ruleName, 
                        Map<String,String> meta, 
                        Map<String,String> options,
                        OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform |
| **tokenId** <br> **String**	| Unique identifier for the token economy |
| **tokenHolderAddresses** <br> **List**	|  **TokenHolder**  addresses of amount receiver |
| **amounts** <br> **List**	| Amount to be transferred in atto.  |
| **ruleName** <br> **String**	|  Rule name to be executed.  |
| **meta** <br> **Map<String,String>**	|  Transaction Meta properties. <br> Example: `{"name": "transaction name","type": "user-to-user","details": "like"}`  |
| **options** <br> **Map<String,String>**	| Optional settings parameters. You can set following values: <br> 1. `currency_code`: Currency code for the pay currency. <br> 2. `wait_for_finalization`: If set `false` then SDK will stop polling for transaction status. By default the SDK will do polling to check the transaction status. <br> Example: `{"currency_code": "USD", "wait_for_finalization": false}`|
| **workFlowCallback** <br> **OstWorkFlowCallback**	|An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/platform/docs/sdk/references/wallet_sdk/android/latest/interfaces/).  |




<br>
### 8. authorizeCurrentDeviceWithMnemonics
This workflow should be used to add a new device using 12 words recovery phrase. 

```
void addDeviceUsingMnemonics( String userId, 
                              byte[] mnemonics, 
                              OstWorkFlowCallback ostWorkFlowCallback)

```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform |
| **mnemonics** <br> **byte[]**	| byte array of 12 words. |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/platform/docs/sdk/references/wallet_sdk/android/latest/interfaces/).   |



<br>

### 9. resetPin
This workflow can be used to change the PIN.

**User will have to provide the current PIN in order to change it.**

```
  void resetPin(String userId,  
                String appSalt, 
                String currentPin, 
                String newPin, 
                OstWorkFlowCallback workFlowCallback)
```


| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform |
| **appSalt** <br> **String**	|   |
| **currentPin** <br> **String**	| Current PIN  |
| **newPin** <br> **String**	| New PIN |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/platform/docs/sdk/references/wallet_sdk/android/latest/interfaces/). |


### 10. initiateDeviceRecovery
A user can control their Brand Tokens using their authorized devices. If they lose their authorized device, they can recover access to their Brand Tokens by authorizing a new device by initiating the recovery process.

```java
void initiateDeviceRecovery(String userId, 
                            UserPassphrase passphrase, 
                            String deviceAddressToRecover, 
                            OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform |
| **passphrase** <br> **UserPassphrase**	| A simple struct to hold and transfer pin information via app and SDK.  |
| **deviceAddressToRecover** <br> **String**	| Address of device to recover  |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/platform/docs/sdk/references/wallet_sdk/android/latest/interfaces/). |




### 11. abortDeviceRecovery
This workflow can be used to abort the initiated device recovery.

```java
void abortDeviceRecovery(String userId, 
                        UserPassphrase passphrase, 
                        OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform |
| **passphrase** <br> **UserPassphrase**	| A simple struct to hold and transfer pin information via app and SDK.  |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/platform/docs/sdk/references/wallet_sdk/android/latest/interfaces/). |




### 12. logoutAllSessions
This workflow will revoke all the sessions associated with the provided userId.

```java
void logoutAllSessions(String userId, 
                       OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| An object that implements the callback functions available in `OstWorkFlowCallback` interface. These callback functions are needed for communication between app and wallet SDK. Implement `flowComplete` and `flowInterrupt` callback functions to get the workflow status. Details about other callback function can be found in [OstWorkFlowCallback interface reference](/platform/docs/sdk/references/wallet_sdk/android/latest/interfaces/). |


## Getters



### 1. getAddDeviceQRCode
This getter function will return the QRCode Bitmap that can be used to show on screen. This QRCode can then be scanned to add the new device.

```
Bitmap getAddDeviceQRCode(String userId)
```

| Parameter | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user stored in OST Platform |





<br>    