---
id: android
title: Android SDK Setup
sidebar_label: Android SDK
---

## 1. Overview


### Interfaces and workflows
Android Wallet SDK consists of `workflows` and `interface`. <br><br>

**Interface**: Callback functions are used for communication between app and wallet SDK. 
<br> In Android wallet SDK these callback functions are provided as an interface.
<br><br>

**Workflows**: Workflows are functions that can be used to perform wallet related tasks. App developers will be calling these functions to execute different tasks

### Prerequisite
You should complete one of the server SDK Guides ([PHP](/kit/docs/sdk/getting_started/server_sdk_guide/php/), Ruby, Node.js, Java)

<br>

## 2. Requirements

Android supported version: 22 and Above
<br>
Java Compile version: 1.7 


<br>

## 3. Install Android Wallet SDK

### i) Update build.gradle files

#### a). Setting minSdkVersion to 22
```
android {
    defaultConfig {
        minSdkVersion 22
        ...
        ...
        ...
    }
}
```

#### b). Adding compile options
Add following code in your `build.gradle` file

```
compileOptions {
        sourceCompatibility JavaVersion.VERSION_1_8
        targetCompatibility JavaVersion.VERSION_1_8
    }
```

#### c). Adding android wallet sdk package in dependencies

```
dependencies {
        implementation 'com.ost:ost-client-android-sdk:0.1.0.beta.10'
        ...
        ...
        ...
}
```

<br>

### Create config file named `ost-mobilesdk.json` file in `app/src/main/assets/` path of your android project.

Paste following contents in `app/src/main/assets/ost-mobilesdk.json` file

```json
 {
       "BLOCK_GENERATION_TIME": 3,
       "PIN_MAX_RETRY_COUNT": 3,
       "REQUEST_TIMEOUT_DURATION": 60,
       "SESSION_BUFFER_TIME": 3600,
       "PRICE_POINT_TOKEN_SYMBOL": "OST",
       "PRICE_POINT_CURRENCY_SYMBOL": "USD"
 }
```





<br>


## 4. Initialize the wallet SDK
SDK initialization should happen before calling any other `workflow`. To initialize the SDK, we need to call `init` workflow of wallet SDK. It initializes all the required instances and run db migrations. 

**Recommended location to call init() is in Application sub-class.**

```
import android.app.Application;

import com.ost.mobilesdk.OstSdk;

public class App extends Application {

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
There are different ways to pass these callback functions in workflows. We will create a `BaseFragment` for reusability purpose which will implement `OstWorkFlowCallback` interface.

The Wallet SDK <u>does not hold strong reference of workflow callbacks.</u> It only has a <u>weak reference of workflow callback.</u> This is done to avoid any memory leaks. The app should hold therference of the calbacks as long as it needs.

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

// More callback functions definitions here
....
....

}
```



### b). Creating new fragment.
We can now create new fragment that will inherit `BaseFragment` and override definition of **callback functions**. This new fragment can now call workflow function to perform any wallet realted task.

[Sample implementation inheriting `BaseFragment`](https://github.com/ostdotcom/ost-client-android-sdk/blob/develop/app/src/main/java/ost/com/sampleostsdkapplication/fragments/LoginFragment.java)


## Demo App
To provide developers with sample integration of wallet SDK, a [demo android app ](https://github.com/ostdotcom/ost-client-android-sdk) is available on github. 


## Next Steps

1. [Sample Flow Guide](/kit/docs/sdk/getting_started/sample_flow/)
2. SDK [Workflows](/kit/docs/sdk/references/wallet_sdk/android/latest/workflows/) and [Interfaces](/kit/docs/sdk/references/wallet_sdk/android/latest/interfaces/)
3. [User Flows]()
