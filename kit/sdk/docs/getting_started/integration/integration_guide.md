---
id: integration_guide
title: Sample Flow
sidebar_label: Sample Flow
---


## Before you begin
* Make sure you've created your Brand Token via OST KIT interface. This guide walks you through the token creation flow.
* Obtain API KEY and API SECRET : 

    * Go to Developers page inside OST KIT dashboard to get access to API key and API secret.
    * Every account is provided with two pairs of keys: one for sandbox environment and one for production environment. Use only your sandbox environment API keys for testing and development. This ensures that you don't modify your live production data.

* Integrate the KIT Server SDK into your application. Server SDKs are available for PHP, Ruby, JavaScript and Java.
* Setup Wallet SDK. Wallet SDKs are available for Android and iOS


## Creating a user's wallet

### User and Wallet Setup
We will have to register the user and it's device onto OST server.

a). Register User
b). Register Device

### Activating User
Activating the user will deploys smart contracts on blockchain for your users. This is very essential step


### a). Register User


#### Server Side
Register one or more users with KIT.

```php
<?php
require 'vendor/autoload.php';
 
$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';
 
// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;
 
$ostObj = new OSTSdk($params);
 
$userService = $ostObj->services->users;
$createParams = array();
$response = $userService->create($createParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);
 
?>
```

**User Registeration Tips**

* In case of existing users you can choose to write a script to register multiple users and map the `user_ids` you get from KIT server with each user.
*  In case of new users whenever a sign-up happens the user can be registered with KIT.                 

**End-user data** 

KIT servers do not ask for any information about the user during registration. As a partner company you will have to maintain the mapping between the user_id provided by KIT servers and user's personal data on your server. 


### b). Register Device

### Mobile App using Wallet SDK

Your app will initiate **setupDevice** workflow using wallet SDK. This workflow needs `userId` and `tokenId` in the arguments so `setupDevice` should be called after your app login or signup is successful. 
Using the mapping between OST KIT userId and your app user you have access to `userId` and `tokenId` of OST KIT user. Now you can call `setupDevice` workflow but make sure `setupDevice` should be called every time the app launches, this ensures that the current device is registered before communicating with OST KIT server.

```java
@Override
public void deviceSetup() {
    OstSdk.setupDevice(UserId, TokenId, this);
}
```

Make sure you implement the callback function `registerDevice` in the class calling this workflow. This function will get device information from wallet SDK and your app should communicate this information to your server to register the device. In case of successful device registration call ostDeviceRegisteredInterface.deviceRegistered, in case of failure call  ostDeviceRegisteredInterface.cancelFlow . 

```java
@Override
 public void registerDevice(JSONObject apiParams, OstDeviceRegisteredInterface ostDeviceRegisteredInterface) {
     Log.i(TAG, String.format("Device Object %s ", apiParams.toString()));
     if (null == getActivity()) {
         Log.e(TAG, "Activity is null");
         ostDeviceRegisteredInterface.cancelFlow();
         return;
     }
     LogInUser logInUser = ((App) getActivity().getApplicationContext()).getLoggedUser();
     String mUserId = logInUser.getId();
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


### Server-side

Once your server receives device information from your app send a POST call to KIT server to register the user's device with KIT. 

```php
<?php
require 'vendor/autoload.php';
 
$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';
 
// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;
 
$ostObj = new OSTSdk($params);
 
$deviceService = $ostObj->services->devices;
 
 
// You should receive this data from your application.
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

## Activating User

To activate the user we will have to call **activateUser** workflow which requires 5 inputs parameters given below:


1. A 6-digit PIN set by user
User Id
2. passphrasePrefix : a unique string for each user  with high entropy, generated on your server.
3. expiryAfterInSecs :  A TokenHolder contract that holds user's tokens is one of the three contracts that are deployed on blockchain during user activation. TokenHolder contract can authorize sessionKeys, to transact on the user's behalf. These keys can sign transactions on user's behalf for a predetermined amount of time and with a defined maximum spending limit per-transaction. So your app needs to set expiration time of each user's session key as well as the 
4. spending limit.  Recommended is 2 weeks you can choose to keep more or less.
spendingLimitinWei : Spending limit is the maximum number of tokens a user can spend in one transaction to be passed in Wei. 

### Generating passphrasePrefix 

On your server create a unique passPhrasePrefix for each user with high entropy. You should keep a mapping between the passPhrasePrefix and other user information. This string is one of the three inputs  required to create user's wallet recovery key. Your serve should communicate this passPhrasePrefix  to your app.

#### Server side
```java
passPhrasePrefix = jsonObject.getString(Constants.RANDOM_STRING);
```

