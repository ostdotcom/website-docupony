---
id: classes
title: Android SDK Classes
sidebar_label: Classes
---

1. OstError 
2. OstContextEntity
3. OstWorkflowContext

## 1. OstError

### Methods

1. `public OstErrors.ErrorCode getErrorCode()`
2. `public String getInternalErrorCode()`
3. `public boolean isApiError()`

## 2. OstContextEntity


### Methods

1. `public OstContextEntity(String message, Object entity, String entityType)`
2. `public OstContextEntity(Object entity, String entityType)`
3. `public String getMessage()`
4. `public Object getEntity()`
5. `public String getEntityType()`


## 3. OstWorkflowContext

```java
public enum WORKFLOW_TYPE {
        UNKNOWN,
        REGISTER_DEVICE,
        ACTIVATE_USER,
        ADD_DEVICE,
        PERFORM,
        GET_MNEMONICS,
        ADD_SESSION,
        EXECUTE_TRANSACTION,
        ADD_DEVICE_WITH_QR,
        ADD_DEVICE_WITH_MNEMONICS,
        PIN_RESET,
        RECOVER_DEVICE,
        ABORT_RECOVER_DEVICE,
        LOGOUT_ALL_SESSIONS;
    }
```

### Methods

1. `public OstWorkflowContext(WORKFLOW_TYPE workflow_type)`
2. `public OstWorkflowContext()`
3. `public WORKFLOW_TYPE getWorkflow_type()`