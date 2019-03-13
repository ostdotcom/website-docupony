---
id: android
title: Android SDK Setup
sidebar_label: Android SDK
---

## 1. Overview
You should complete the [server side SDK integration](/kit/docs/sdk/server_sdk/overview).

### Interfaces and workflows
Android Wallet SDK consists of `workflows` and `interface`. <br><br>

**Interface**: Callback functions are used for communication between app and wallet SDK. 
<br> In Android wallet SDK these callback functions are provided as an [interface]().
<br><br>

**Workflows**: Workflows are functions that can be used to perform wallet related tasks. App developers will be calling these functions to execute different tasks


## 2. Requirements

Android supported version: 22 and Above


<br>

## 3. Install Android Wallet SDK

### installation using Android Studio and Gradle.
<br> 
#### a). Add wallet SDK package entry to your `build.gradle` file
```
implementation com.ost.mobilesdk.OstSdk:1.0.0
```

#### b). Sync project with gradle files
Once you have added the entry in `build.gradle` file, you need to sync the project with Gradle files. To sync the project with gradle files go to `File` menu, then click on `sync project with gradle files` entry.

<br>


## 4. Initialize the wallet SDK
SDK initialization should happen before calling any other `workflow`. To initialize the SDK, we need to call `init` workflow of wallet SDK. It initializes all the required instances and run db migrations. 

**Recommended location to call init() is in Application sub-class.**

```
import android.app.Application;

import com.ost.mobilesdk.OstSdk;

public class App extends Application {


    public static final String BASE_URL_MAPPY = "https://s5-mappy.stagingost.com/api/";
    public static final String BASE_URL_KIT = "https://s6-api.stagingost.com/testnet/v2";
    private LogInUser loggedUser;
    @Override
    public void onCreate() {
        super.onCreate();

        OstSdk.init(getApplicationContext(), BASE_URL_KIT);
    }

    public LogInUser getLoggedUser() {
        return loggedUser;
    }

    public void setLoggedUser(LogInUser loggedUser) {
        this.loggedUser = loggedUser;
    }
}
```

<br>


## 5. Setting up communication between App and Wallet SDK

Wallet SDK provides `workflows` that can be called by any android activity class or fragment class to perform wallet realted actions. 
The communication between app and wallet SDK happens through callback functions. We need to pass the callback functions in `workflows` provided by SDK. The group of callback function is provided in `OstWorkFlowCallback` interface.

![walletSDKCommunication](/kit/docs/sdk/assets/wallet-sdk-communication.png)

<br>

### a). Implementing the `OstWorkFlowCallback` interface
There are different ways to pass these callback functions in workflows. We will create a `Java Class` with name `BaseFragment` that inherits `Fragment` and implements `OstWorkFlowCallback` interface.

Sample Implementation of [ BaseFragment class](https://github.com/ostdotcom/ost-client-android-sdk/blob/develop/app/src/main/java/ost/com/sampleostsdkapplication/fragments/BaseFragment.java) is available as a part of [demo app ](https://github.com/ostdotcom/ost-client-android-sdk).

```java

public class BaseFragment extends Fragment, OstWorkFlowCallback {


  @Override
  public void flowComplete(
  OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity) {
    String workflowType = ostWorkflowContext.getWorkflow_type();
    String entity = ostContextEntity.getEntityType()
    String completeString = String.format("Workflow %s complete entity %s ", workflowType, entity);

    Toast.makeText(OstSdk.getContext(), "Work Flow Successful", Toast.LENGTH_SHORT).show();

  }

  @Override
  public void flowInterrupt(
  OstWorkflowContext ostWorkflowContext, 
  OstError ostError) {

    String workflowType = ostWorkflowContext.getWorkflow_type();
    String errorMessage = ostError.getMessage();

    String errorString = String.format("Work Flow %s Error: %s", workflowType, errorMessage);

    Toast.makeText(OstSdk.getContext(), errorString, Toast.LENGTH_SHORT).show();

  }

// More callback functions declaration here
....
....

}
```



### b). Using BaseFragment to implement new Fragments
`BaseFragment` class can be inherited by other fragments in application. 

For Example: Let's assume that we have a `LoginFragment` that has login functionality. We would want to call `setupDevice` workflow after successful login. Then `LoginFragment` can just inherit `BaseFragment`


[Sample implementation inheriting `BaseFragment`](https://github.com/ostdotcom/ost-client-android-sdk/blob/develop/app/src/main/java/ost/com/sampleostsdkapplication/fragments/LoginFragment.java)


## Demo App
To provide developers with sample integration of wallet SDK, a [demo android app ](https://github.com/ostdotcom/ost-client-android-sdk) is available on github. 



## Next Steps

1. [Sample Flow Guide](/kit/docs/sdk/getting_started/sample_flow/)
1. [SDK REFERNECES]()
1. [SDK User Flows]()
