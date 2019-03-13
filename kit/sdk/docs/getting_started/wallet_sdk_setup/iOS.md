---
id: iOS
title: iOS SDK Setup
sidebar_label: iOS SDK
---

## 1. Overview
You should complete the [server side SDK integration](/kit/docs/sdk/server_sdk/overview).

### Protocols and workflows
iOS Wallet SDK consists of `workflows` and `protocol`. <br><br>
**Protocols**: Callback functions are used for communication between app and wallet SDK. 
<br> In iOS wallet SDK these callback functions are provided as an [protocol]().
<br><br>

**Workflows**: Workflows are functions that can be used to perform wallet related tasks. App developers will be calling these functions to execute different tasks

<br>

## 2. Requirements

iOS version : 9.0 and above
Recommended iOS version : 10.3 


<br>

## 3. Install iOS Wallet SDK

### A). iOS Wallet SDK can be installed using cocoapods.
#### i). Add the following line in your pod file. 

```
ostsdk-ios [Change it]
```

#### ii). Run this command to install the newly added ios sdk in pod file. 

> pod install


## 4. Initialize the wallet SDK

SDK initialization should happen before calling any other `workflow`. To initialize the SDK, we need to call `init` workflow of wallet SDK. It initializes all the required instances and run db migrations. 

Recommended location to call **OstSdk.init()** is in [application](https://developer.apple.com/documentation/uikit/uiapplicationdelegate/1622921-application) method of [UIApplicationDelegate](https://developer.apple.com/documentation/uikit/uiapplicationdelegate). 

```swift
func application(_ application: UIApplication, 
                didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    do {
        try OstSdk.init(apiEndPoint: <KIT_API_ENDPOINT>)
     } catch let ostError {
           
     }
     return true
}
```

**KIT_API_ENDPOINT**:
This will be the base API URL we need to provide to SDK while initializing.

**Sandbox mode endpoint**: "kit.ost.com/test/v2"

**Production endpoint**: "kit.ost.com/test/v2"


## 5. Setting up communication between App and Wallet SDK

iOS Wallet SDK provides `workflows` that can be called by any controller class to perform wallet realted actions. 
The communication between app and iOS wallet SDK happens through callback functions. We need to pass the callback functions in `workflows` provided by SDK. The group of callback function is provided in `OstWorkFlowCallbackDelegate` protocol.


![walletSDKCommunication](/kit/docs/sdk/assets/wallet-sdk-communication.png)

### a). Implementing the `OstWorkFlowCallbackDelegate` protocol
There are different way to implement `OstWorkFlowCallbackDelegate` and pass them while calling workflows. We will create a dedicated class with name `OstSdkInteract`. This class will implement the `OstWorkFlowCallbackDelegate` protocol. We will use this class to create object that can be passped in SDK workflows as callback. 

Sample Implementation of [ OstSdkInteract class](https://github.com/ostdotcom/ost-client-ios-sdk/blob/develop/Demo-App/Demo-App/OstSdkInteract/OstSdkInteract.swift) is available as a part of [demo app ](https://github.com/ostdotcom/ost-client-ios-sdk/tree/develop/Demo-App).


```swift
import Foundation
import OstSdk
import MaterialComponents

class OstSdkInteract: BaseModel, OstWorkFlowCallbackProtocol {
    
    extension OstSdkInteract {

        func flowComplete(workflowContext: OstWorkflowContext, ostContextEntity: OstContextEntity) {
           
            var eventData:[String : Any] = [:];
            eventData["eventType"] = WorkflowEventType.flowComplete;
            eventData["workflowContext"] = workflowContext;
            eventData["ostContextEntity"] = ostContextEntity;
            self.fireEvent(eventData: eventData);
        }

        func flowInterrupted(workflowContext: OstWorkflowContext, error: OstError) {
        
            var eventData:[String : Any] = [:];
            eventData["eventType"] = WorkflowEventType.flowInterrupt;
            eventData["workflow"] = workflowContext.workflowType;
            eventData["workflowContext"] = workflowContext;
            eventData["ostError"] = error;
            self.fireEvent(eventData: eventData);
        }

        // more functions here
        .....

        .....

    }

```

### b). Using `OstSdkInteract` class

`OstSdkInteract` can be used to create object that can be passed as callback in workflows.

Example

In the example below, we are calling `OstSdk.addSession` workflow and passing object of `OstSdkInteract` class

```

 var sdkInteract: OstSdkInteract = {
    let interact = OstSdkInteract();
    return interact;
  }()

   OstSdk.addSession(
                    userId: currentUser.ostUserId!,
                    spendingLimit: self.spendingLimitTestField.text!,
                    expireAfter: Double(expireAfter),
                    delegate: self.sdkInteract)
```

[Sample code](https://github.com/ostdotcom/ost-client-ios-sdk/blob/develop/Demo-App/Demo-App/Views/Wallet/AddSessionView.swift) showing above example in detail is availale on github


## Demo App
To provide developers with sample integration of wallet SDK, a [demo iOS app ](https://github.com/ostdotcom/ost-client-ios-sdk/tree/develop/Demo-App) is available on github. 


## Next Steps

1. [Sample Flow Guide](/kit/docs/sdk/getting_started/sample_flow/)
1. [SDK REFERNECES]()
1. [SDK User Flows]()



