---
id: create-session
title: Create Session Guide
sidebar_label: Create Session
---

Session keys are used to sign transactions in mobile applications that have incorporated OST Wallet SDK. They have an expiry time and a per transaction spending limit. Developers will have to create session keys when session keys expire or are not present. To create a new session key and authorize it, you need to use [addSession](/platform/docs/sdk/mobile-wallet-sdks/android/latest/methods/#4-addsession) workflow available in Wallet SDK ([Android](/platform/docs/sdk/mobile-wallet-sdks/android/), [iOS](/platform/docs/sdk/mobile-wallet-sdks/iOS), [React Native](/platform/docs/sdk/mobile-wallet-sdks/react-native)).

## Steps to Create a New Session Key
1. Call addSession Workflow
2. Check Workflow Status

### 1. Call addSession Workflow
You can call the `addSession` workflow (available in [Android](/platform/docs/sdk/mobile-wallet-sdks/android/), [iOS](/platform/docs/sdk/mobile-wallet-sdks/iOS) and [React Native](/platform/docs/sdk/mobile-wallet-sdks/react-native/) Wallet SDK) to create and authorize the newly created session key.

#### Sample Android Wallet SDK Code
```java
OstSdk.addSession(
    mUserId, 
    spendingLimit, 
    expiryAfterSecs, 
    this);
```

Above shown sample code is a part of [Android sample application](https://github.com/ostdotcom/ost-wallet-sdk-android/blob/a719237a461d938c57ed93abce649ba35b284836/app/src/main/java/ost/com/sampleostsdkapplication/fragments/CreateSessionFragment.java#L75)


### 2. Check Workflow Status

#### Receiving `addSession` workflow status callbacks
There is a list of methods available as [interface](/platform/docs/sdk/mobile-wallet-sdks/android/latest/interfaces/) (in [Android wallet SDK](/platform/docs/sdk/mobile-wallet-sdks/android/)) and as [protocol](/platform/docs/sdk/mobile-wallet-sdks/iOS/latest/protocols/) (in [iOS wallet SDK](/platform/docs/sdk/mobile-wallet-sdks/iOS)) for communication between mobile app and Wallet SDK. 

To show you an example, we will just implement 2 functions to get the workflow status.

1. **flowComplete**:  This callback function will be called if the workflow is completed successfully. The workflow details and the updated entity will be received in the arguments. When the transaction is complete, this function will receive the transaction entity.

Sample code (Android Wallet SDK)
```java
public void flowComplete(OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity) {
        String completeString = String.format("Workflow %s complete entity %s ",
                ostWorkflowContext.getWorkflow_type(), null == ostContextEntity ? "null": ostContextEntity.getEntityType());
 
        Toast.makeText(OstWalletSdk.getContext(), "Work Flow Successful", Toast.LENGTH_SHORT).show();
        ....
        ....
    }
```

2. **flowInterrupt**: The workflow details and OstError object will be received in the arguments. The error details will be available in OstError object. 

Sample code (Android Wallet SDK)
```java
@Override
    public void flowInterrupt(OstWorkflowContext ostWorkflowContext, OstError ostError) {
        String errorString = String.format("Work Flow %s Error: %s", ostWorkflowContext.getWorkflow_type(), ostError.getMessage());
        Toast.makeText(OstWalletSdk.getContext(), errorString, Toast.LENGTH_SHORT).show();
        ...
        ...
    }
```