### Getting PIN from user
The second of the three inputs to required to create user's wallet recovery key comes from the user. So you need to prompt the user to set a 6-digit Pin in your app. The pin entered by the user and the passphrase given by your server form the input parameters for activating the user.

```java
/**
    * Perform operation on clicking next
    */
   public void onNextClick(){
       if (mPinEditBox.getText() == null || mPinEditBox.getText().length() < 6){
           mPinTextInput.setError(getResources().getString(R.string.enter_six_digit_pin));
           return;
       }
       showLoader();
       OnSetUpUserFragmentListener mListener = (OnSetUpUserFragmentListener) getFragmentListener();
       mListener.onSetupUserSubmit(mPinEditBox.getText().toString());
   }
```

### Create UserPassphrase object 
Your app will create a UserPassphrase object which will contain user Id, user pin and `passphrasePrefix ` shown in below step.

```java
UserPassphrase UserPassphrase = new UserPassphrase(userId, pin, passphrasePrefix);
```


### Set expiryAfterInSecs and spendingLimitinWei

**expiryAfterInSecs** :  Recommended is 2 weeks you can choose to keep more or less.
**spendingLimitinWei** : Spending limit is the maximum number of tokens a user can spend in one transaction to be passed in Wei.  


### Calling `activateUser` workflow

Your app will call `activateUser` workflow using wallet SDK.  ActivateUser workflow with the input parameters from the step above.


**When to activate a user**

* User activation deploys three contracts for each user on OpenST side blockchain so this process takes several seconds.

* User activation is required before doing any wallet actions like executing transfers. Because of the time the process needs, it is recommended to avoid doing activation just before the first token transfer.

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
         OstSdk.activateUser(new UserPassphrase(userId, pin, passphrasePrefix), expiresAfterInSecs, spendingLimit,
                 userSetupFragment);
         userSetupFragment.flowStarted();
     }  
}
```

### Verify Activation Status

**Receiving callback calls**

1. **flowComplete**:  callback function will be called if the workflow is completed successfully. The workflow details and the updated entity will be received in the arguments. ostContextEntity will be updated user entity. Once you receive this updated user entity, it is recommended that your app communicates the updated user entity to your server which stores the user's token holder address with user info for further use. The user's updated status will be `ACTIVATED`.

```java
public void flowComplete(OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity) {
       String completeString = String.format("Workflow %s complete entity %s ",
               ostWorkflowContext.getWorkflow_type(), null == ostContextEntity ? "null" : ostContextEntity.getEntityType());
 
       Toast.makeText(OstSdk.getContext(), "Work Flow Successful", Toast.LENGTH_SHORT).show();
       ....
       ....
   }
```


2. **flowInterrupt**: callback function will be called if the workflow is failed because of some error. The workflow details and **OstError** object will be received in the arguments. The error details will be available in **OstError** object.

```java
@Override
    public void flowInterrupt(OstWorkflowContext ostWorkflowContext, OstError ostError) {
        String errorString = String.format("Work Flow %s Error: %s", ostWorkflowContext.getWorkflow_type(), ostError.getMessage());
        Toast.makeText(OstSdk.getContext(), errorString, Toast.LENGTH_SHORT).show();
        ...
        ...
    }
```

## Executing a `company-to-user` transaction


### Fetch the Rule details before executing transaction

#### Server Side

OpenST protocol includes Rules Contract and TokenRules Contract to enable you to define the behavior of token transfer and thus design custom Rules that align with your economy goals. OST has written one rule contract the PricerRule Contract  for you to use.

You can optionally choose to get information about Rules  by sending a GET to `/rules` endpoint. Alternatively the table below lists the two rules deployed with the rule names and rule parameters which are to be sent as input parameter for executing a transaction.



| Contract | Rule Name | Rule Parameter | Description |
|---|---|--|--|
|  |  |  |  |



### API call for executing the `company-to-user` transaction

A company to user transaction is executed from your server. Please refer API references for details on the input parameters. Sample code for executing a directTransfer is shown below.  

#### Server side 



```php
<?php
require 'vendor/autoload.php';
 
$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/';
 
// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;
 
$ostObj = new OSTSdk($params);
 
$transactionService = $ostObj->services->transactions;
 
$executeParams = array();
 
 
// Direct Branded Token Transfer
$executeParams['user_id'] = '724ed66c-8a0a-477e-b303-b0486e2a3797';
$executeParams['to'] = '0x64315ba1018307d6bc0380fa8eb8af210991ccbc';
$rawCallData = array();
$transferTo = array("0xc3B9B4A5c1997D73cd8d9D0fb95AA945e68e0496");
$transferAmount = array("10");
$rawCallData['method'] = 'directTransfers';
$rawCallData['parameters'] = array($transferTo, $transferAmount);
$metaPropererty['details']='this is test';
$metaPropererty['type']='company_to_user';
$metaPropererty['name']='download_download_';
$executeParams['meta_property']=$metaPropererty;
$executeParams['raw_calldata'] = json_encode($rawCallData);
$response = $transactionService->execute($executeParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);
 
