---
id: protocols
title: iOS SDK protocols
sidebar_label: Protocols
---

## Protocol details
iOS Wallet SDK provides a protocol named `OstWorkFlowDelegate` as a massaging contract between app and wallet SDK. This protocol will have to be implemented by the application before calling the `workflows`.



![walletSDKCommunication](/platform/docs/sdk/assets/communication-ios-sdk.png)


## Protocol Functions



### 1. flowComplete

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




### 2. flowInterrupt
This function will be called by wallet SDK when a workflow fails or cancelled. The workflow details and error details will be available in arguments.

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




<br>




### 3. requestAcknowledged
This function will be called by wallet SDK when the core API request was successful which happens during the execution of workflows. At this stage the workflow is not completed but it shows that the main communication between the wallet SDK and OST Platform server is complete. <br>Once the workflow is complete, the `app` will recieve the details in `flowComplete` function and if the workflow fails then app will recieve the details in `flowInterrupt` function. 

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


### 4. getPin
This function will be called by wallet SDK when it needs to get the PIN from the `app` user to authenticate any authorized action.
<br>**Expected Function Definition:** Developers of client company are expected to launch their UI to get the PIN from the user and pass back this PIN to SDK by calling **delegate.pinEntered(_ userPin: String, passphrasePrefix: String)** 

```
func getPin(
        _ userId: String, 
        delegate: OstPinAcceptDelegate
        )
```

| Argument | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user |
| **delegate** <br> **OstPinAcceptDelegate**	| **delegate.pinEntered(_ userPin: String, passphrasePrefix: String)** should be called to pass the PIN back to SDK. <br> For some reason if the developer wants to cancel the current workflow they can do it by calling **delegate.cancelFlow()**|




<br>




### 5. pinValidated
This function will be called by wallet SDK when the PIN is validated. 

```
func pinValidated(_ userId: String)
```

| Argument | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user |



<br>



### 6. invalidPin
This function will be called by wallet SDK when the entered PIN was wrong and `app` user has to provide the PIN again. Developer is expected get the PIN from user again and pass back the PIN back to the SDK by calling  **delegate.pinEntered(_ userPin: String, passphrasePrefix: String)** .

```
func invalidPin(
        _ userId: String, 
        delegate: OstPinAcceptDelegate
        )
```

| Argument | Description |
|---|---|
| **userId** <br> **String**	|	Unique identifier of the user	|
| **delegate** <br> **OstPinAcceptDelegate**	| **delegate.pinEntered(_ userPin: String, passphrasePrefix: String)** should be called to again pass the PIN back to SDK. <br> For some reason if the developer wants to cancel the current workflow they can do it by calling **delegate.cancelFlow()** |


<br>


### 7. registerDevice
This function will be called by wallet SDK to register the device.<br>**Expected Function Definition:** Developers of client company are expected to register the device by communicating with their company's server. On client company's server they can use `Server SDK` to register this device in OST Platform. Once device is registered on OST client company's server will recieve the newly created `device` entity. This device entity should be passed back to the `app`.<br>
Finally they should pass back this newly created device entity back to the wallet SDK by calling **delegate.deviceRegistered(_ apiResponse: [String: Any])**.

```
func registerDevice(
        _ apiParams: [String: Any], 
        delegate : OstDeviceRegisteredDelegate
        )
```

| Argument | Description |
|---|---|
| **apiParams** <br> **[String: Any]**	|	Device information for registration	|
| **delegate** <br> **OstDeviceRegisteredDelegate**	| **delegate.deviceRegistered(_ apiResponse: [String: Any] )** should be called to pass the newly created device entity back to SDK. <br>In case data if there is some issue while registering the device then the current workflow should be canceled  by calling **delegate.cancelFlow()** |



<br>

### 8. verifyData
This function will be called by wallet SDK to verify the data during `performQRAction` workflow.


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
| **delegate** <br> **OstValidateDataDelegate**	| **delegate.dataVerified()** should be called if the data is verified successfully. <br>In case data is not verified the current workflow should be canceled by calling **delegate.cancelFlow()**|

