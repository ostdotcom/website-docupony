---
id: android
title: Android SDK Setup
sidebar_label: Android
---

## 1. Overview


### Interfaces and workflows
Android Wallet SDK consists of an `interface` and `workflows`. <br><br>

**Interface**: callback functions are used for communication between app and wallet SDK.
<br> In Android wallet SDK these callback functions are provided as an interface.
<br><br>

**Workflows**: Workflows are functions that can be used to perform wallet related tasks. App developers will be call these functions to execute different tasks.

### Prerequisite
You should complete one of the server SDK Guides ([PHP](/platform/docs/sdk/server_sdk_setup/php/), [Ruby](/platform/docs/sdk/server_sdk_setup/ruby/), [Node.js](/platform/docs/sdk/server_sdk_setup/nodejs/), [Java](/platform/docs/sdk/server_sdk_setup/java/))
<br>

## 2 Requirements

Android API supported version: 22 and Above
<br>
Java Compile version: 1.7


### 2b) [Optional] Using SDK for Android Apps that supports Android API versions below 22.
Wallet SDK cannot work in Android Apps with version 21 and below, the minimum Android API version it can work with is 22 (Android Lolipop). 

If your Android App supports minimum Android API version lower than Lolilop (Android API 22), Wallet SDK will work for Lolipop and above versions of Android API and Wallet SDK will break for users running Android API versions lower than Lolipop (Android API 22). 

To use the SDK with an application that supports Android API below 22, please follow the steps below:

1. By default, when importing a library with a `minSdkVersion` value that's higher than the main manifest file, an error occurs and the library cannot be imported. To make the merger tool ignore this conflict and import the library while keeping your App's lower `minSdkVersion` value, add the `overrideLibrary` attribute to the `<uses-sdk>` tag.


```xml
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
          package="com.example.app"
          xmlns:tools="http://schemas.android.com/tools">
    ...
    ...
    ...

  <uses-sdk tools:overrideLibrary="com.ost.walletsdk"/>
```

2.  Use conditional initialization for Andriod API version 22 and above.

```java
public static final String OST_PLATFORM_API_BASE_URL = "https://api.ost.com/testnet/v2";

if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP_MR1) {
            OstSdk.initialize(getApplicationContext(), OST_PLATFORM_API_BASE_URL);
 }
```

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
    implementation 'com.ost:ost-wallet-sdk-android:2.0.2'
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
    "PRICE_POINT_CURRENCY_SYMBOL": "USD",
    "USE_SEED_PASSWORD": false
 }
```
Block_Generation_Time: The time in seconds it takes to mine a block on auxiliary chain.
PIN_MAX_RETRY_COUNT: Maximum retry count to get the wallet Pin from user.
REQUEST_TIMEOUT_DURATION: Request timeout in seconds for https calls made by ostWalletSdk.
SESSION_BUFFER_TIME: Buffer expiration time for session keys in seconds.
PRICE_POINT_TOKEN_SYMBOL: This is the symbol of base currency. So its value will be OST.
PRICE_POINT_CURRENCY_SYMBOL: It is the symbol of quote currency used in price conversion.
USE_SEED_PASSWORD: Uses mnemonics and password to generate seed.

**NOTE: These configurations are MANDATORY for successful operation. Failing to set them will significantly impact usage.**

<br>


## 4. Initialize the wallet SDK
SDK initialization should happen before calling any other `workflow`. To initialize the SDK, we need to call `initialize` method of wallet SDK.

**Recommended location to call init() is in Application sub-class.**

```
import android.app.Application;

import com.ost.mobilesdk.OstWalletSdk;

public class App extends Application {

    public static final String OST_PLATFORM_API_BASE_URL = "https://api.ost.com/testnet/v2";
    @Override
    public void onCreate() {
        super.onCreate();

        OstWalletSdk.initialize(getApplicationContext(), OST_PLATFORM_API_BASE_URL);
    }

}
```

<br>


## 5. Setting up communication between app and wallet SDK

Wallet SDK provides `workflows` that can be called by any Android activity class or fragment class to perform wallet related actions.
Communication between app and wallet SDK happens through callback functions. We need to pass these callback functions in `workflows` provided by SDK. The group of callback functions for communication between app and wallet SDK is provided in `OstWorkFlowCallback` interface.

![walletSDKCommunication](/platform/docs/sdk/assets/wallet-sdk-communication.png)

<br>

### a). Implementing the `OstWorkFlowCallback` interface
There are different ways to pass these callback functions in workflows. We will create a `BaseFragment` for reusability purpose which will implement `OstWorkFlowCallback` interface.

The Wallet SDK <u>does not hold strong reference of workflow callbacks.</u> It only has a <u>weak reference of workflow callback.</u> This is done to avoid any memory leaks. The app should hold the reference of the callbacks as long as it needs.

Sample Implementation of [ BaseFragment class](https://github.com/ostdotcom/ost-wallet-sdk-android/blob/release-2.0/app/src/main/java/ost/com/sampleostsdkapplication/fragments/BaseFragment.java) is available as a part of [demo app ](https://github.com/ostdotcom/ost-wallet-sdk-android/tree/release-2.0/app).

```java

public class BaseFragment extends Fragment, OstWorkFlowCallback {


  @Override
  public void flowComplete(
  OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity) {
    String workflowType = ostWorkflowContext.getWorkflow_type();
    String entity = ostContextEntity.getEntityType()
    String completeString = String.format("Workflow %s complete entity %s ", workflowType, entity);

    Toast.makeText(OstWalletSdk.getContext(), "Work Flow Successful", Toast.LENGTH_SHORT).show();

  }

  @Override
  public void flowInterrupt(
  OstWorkflowContext ostWorkflowContext,
  OstError ostError) {

    String workflowType = ostWorkflowContext.getWorkflow_type();
    String errorMessage = ostError.getMessage();

    String errorString = String.format("Work Flow %s Error: %s", workflowType, errorMessage);

    Toast.makeText(OstWalletSdk.getContext(), errorString, Toast.LENGTH_SHORT).show();

  }

// More callback functions definitions here
....
....

}
```



### b). Creating new fragment.
You can now create new fragment that will inherit `BaseFragment` and override definition of **callback functions**. This new fragment can now call workflow function to perform any wallet related task.

[Sample implementation inheriting `BaseFragment`](https://github.com/ostdotcom/ost-wallet-sdk-android/blob/release-2.0/app/src/main/java/ost/com/sampleostsdkapplication/fragments/LoginFragment.java)


## Demo App
To provide developers with sample integration of wallet SDK, a [demo Android app](https://github.com/ostdotcom/ost-wallet-sdk-android/tree/release-2.0/app) is available on github.

## Next Steps

1. [Create Wallet Guide](/platform/docs/guides/create_wallet/)
2. [Execute Transaction Guide](/platform/docs/guides/execute_transaction/)
3. Android Wallet SDK [Methods](/platform/docs/sdk/references/wallet_sdk/android/latest/methods/),  [Interfaces](/platform/docs/sdk/references/wallet_sdk/android/latest/interfaces/) and [Classes](/platform/docs/sdk/references/wallet_sdk/android/latest/classes/)
