---
id: create_wallet
title: Create Wallet Guide
sidebar_label: Create Wallet
---


## Table of contents
This guide is divided into 2 major sections, **Server Side** section and **Mobile App** section. The segregation of **server side** logic and **mobile app** logic will help developers understand the flows individually.


| Section  | Steps |
|---|---|
| **Server Side**  | 1. [Create User](/platform/docs/guides/create_wallet/#register-user)  |
|   | 2. [Generating passphasePrefix](/platform/docs/guides/create_wallet/#generating-passphaseprefix) |
|   | 3. [Register Device](/platform/docs/guides/create_wallet/#register-device) |
| **Mobile App**  | 1. [Initializing Wallet SDK](/platform/docs/guides/create_wallet/#initializing-wallet-sdk)  |
|   | 2. [Calling `setupDevice` workflow](/platform/docs/guides/create_wallet/#calling-setupdevice-workflow) |
|   | 3. [Calling `activateUser` workflow](/platform/docs/guides/create_wallet/#calling-activateuser-workflow) |




## Prerequisite
* Make sure you've created your Brand Token via [OST Platform interface](https://platform.ost.com). This [token creation](/platform/docs/guides/create_token/) guide walks you through the token creation flow. Go to [Developers page](https://platform.ost.com/testnet/developer) inside OST Platform dashboard to get access to API key and API secret.
* Integrate one of the available OST Platform Server SDK into your application. SDKs are available for [PHP](/platform/docs/sdk/server_sdk_setup/php//), [Ruby](/platform/docs/sdk/server_sdk_setup/ruby/), [Node.Js](/platform/docs/sdk/server_sdk_setup/nodejs/) and [Java](/platform/docs/sdk/server_sdk_setup/java/).
* Set up the Wallet SDK by following one of the Wallet set up Guides. Wallet SDKs are available for [Android](/platform/docs/wallet_sdk_setup/android/) and [iOS](/platform/docs/wallet_sdk_setup/iOS/).

<br>


## Create Wallet Sequence Diagram
<br>

[![create-wallet-create-wallet](/platform/docs/assets/sequence-diagrams/create-wallet.svg)](/platform/docs/assets/sequence-diagrams/create-wallet.svg)


<br> 

> ## Server Side
In this sections we will focus on server side logic. You will have to use OST Platform Server Side SDK (available in [PHP](/platform/docs/sdk/server_sdk_setup/php//), [Java](/platform/docs/sdk/server_sdk_setup/java/), [Ruby](/platform/docs/sdk/server_sdk_setup/ruby/), [Node.Js](/platform/docs/sdk/server_sdk_setup/nodejs/)) to communicate with OST Platform. 

### Create User
The first step to create a user's wallet is to create the user on OST Platform. Use one of the available server side SDKs or [API]((/platform/docs/api)) directly to register a user.

**User Registration Tips**

* In case of existing users, you can choose to write a batch script to register multiple users in OST Platform.
*  In case of new users, whenever a sign-up happens the user can be registered in OST Platform.                 

**OST Platform does not ask for any information about the user during registration. As a client company, you will have to maintain the mapping between the `user_id` provided by OST Platform servers and user's personal data on your server.** 

<br>

Register one or more users in OST Platform.

```php
<?php
require 'vendor/autoload.php';
 
$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/';

$ostObj = new OSTSdk($params);
$userService = $ostObj->services->users;

$createParams = array();
$response = $userService->create($createParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);
 
?>
```

### Generating passphasePrefix

`passphasePrefix` is a string with minimum length 30 used in the process of creating recovery key for your economy users. You will have to generate `passphasePrefix` on your server for each user with high randomness. You should keep a mapping between the `passPhrasePrefix` and other user information. Your server should communicate this passPhrasePrefix to your app when needed.

[Security Guidelines for generating passphasePrefix](/platform/docs/sdk/getting_started/security_guidelines/#server-side-sdk)


### Register Device
Your server should receive the device information from your mobile app. To register the device on OST Platform you can use the devices service provided in the Server Side SDKs (available in [PHP](/platform/docs/sdk/server_sdk_setup/php//), [Ruby]((/platform/docs/sdk/server_sdk_setup/ruby/)), [Java](/platform/docs/sdk/server_sdk_setup/java/), [Node.Js](/platform/docs/sdk/server_sdk_setup/nodejs/)).

Sample code to register the device using PHP SDK.

```php
<?php
require 'vendor/autoload.php';
 
$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/';

$ostObj = new OSTSdk($params); 
$deviceService = $ostObj->services->devices;
 
// You should get this data from your mobile application.
$createParams = array();
$createParams['user_id'] = '5ff57c15-f54f-45fe-acf5-6c6fbfdf815a';
$createParams['address'] = '0x2Ea365269A3e6c8fa492eca9A531BFaC8bA1649C';
$createParams['api_signer_address'] = '0x5F860598383868e8E8Ee0ffC5ADD92369Db37455';
$createParams['device_uuid'] = '593a967f-87bd-49a6-976c-52edf46c4df4';
$createParams['device_name'] = 'Iphone S';
$response = $deviceService->create($createParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);
 
?>
```

<br>

> ## Mobile App
In your mobile application, you should use one of the Wallet SDKs (available in [Android](/platform/docs/wallet_sdk_setup/android/) and iOS(/platform/docs/wallet_sdk_setup/iOS/)).

### Initializing Wallet SDK
SDK initialization should happen before calling any other `workflow`. To initialize the SDK, you need to call `initialize` method of wallet SDK. 

**Recommended location to call initialize() is in [Application](https://developer.android.com/reference/android/app/Application) sub-class.**

```java
import android.app.Application;
import com.ost.mobilesdk.OstWalletSdk;

public class App extends Application {

    public static final String OST_PLATFORM_BASE_URL = "https://api.ost.com/testnet/v2";
    private LogInUser loggedUser;
    @Override
    public void onCreate() {
        super.onCreate();

        // Initializing SDK
        OstWalletSdk.initialize(getApplicationContext(), OST_PLATFORM_BASE_URL);
    }
}
```

### Calling `setupDevice` workflow
In order to intiate the device registration from you mobile app, you need to call `setupDevice` workflow.
<br>

`setupDevice` workflow needs `userId` and `tokenId` so `setupDevice` should be called after app login or signup is successful. Using the mapping between userId in OST Platform and your app user, you have access to `userId` and `tokenId` (unique identifier for your token economy).

**If the user is logged in, then `setupDevice` should be called every time the app launches, this ensures that the current device is registered before communicating with OST Platform server.**

```java

    OstWalletSdk.setupDevice(userId, tokenId, this);

```



Make sure you implement the callback function `registerDevice` in the class calling this workflow. This function will get device information from wallet SDK and your app should communicate this information to your server to register the device. In case of successful device registration call `ostDeviceRegisteredInterface.deviceRegistered()`, in case of failure call `ostDeviceRegisteredInterface.cancelFlow()` . 

```java
@Override
 public void registerDevice(JSONObject apiParams, OstDeviceRegisteredInterface ostDeviceRegisteredInterface) {
     if (null == getActivity()) {
         ostDeviceRegisteredInterface.cancelFlow();
         return;
     }
     LogInUser logInUser = ((App) getActivity().getApplicationContext()).getLoggedUser();
     String mUserId = logInUser.getId();

     // MappyApiClient => Class communicating with your server using OST Platform server side SDK .
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
     super.registerDevice(apiParams, ostDeviceRegisteredInterface);
 }
```




### Calling `activateUser` workflow


#### Input parameter for `activateUser`
To activate the user you will have to call **activateUser** workflow which requires 5 input parameters given below:

1. A 6-digit PIN set by user

2. User Id: User id of economy user in OST Platform

3. passphrasePrefix: a unique string for each user with high entropy, generated on your server.

4. expiryAfterInSecs: A  **TokenHolder** contract that holds a users tokens is one of three contracts that are deployed on blockchain during user activation.  **TokenHolder** contract can authorize sessionKeys, to transact on the user's behalf. These keys can sign transactions on users behalf for a predetermined amount of time and with a defined maximum spending limit per-transaction. So your app needs to set expiration time of each users session key as well as the spending limit. It is recommened to set expriation time to 2 weeks, however, you can choose more or less time.

5. spendingLimitinWei: Spending limit is the maximum number of tokens a user can spend in one transaction to be passed in atto Brand Token. 1 Brand Token = 10^18 atto Brand Token.


#### Getting passphrasePrefix from your server
You should request your server to get the `passphrasePrefix` generated in [generating passphrasePrefix section](#generating-passphaseprefix).





#### Getting PIN from user
The other input required to create user's wallet recovery key comes from the user. So you need to prompt the user to set a `pin` in your app. The `pin` entered by the user and the `passphrasePrefix` given by your server forms the input parameters for activating the user.

```java
/**
    * Perform operation on clicking next
    */
   public void onNextClick(){
       if (mPinEditBox.getText() == null || mPinEditBox.getText().length() < 6){
           mPinTextInput.setError(getResources().getString(R.string.enter_six_digit_pin));
           return;
       }
       OnSetUpUserFragmentListener mListener = (OnSetUpUserFragmentListener) getFragmentListener();
       mListener.onSetupUserSubmit(mPinEditBox.getText().toString());
   }
```

#### Create UserPassphrase object 
Your app will create a UserPassphrase object which will contain user Id, user pin and `passphrasePrefix ` shown in below step.

```java
UserPassphrase UserPassphrase = new UserPassphrase(userId, pin, passphrasePrefix);
```


#### Set expiryAfterInSecs and spendingLimitinWei

**expiryAfterInSecs**: Recommended is 2 weeks, however, you can choose more or less time.


**spendingLimitinWei**: Spending limit is the maximum number of tokens a user can spend in one transaction to be passed in atto Brand Token. 1 Brand Token = 10^18 atto Brand Token.

#### Finally calling `activateUser` workflow

Your mobile app should call `activateUser` workflow using wallet SDK with the input parameters from the [above step](#input-parameter-for-activateuser) .



```java
@Override
 public void onSetupUserSubmit(String pin) {
     LogInUser logInUser = ((App) getApplication()).getLoggedUser();
 
     String userId = logInUser.getOstUserId();
     // will communicate with server to get passphrasePrefix
     String passphrasePrefix = logInUser.getPassphrasePrefix();
     long expiresAfterInSecs = 2 * 7 * 24 * 60 * 60; //2 weeks
     String spendingLimit = "1000000000000";
 
     if (userSetupFragment != null) {
         OstWalletSdk.activateUser(new UserPassphrase(userId, pin, passphrasePrefix), expiresAfterInSecs, spendingLimit,
                 userSetupFragment);
         userSetupFragment.flowStarted();
     }  
}
```


**When to activate a user**

* User activation deploys three contracts for each user on OpenST side blockchain so this process takes several seconds.

* User activation is required before doing any wallet actions like executing transfers. Because of the time this process needs, it is recommended to avoid doing activation just before the first token transfer.

#### Verify Activation Status
The SDK provides an interface that should be implemented by the application so that it can receive the workflow status details.

**Receiving callback calls**
There is a list of methods available as [interface](/platform/docs/sdk/references/wallet_sdk/android/latest/interfaces/) (in Android wallet SDK) and as [protocol](/platform/docs/sdk/references/wallet_sdk/iOS/latest/protocols/) (in iOS wallet SDK) for communication between mobile app and Wallet SDK. 


To show you an example, we will just implement 2 functions to get the workflow status.


1. **flowComplete**:  Callback function will be called if the workflow is completed successfully. The workflow details and the updated entity will be received in the arguments. `ostContextEntity` will be updated user entity. Once you receive this updated user entity, it is recommended that your app communicates the updated user entity to your server which stores the user's  **TokenHolder**  address with user info for further use. The user's updated status will be `ACTIVATED`.

```java
public void flowComplete(OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity) {
       String completeString = String.format("Workflow %s complete entity %s ",
               ostWorkflowContext.getWorkflow_type(), null == ostContextEntity ? "null" : ostContextEntity.getEntityType());
 
       Toast.makeText(OstWalletSdk.getContext(), "Work Flow Successful", Toast.LENGTH_SHORT).show();
       ....
       ....
   }
```


2. **flowInterrupt**: Callback function will be called if the workflow is failed because of some error or cancelled. The workflow details and **OstError** object will be received in the arguments. The error details will be available in **OstError** object.

```java
@Override
    public void flowInterrupt(OstWorkflowContext ostWorkflowContext, OstError ostError) {
        String errorString = String.format("Work Flow %s Error: %s", ostWorkflowContext.getWorkflow_type(), ostError.getMessage());
        Toast.makeText(OstWalletSdk.getContext(), errorString, Toast.LENGTH_SHORT).show();
        ...
        ...
    }
```

## Next Steps

1. [Execute Transaction](/platform/docs/guides/execute_transaction/)