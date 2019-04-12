---
id: classes
title: iOS SDK Classes
sidebar_label: Classes
---

1. OstError 
2. OstContextEntity
3. OstWorkflowContext

## 1. OstError
This class is used to provide error details in [flowInterrupt](/platform/docs/sdk/references/wallet_sdk/iOS/latest/protocols/#2-flowinterrupt) callback function. 


You can call [methods](#i-methods) on this object to get more details about the error.

### i). Methods

1. `public func getApiErrorCode() -> String? `
2. `public func getApiErrorMessage() -> String?`
3. `public func getApiInternalId() -> String?`
4. `public func isBadRequest() -> Bool`
5. `public func isDeviceTimeOutOfSync() -> Bool`
6. `public func isApiSignerUnauthorized() -> Bool`


## 2. OstContextEntity

This class provides context about the `entity` that is being changed during a [workflow](/platform/docs/sdk/references/wallet_sdk/iOS/latest/methods/#workflows). Callback functions that needs to know about the `entity` will receive an object of this class as an argument. 



`entityType` property will return one of the values from this enum.

```swift
public enum OstEntityType {
    case device,
    user,
    array,
    session,
    transaction,
    recoveryOwner,
    string,
    dictionary,
    tokenHolder
}
```

You can read its [properties](#i-properties) to get more details about the entity.

### i) Properties

```swift
public private(set) var entity: Any?
public private(set) var entityType: OstEntityType
```




## 3. OstWorkflowContext
This class provides context about the current [workflow](/platform/docs/sdk/references/wallet_sdk/iOS/latest/methods/#workflows). Callback function that needs to know about the current [workflow](/platform/docs/sdk/references/wallet_sdk/iOS/latest/methods/#workflows) will get the object of this class as an argument.


`workflowType` property will take one of the values from this enum.

```swift
public enum OstWorkflowType {
    case setupDevice,
    activateUser,
    addSession,
    getDeviceMnemonics,
    performQRAction,
    executeTransaction,
    authorizeDeviceWithQRCode,
    authorizeDeviceWithMnemonics,
    initiateDeviceRecovery,
    abortDeviceRecovery,
    revokeDeviceWithQRCode,
    resetPin,
    logoutAllSessions
}
```

You can read its [properties](#i-properties-1) to get more details about the current [workflow](/platform/docs/sdk/references/wallet_sdk/iOS/latest/methods/#workflows).

### i) Properties


#### a) workflowType

```swift
public let workflowType: OstWorkflowType
```


