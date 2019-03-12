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
After init, setupDevice should be called everytime the app launches. It ensures that the current device is registered before communicating with OST KIT server. This will register the device if the current device is not registered. In case the device is already registered this function wouldn't do anything. 

**Recommended location to call setupDevice() is in MainActivity.**

```
void setupDevice(String tokenId, OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **tokenId** <br> **String**	| Unique iedntifier for token economy |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| OstWorkFlowCallback interface function. This should implement `registerDevice` function. `registerDevice` will be called during the execution of this workflow.  |

<br>

### 3. activateUser
It `authorises` the registered device and activates the user. User activation deploys various contracts on blockchain. So after `user activation` user can perform wallet actions like doing transactions, etc. Session keys are also created during `activateUser` workflow.

```
void activateUser(UserPassphrase passphrase, long expiresAfterInSecs, String spendingLimitInWei, OstWorkFlowCallback callback)
```

| Parameter | Description |
|---|---|
| **userPassPhrase** <br> **UserPassphrase**	| Unique iedntifier for token economy |
| **expiresAfterInSecs** <br> **long**	| Expire time of session key in seconds. |
| **spendingLimitInWei** <br> **String**	| Spending limit of session key in Wei.  |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| OstWorkFlowCallback interface function. You can pass `flowComplete` and `flowInterrupt` functions to get the workflow status. To learn more about  |



<br>
### 4. addSession
This workflow will create and authorize the session keys that are needed to do the transactions. This flow should be called in the absence of session keys. 

```
 void addSession(long expireAfterInSecs, String spendingLimitInWei, OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **expiresAfterInSecs** <br> **long**	| Expire time of session key in seconds.  |
| **spendingLimitInWei** <br> **String**	| Spending limit of session key in Wei.   |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| OstWorkFlowCallback interface function.   |





<br>
### 5. ostPerform
This workflow will perform operations after reading datat from a QRCode. This workflow can used to add a new device and to do the transactions on the websites.

```
void ostPerform(String data, OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **data** <br> **String**	| JSON object string scanned from QR code. |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| OstWorkFlowCallback interface function.   |



<br>
### 6. getPaperWallet
To get the 12 words of the current device keys.

```
  void getPaperWallet( OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **workFlowCallback** <br> **OstWorkFlowCallback**	| OstWorkFlowCallback interface function.  |



<br>

### 7. executeTransaction
To workflow should be used to do transactions.

```
void executeTransaction(List tokenHolderAddresses, List amounts, String ruleName, OstWorkFlowCallback workFlowCallback)
```

| Parameter | Description |
|---|---|
| **tokenHolderAddresses** <br> **List**	| Token holder addresses of amount receiver |
| **amounts** <br> **List**	| Amoun to be transfered in Wei.  |
| **ruleName** <br> **String**	|  Rule name to be executed.  |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| OstWorkFlowCallback interface function.  |




<br>
### 8. addDeviceMnemonics
This workflow should be used to add a new device using 12 words. 

```
void addDeviceUsingMnemonics( byte[] mnemonics, OstWorkFlowCallback ostWorkFlowCallback)

```

| Parameter | Description |
|---|---|
| **mnemonics** <br> **byte[]**	| byte array of 12 words. |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| OstWorkFlowCallback interface function.   |



<br>

### 9. getAddDeviceQRCode
This workflow will return the QRCode Bitmap that can be used to show on screen. This QRCode can then be scanned to add the new device.

```
 Bitmap getAddDeviceQRCode()
```

| Parameter | Description |
|---|---|
| **None**	|  NA |


<br>

### 10. startPolling

```
  void startPolling( String entityId, String entityType, String successStatus, String failureStatus, OstWorkFlowCallback workFlowCallback)
```


| Parameter | Description |
|---|---|
| **entityId** <br> **String**	| Entity Id of the entity that you want to poll.  |
| **entityType** <br> **String**	| Entity type that you want to poll.  |
| **successStatus** <br> **String**	|  |
| **failureStatus** <br> **String**	|  |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| OstWorkFlowCallback interface function.   |






<br>    
### 11. resetPin
This workflow can be used to change the PIN. User will have to provide the current PIN in order to change the it.

```
  void resetPin( String appSalt, String currentPin, String newPin, OstWorkFlowCallback workFlowCallback)
```


| Parameter | Description |
|---|---|
| **appSalt** <br> **String**	|   |
| **currentPin** <br> **String**	| Current PIN  |
| **newPin** <br> **String**	| New PIN |
| **workFlowCallback** <br> **OstWorkFlowCallback**	| OstWorkFlowCallback interface function.  |



