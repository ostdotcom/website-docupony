---
id: protocols
title: iOS SDK protocols
sidebar_label: Protocols
---

## Protocol details
iOS Wallet SDK provides a protocol named `OstWorkFlowCallbackDelegate` as a massaging contract between app and wallet SDK. This protocol will have to be implemented by the controller calling the `workflows`



![walletSDKCommunication](/kit/docs/sdk/assets/wallet-sdk-communication.png)


## Protocol Functions

### 1. registerDevice
This function will be called by wallet SDK to register the device.<br>**Expected Function Definition:** Developers of partner company are expected to register the device by communicating with partner company's server. On partner company's server they can use `Server SDK` to register this device in OST KIT. Once device is registered on OST KIT partner company's server will recieve the newly created `device` entity. This device entity should be passed back to the `app`.<br>
Finally they should pass back this newly created device entity back to the wallet SDK by calling **OstDeviceRegisteredDelegate.deviceRegistered(_ apiResponse: [String: Any])**.

```
func registerDevice(
        _ apiParams: [String: Any], 
        delegate : OstDeviceRegisteredDelegate
        )
```

| Argument | Description |
|---|---|
| **apiParams** <br> **[String: Any]**	|	Device information for registration	|
| **delegate** <br> **OstDeviceRegisteredDelegate**	| **delegate.deviceRegistered(_ apiResponse: [String: Any] )** should be called to pass the newly created device entity back to SDK. <br>In case data if there is some issue while registering the device then the current workflow should be canceled by developer by calling **delegate.cancelFlow(OstError ostError)**  |



<br>

### 2. verifyData
This function will be called by wallet SDK to verify data before performing QRCode based action.


```
func verifyData(
        workflowContext: OstWorkflowContext, 
        ostContextEntity: OstContextEntity, 
        delegate: OstValidateDataDelegate
        )
```


| Argument | Description |
|---|---|
| **workflowContext** <br> **OstWorkflowContext**	| Information about the current workflow during which this callback will be called	|
| **ostContextEntity** <br> **OstContextEntity**	| Information about the entity |
| **delegate** <br> **OstValidateDataDelegate**	| **delegate.dataVerified()** should be called if the data is verified successfully. <br>In case data is not verified the current workflow should be canceled by developer by calling **delegate.cancelFlow(OstError ostError)** |





<br>



### 3. getPin
This function will be called by wallet SDK when it needs to get the PIN from the `app` user to authenticate any authorised action.
<br>**Expected Function Definition:** Developers of partner company are expected to launch their user interface to get the PIN from the user and pass back this PIN to SDK by calling **delegate.pinEntered()** 

```
func getPin(
        _ userId: String, 
        delegate: OstPinAcceptDelegate
        )
```

| Argument | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user |
| **delegate** <br> **OstPinAcceptDelegate**	| **delegate.pinEntered()** should be called to pass the PIN back to SDK. <br> For some reason if the developer wants to cancel the current workflow they can do it by calling **delegate.cancelFlow(OstError ostError)** |




<br>



### 4. invalidPin
This function will be called wallet SDK when the last entered PIN was wrong and `app` user has to provide the PIN again. Developer are expected to repeat the `getPin` method here and pass back the PIN again back to the SDK by calling  **ostPinAcceptInterface.pinEntered()** .

```
func invalidPin(
        _ userId: String, 
        delegate: OstPinAcceptDelegate
        )
```

| Argument | Description |
|---|---|
| **userId** <br> **String**	|	Unique identifier of the user	|
| **delegate** <br> **OstPinAcceptDelegate**	| **OstPinAcceptDelegate.pinEntered()** should be called to again pass the PIN back to SDK. <br> For some reason if the developer wants to cancel the current workflow they can do it by calling **OstPinAcceptDelegate.cancelFlow(OstError ostError)**  |




<br>




### 5. pinValidated
This function will be called by wallet SDK when the last entered PIN is validated. Developer can dismiss this PIN dialog on this callback.

```
func pinValidated(_ userId: String)
```

| Argument | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user |




<br>




### 6. showPaperWallet
This function will be called by wallet SDK to pass the 12 words mnemonics to `app` developer. 


```
func showPaperWallet(mnemonics: [String])
```

| Argument | Description |
|---|---|
| **mnemonics** <br> **[String]**	| array of mnemonics |





<br>



### 7. requestAcknowledged
This function will be called by wallet SDK when the core API request was successful which h`app`ens during the execution of workflows. At this stage the workflow is not completed but it shows that the main communication between the wallet SDK and OST KIT server is complete. <br>Once the workflow is complete the `app` will recieve the details in `flowComplete`(described below) function. 

```
func requestAcknowledged(
        workflowContext: OstWorkflowContext, 
        ostContextEntity: OstContextEntity
        )
```

| Argument | Description |
|---|---|
| **ostWorkflowContext** <br> **OstWorkflowContext**	| Information about the workflow	|
| **ostContextEntity** <br> **OstContextEntity**	| Information about the entity |




<br>



### 8. flowComplete

This function will be called by wallet SDK when a workflow is completed. The details of workflow and the entity that was updated during the workflow will be available in arguments.

```
func flowComplete(
        workflowContext: OstWorkflowContext, 
        ostContextEntity: OstContextEntity
        )
```

| Argument | Description |
|---|---|
| **ostWorkflowContext** <br> **OstWorkflowContext**	|	Information about the workflow	|
| **ostContextEntity** <br> **OstContextEntity**	| Information about the entity |



<br>




### 9. flowInterrupt
This function will be called by wallet SDK when a workflow is cancelled. The workflow details and error details will be available in arguments.

```
func flowInterrupted(
        workflowContext: OstWorkflowContext, 
        error: OstError
        )
```

| Argument | Description |
|---|---|
| **ostWorkflowContext** <br> **OstWorkflowContext**	| Information about the workflow |
| **ostError** <br> **OstError**	| ostError object will have details about the error that interrupted the flow |


