---
id: quickstart_guide
title: Android SDK Quickstart Guide
sidebar_label: Quickstart Guide
---

## 1. Prerequisite
You should complete the server side SDK quickstart guide. The server side SDK quickstart guide is available in 4 languages.
1. [PHP server SDK Quickstart Guide]()
2. [Ruby Server SDK Quickstart Guide]()
3. [Java Server SDK Quickstart Guide]()
4. [Nodejs Server SDK Quickstart Guide]()


After completing the guide you will have following API endpoints on your server:
1. An API endpoint to retrieve already created OST KIT user entity for currently loggedIn app user.
2. An API endpoint to register device.[NEED TO ASK ABOUT API CLIENT]

<br>


## 2. Install Android Wallet SDK
Android Wallet SDK can be installed using Android Studio and Gradle. <br>
<br> 
### a). Add wallet SDK package entry to your `build.gradle` file
```
implementation com.ost.mobilesdk.OstSdk:versionNumber
```

### b). Sync project with gradle files
Once you have added the entry in `build.gradle` file, you need to sync the project with Gradle files. To sync the project with gradle files go to `File` menu, then click on `sync project with gradle files` entry.

![gradle-sync](/kit/docs/sdk/assets/gradle-sync-small.png)

<br>

## 3. Implementing the `OstWorkFlowCallback` interface
Wallet SDK provides `workflows` that can be called by any android activity class or fragment class to perform wallet realted actions. We need to pass callback functions in some of the workflows. The group of callback function is provided in `OstWorkFlowCallback` interface.
<br>
There are different ways to pass these callback functions in workflows. We will create a `Java Class` with name `WorkFlowHelper` that will implement `OstWorkFlowCallback` interface.

### a). Import the required interfaces
```
import com.ost.mobilesdk.OstSdk;
import com.ost.mobilesdk.workflows.OstContextEntity;
import com.ost.mobilesdk.workflows.OstWorkflowContext;
import com.ost.mobilesdk.workflows.errors.OstError;
import com.ost.mobilesdk.workflows.interfaces.OstDeviceRegisteredInterface;
import com.ost.mobilesdk.workflows.interfaces.OstPinAcceptInterface;
import com.ost.mobilesdk.workflows.interfaces.OstVerifyDataInterface;
import com.ost.mobilesdk.workflows.interfaces.OstWorkFlowCallback;

```

### b). Create class `WorkFlowHelper` that implements `OstWorkFlowCallback` interface.
We will write definitions for `flowComplete`, `flowInterrupt` and `verifyData` callback functions. <br>
`RegisterDevice`: This callback will be called during the execution of `setupDevice` workflow. <br>
`flowComplete`: This callback will be called when the current running workflow is complete.<br>
`flowInterrupt`: This callback will be called when the current running workflow is cancelled because of some error.<br>
`verifyData`: This callback will be called when the wallet SDK wants to verify some data. [NEED TO ADD MORE DETAILS] 
<br>

More details about other callback functions in the `OstWorkFlowCallback` interface is available in [Interfaces Guide](/kit/docs/sdk/wallet_sdk/android/latest/interfaces/)



```
import android.content.Context;
import android.util.Log;
import android.widget.Toast;

import com.ost.mobilesdk.OstSdk;
import com.ost.mobilesdk.workflows.OstContextEntity;
import com.ost.mobilesdk.workflows.OstWorkflowContext;
import com.ost.mobilesdk.workflows.errors.OstError;
import com.ost.mobilesdk.workflows.interfaces.OstDeviceRegisteredInterface;
import com.ost.mobilesdk.workflows.interfaces.OstPinAcceptInterface;
import com.ost.mobilesdk.workflows.interfaces.OstVerifyDataInterface;
import com.ost.mobilesdk.workflows.interfaces.OstWorkFlowCallback;

import org.json.JSONObject;

public class WorkFlowHelper implements OstWorkFlowCallback {


    private static final String TAG = "WorkFlowHelper";
    private final App mApp;

    public WorkFlowHelper(Context context) {
        mApp = ((App) context.getApplicationContext());
    }

    @Override
    public void registerDevice(JSONObject apiParams, OstDeviceRegisteredInterface ostDeviceRegisteredInterface) {
        Log.i(TAG, String.format("Device Object %s ", apiParams.toString()));
        String mUserId = mApp.getLoggedUser().getId();
        new MappyApiClient().registerDevice(mUserId, apiParams, new MappyApiClient.Callback() {
            @Override
            public void onResponse(boolean success, JSONObject response) {
                if (success) {
                    ostDeviceRegisteredInterface.deviceRegistered(response);
                } else {
                    ostDeviceRegisteredInterface.cancelFlow();
                }
            }
        });
    }

    @Override
    public void getPin(OstWorkflowContext ostWorkflowContext, String userId, OstPinAcceptInterface ostPinAcceptInterface) {

    }

    @Override
    public void invalidPin(OstWorkflowContext ostWorkflowContext, String userId, OstPinAcceptInterface ostPinAcceptInterface) {

    }

    @Override
    public void pinValidated(OstWorkflowContext ostWorkflowContext, String userId) {

    }

    @Override
    public void flowComplete(OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity) {
        Log.d("Workflow", "Inside workflow complete");
        Toast.makeText(OstSdk.getContext(), "Work Flow Successfull", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void flowInterrupt(OstWorkflowContext ostWorkflowContext, OstError ostError) {
        Toast.makeText(OstSdk.getContext(), String.format("Work Flow %s Error: %s", ostWorkflowContext.getWorkflow_type(), ostError.getMessage()), Toast.LENGTH_SHORT).show();
    }

    @Override
    public void deviceUnauthorized() {

    }

    @Override
    public void showPaperWallet(byte[] mnemonics) {

    }

    @Override
    public void requestAcknowledged(OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity) {

    }

    @Override
    public void verifyData(OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity, OstVerifyDataInterface ostVerifyDataInterface) {
        ostVerifyDataInterface.dataVerified();
    }
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

## 5. Call `setupDevice` workflow on AppLaunch
`SetupDevice` workflow should be called everytime the app launches. It ensures that the current device is registered before communicating with OST KIT server. The recommended location to call setupDevice() is in MainActivity. We will call setupDevice() in mainActivity.

### a). Get OST KIT user entity of currently loggedIn app user.

[NEED TO ADD MORE DETAILS HERE]

### b). Call `setupDevice` workflow in `onCreate` function of mainActivity

```
public void onCreate() {
    OstSdk.setupDevice(userId, tokenId, new WorkFlowHelper(activity.getApplicationContext()));
}
```