?>
```

## Executing the `user-to-company` transaction via QRCode

### Generating QRCode for a transaction
For executing a transaction following inputs are required

* **tokenId**: This is the identifier of your Brand Token. Your app can fetch this information from your server. 
* **tokenHolderAddresses**: You can send Brand Tokens to multiple receivers in one call. You have to pass the token holder addresses of the receivers in an array. 
* **amounts**: Amount to be transferred corresponding to each tokenHolderAddresses in Wei.
* **ruleName**: One of two rule names listed above, which is to be executed.

When the end-user clicks to execute a transaction, a QR code should be generated with the specific format and display to the user on your web application. For a "Direct Transfer" the data format to prepare a QR code is shown below :

### Sample QRCode Data

```json
// Example : Direct Transfer
{
    "dd": "TX",
    "ddv": "1.0.0",
    "d": {
        "rn": "Direct Transfer",
        "ads": ["0x0hhd1", "0xc3B"],   //token holder addresses
        "ams": ["123", "124"],  //amounts
        "tid": "123"     //token_id
    }
}
```


### Mobile APP using Wallet SDK
Your app should be able to scan the QR code and pass the QRCode data in ostPerform workflow. ostPerform performs QRCode based workflows.

```java
OstSdk.ostPerform(userId, QRCodeData, this);
```

**ostPerform** workflow will then read the data and will call **verifyData** callback function to get the data verified from app. 

We will check if the **OstContextEntity** is **device** entity, if it is device entity then the QRCode data was meant for adding a new device. If the OstContextEntity is a JSON object then the QRCode data was meant to **execute a transaction.**

After successful verification of data, ostPerform workflow will call executeTransaction based on the data scanned from QRCode. 

```java
@Override
   public void verifyData(OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity, OstVerifyDataInterface ostVerifyDataInterface) {
       super.verifyData(ostWorkflowContext, ostContextEntity, ostVerifyDataInterface);
       JSONObject jsonObject;
       if (OstSdk.DEVICE.equalsIgnoreCase(ostContextEntity.getEntityType())) {
           jsonObject = ((OstDevice) ostContextEntity.getEntity()).getData();
       } else {
           jsonObject = (JSONObject) ostContextEntity.getEntity();
       }
 
       mVerifyDataView.setText(jsonObject.toString());
       getNextButton().setText(getString(R.string.authorize));
       getNextButton().setOnClickListener(new View.OnClickListener() {
           @Override
           public void onClick(View v) {
               ostVerifyDataInterface.dataVerified();
               getNextButton().setEnabled(false);
               showLoader();
           }
       });
   }
```

### Receiving transaction workflow status callbacks


1. **flowComplete**:  This callback function will be called if the workflow is completed successfully. The workflow details and the updated entity will be received in the arguments. When transaction is complete this function will receive transaction entity.

```java
public void flowComplete(OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity) {
        String completeString = String.format("Workflow %s complete entity %s ",
                ostWorkflowContext.getWorkflow_type(), null == ostContextEntity ? "null" : ostContextEntity.getEntityType());
 
        Toast.makeText(OstSdk.getContext(), "Work Flow Successful", Toast.LENGTH_SHORT).show();
        ....
        ....
    }
```

2. **flowInterrupt**:  The workflow details and OstError object will be received in the arguments. The error details will be available in OstError object. 

```java
@Override
    public void flowInterrupt(OstWorkflowContext ostWorkflowContext, OstError ostError) {
        String errorString = String.format("Work Flow %s Error: %s", ostWorkflowContext.getWorkflow_type(), ostError.getMessage());
        Toast.makeText(OstSdk.getContext(), errorString, Toast.LENGTH_SHORT).show();
        ...
        ...
    }
```


## Check user's balance

Balance and transaction APIs offer the functionality to view into a chosen user’s activity and resulting balances.  Send a GET to `/users/{user_id}/balance` to fetch user's balance

### Server side

```php
<?php
require 'vendor/autoload.php';
 
$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/'';
 
// The config field is optional
$configParams = array();
// This is the timeout in seconds for which the socket connection will remain open
$configParams["timeout"] = 15;
$params["config"] = $configParams;
 
$ostObj = new OSTSdk($params);
 
$balanceService = $ostObj->services->balances;
 
$getParams = array();
$getParams['user_id'] = '10543373-5eb5-4dce-8fac-dff38ba941ba';
$response = $balanceService->get($getParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);
 
?>
```