---
id: classes
title: Android SDK Classes
sidebar_label: Classes
---

1. OstError 
2. OstContextEntity
3. OstWorkflowContext

## 1. OstError
This class is used to provide error details in [flowInterrupt](/platform/docs/sdk/references/wallet_sdk/android/latest/interfaces/#2-flowinterrupt) callback function. 


You can call [methods](#i-methods) on this object to get more details about the error.

### i). Methods

1. `public OstErrors.ErrorCode getErrorCode()`
2. `public String getInternalErrorCode()`
3. `public boolean isApiError()`

## 2. OstContextEntity
This class provides context about the `entity` that is being changed during a [workflow](/platform/docs/sdk/references/wallet_sdk/android/latest/methods/#workflows). Callback functions that needs to know about the `entity` will receive an object of this class as an argument. 


You can call [methods](#i-methods-1) on this object to get more details about the entity.

### i). Methods

1. `public OstContextEntity(String message, Object entity, String entityType)`
2. `public OstContextEntity(Object entity, String entityType)`
3. `public String getMessage()`
4. `public Object getEntity()`
5. `public String getEntityType()`


## 3. OstWorkflowContext
This class provides context about the current [workflow](/platform/docs/sdk/references/wallet_sdk/android/latest/methods/#workflows). Callback function that needs to know about the current [workflow](/platform/docs/sdk/references/wallet_sdk/android/latest/methods/#workflows) will get the object of this class as an argument.

You can call [methods](#i-methods-2) on this object to get more details about the current [workflow](/platform/docs/sdk/references/wallet_sdk/android/latest/methods/#workflows).


The `getWorkflow_type()` methods will return the one of the strings from this enum.

```java
public enum WORKFLOW_TYPE {
        UNKNOWN,
        SETUP_DEVICE,
        ACTIVATE_USER,
        ADD_SESSION,
        GET_DEVICE_MNEMONICS,
        PERFORM_QR_ACTION,
        EXECUTE_TRANSACTION,
        AUTHORIZE_DEVICE_WITH_QR_CODE,
        AUTHORIZE_DEVICE_WITH_MNEMONICS,
        INITIATE_DEVICE_RECOVERY,
        ABORT_DEVICE_RECOVERY,
        REVOKE_DEVICE_WITH_QR_CODE,
        RESET_PIN,
        LOGOUT_ALL_SESSIONS
    }
```

### i). Methods

1. `public OstWorkflowContext(WORKFLOW_TYPE workflow_type)`
2. `public OstWorkflowContext()`
3. `public WORKFLOW_TYPE getWorkflow_type()`