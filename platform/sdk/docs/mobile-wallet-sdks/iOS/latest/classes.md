---
id: classes
title: iOS SDK Classes
sidebar_label: Classes
---

1. Error Classes 
2. OstContextEntity
3. OstWorkflowContext

## 1. Error Classes
There two error classes. 

1. OstApiError
2. OstError

### i). OstApiError
This class is used to provide API related error details in [flowInterrupt](/platform/docs/sdk/references/wallet_sdk/iOS/latest/protocols/#2-flowinterrupt) callback function. 


You can call following [methods](#i-methods) on the object of this class to get more details about the error.

#### A). Methods

1. `public func getApiErrorCode() -> String?`
2. `public func getApiErrorMessage() -> String?`
3. `public func getApiInternalId() -> String?`
4. `public func isBadRequest() -> Bool`
5. `public func isDeviceTimeOutOfSync() -> Bool`
6. `public func isApiSignerUnauthorized() -> Bool`


### ii). OstError
This class is used to provide error details in [flowInterrupt](/platform/docs/sdk/references/wallet_sdk/iOS/latest/protocols/#2-flowinterrupt) callback function. 

You can read following properties on the object of this class to get more details about the error.

#### A). Properties

1. public internal(set) var isApiError = false
2. public let internalCode:String
3. public let errorMessage:String
4. public let messageTextCode:OstErrorText;
5. public var errorInfo: [String: Any]? = nil



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
    **TokenHolder**
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


