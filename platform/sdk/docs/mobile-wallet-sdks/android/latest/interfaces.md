---
id: interfaces
title: Android SDK interfaces
sidebar_label: Interfaces
---

## Interface details
Android SDK provides an interface to be implemented by the Java class calling the `workflows`. 
<br>
The interface name is `OstWorkFlowCallback`

### Importing the interface

```
import com.ost.mobilesdk.workflows.interfaces.OstWorkFlowCallback;
```

![walletSDKCommunication](/platform/docs/sdk/assets/wallet-sdk-communication.png)


## Interface Functions


### 1. flowComplete

This function will be called by wallet SDK when a workflow is completed. The details of workflow and the entity that was updated during the workflow will be available in arguments.

```
void flowComplete(OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity)
```

| Argument | Description |
|---|---|
| **ostWorkflowContext** <br> **OstWorkflowContext**	|	Information about the workflow	|
| **ostContextEntity** <br> **OstContextEntity**	| Information about the entity |



<br>




### 2. flowInterrupt
This function will be called by wallet SDK when a workflow is cancelled. The workflow details and error details will be available in arguments.

```
void flowInterrupt(OstWorkflowContext ostWorkflowContext, OstError ostError)
```

| Argument | Description |
|---|---|
| **ostWorkflowContext** <br> **OstWorkflowContext**	| Information about the workflow |
| **ostError** <br> **OstError**	| ostError object will have details about the error that interrupted the flow |



<br>




### 3. requestAcknowledged
This function will be called by wallet SDK when the core API request was successful which happens during the execution of workflows. At this stage the workflow is not completed but it shows that the main communication between the wallet SDK and OST Platform server is complete. <br>Once the workflow is complete the `app` will receive the details in `flowComplete` (described below) function. 

```
void requestAcknowledged(OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity)
```

| Argument | Description |
|---|---|
| **ostWorkflowContext** <br> **OstWorkflowContext**	| Information about the workflow	|
| **ostContextEntity** <br> **OstContextEntity**	| Information about the entity |

<br>




### 4. getPin
This function will be called by wallet SDK when it needs to get the PIN from the `app` user to authenticate any authorised action.
<br>**Expected Function Definition:** Developers of client company are expected to launch their user interface to get the PIN from the user and pass back this PIN to SDK by calling **ostPinAcceptInterface.pinEntered()** 

```
void getPin(String userId, OstPinAcceptInterface ostPinAcceptInterface)
```

| Argument | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user |
| **ostPinAcceptInterface** <br> **OstPinAcceptInterface**	| **ostPinAcceptInterface.pinEntered()** should be called to pass the PIN back to SDK. <br> For some reason if the developer wants to cancel the current workflow they can do it by calling **ostPinAcceptInterface.cancelFlow()** |


<br>




### 5. pinValidated
This function will be called by wallet SDK when the last entered PIN is validated. 

```
void pinValidated(String userId)
```

| Argument | Description |
|---|---|
| **userId** <br> **String**	| Unique identifier of the user |




<br>



### 6. invalidPin
This function will be called by wallet SDK when the last entered PIN was wrong and `app` user has to provide the PIN again. Developers are expected to repeat the `getPin` method here and pass back the PIN again back to the SDK by calling  **ostPinAcceptInterface.pinEntered()** .

```
void invalidPin(String userId, OstPinAcceptInterface ostPinAcceptInterface)
```

| Argument | Description |
|---|---|
| **userId** <br> **String**	|	Unique identifier of the user	|
| **ostPinAcceptInterface** <br> **OstPinAcceptInterface**	| **ostPinAcceptInterface.pinEntered()** should be called to again pass the PIN back to SDK. <br> For some reason if the developer wants to cancel the current workflow they can do it by calling **ostPinAcceptInterface.cancelFlow()**  |


<br>


### 7. registerDevice
This function will be called by wallet SDK to register the device.<br>**Expected Function Definition:** Developers of client company are expected to register the device by communicating with client company's server. On client company's server they can use `Server SDK` to register this device in OST Platform. Once the device is registered on OST Platform client company's server will receive the newly created `device` entity. This device entity should be passed back to the `app`.<br>
Finally they should pass back this newly created device entity back to the wallet SDK by calling **OstDeviceRegisteredInterface.deviceRegistered(JSONObject newDeviceEntity )**.

```
void registerDevice(JSONObject apiParams, OstDeviceRegisteredInterface ostDeviceRegisteredInterface)
```

| Argument | Description |
|---|---|
| **apiParams** <br> **JSONObject**	|	Device information for registration	|
| **ostDeviceRegisteredInterface** <br> **OstDeviceRegisteredInterface**	| **OstDeviceRegisteredInterface.deviceRegistered(JSONObject newDeviceEntity )** should be called to pass the newly created device entity back to SDK. <br>In case data is not verified the current workflow should be canceled by developer by calling **OstDeviceRegisteredInterface.cancelFlow()**  |



<br>

### 8. verifyData
This function will be called by wallet SDK to verify data during `performQRAction` workflow.


```
void verifyData(OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity, OstVerifyDataInterface ostVerifyDataInterface)
```


| Argument | Description |
|---|---|
| **ostWorkflowContext** <br> **OstWorkflowContext**	| Information about the current workflow during which this callback will be called	|
| **ostContextEntity** <br> **OstContextEntity**	| Information about the entity |
| **ostVerifyDataInterface** <br> **OstVerifyDataInterface**	| **ostVerifyDataInterface.dataVerified()** should be called if the data is verified successfully. <br>In case data is not verified the current workflow should be canceled by developer by calling **ostVerifyDataInterface.cancelFlow()** |

