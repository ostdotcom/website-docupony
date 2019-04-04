---
id: execute_transaction
title: Execute Transaction Guide
sidebar_label: Execute Transaction
---

> ## Table of contents

| S. No. | Section  |
|---|---|
| 1  | [Types Of Transactions](#types-of-transactions)  |
| 2  | [atto Conversions (OST to atto OST, BT to atto BT, USD to atto USD)](#conversions-to-atto)  |
| 3  | [Rules Contract](#rules-contract)  |
| 4  | [Generating QRCode with Transaction Data](#generating-qrcode-with-transaction-data)  |
| 5  | [Executing company-to-user Transactions](#executing-company-to-user-transactions)  |
| 6  | [Executing `user` intiated transactions](#executing-user-initiated-transactions) |



<br>

> ## Types Of Transactions
There are 2 different types of transaction possible in an economy based on the type of sender and receiver.

| Type Of Transaction | Description |
|---|---|
| **company-to-user Transaction** | It is the transaction where the client company is the sender and the economy user is the receiver. <br>**To do company-to-user transactions, you will have to use Server Side SDK (available in [PHP](/platform/docs/sdk/server_sdk_setup/php//), [Ruby](/platform/docs/sdk/server_sdk_setup/ruby/), [Node.js](/platform/docs/sdk/server_sdk_setup/nodejs/), [Java](/platform/docs/sdk/server_sdk_setup/java/)).** |
| **user initiated Transaction** | It is the transaction where the economy user is the sender and another economy user or company is the receiver. <br> **Wallet SDK (available in [Android](/platform/docs/wallet_sdk_setup/android/) and [iOS](/platform/docs/wallet_sdk_setup/iOS/)) facilitates signing of transactions on users behalf.** |



<br>

> ## Conversions to atto:

atto is the smallest denomination used in OST Platform. OST Platform API and SDK accept value in `atto`, so it is important to understand the conversions to `atto`.

**You need to multiply any currency with 10^18 to convert it into its atto denomination.**


### Converting `Brand Token` to  `atto Brand Token`
To convert `brand token` into `atto brand token`, we will have to multiply amount of brand token with 10^18.

Example: 10 Brand Token = 10 * (10^18) atto Brand Token.

### Converting `USD` to `atto USD`
To convert `USD` into `atto USD`, we will have to multiply the USD amount with 10^18.

Example: 25 USD = 25*10^18 atto USD.

### Converting `OST` to `atto OST`
To convert `OST` into `atto OST`, we will have to multiply the OST amount with 10^18.

Example: 7 OST = 7*10^18 atto OST.



<br>

> ## Rules Contract
OpenST Protocol includes **Rules Contract** and **TokenRules Contract** to enable you to define the behavior of token transfer and thus design custom Rules that align with your economy goals. OST has written one rule contract, the PricerRule Contract, for you to use.

You can optionally choose to get information about Rules  by sending a GET to `/rules` endpoint. Alternatively the table below lists the two rules deployed with the rule names and rule parameters which are to be sent as input parameter for executing a transaction.


1. **Direct Transfer**: `directTransfers` is a method that enables a user or a company to directly transfer Brand Tokens to a beneficiary. 
<br>

### `directTransfers` Method Parameters

| Rule Method | Method Inputs | Inputs Description |
|---|---|---|
|  **directTransfers**  |  |  |
|  | **transfersTo** <br> **Array of Address**   | Array of  **TokenHolder**  addresses. |
|  | **transfersAmount** <br> **Array of amounts in atto** | Array of **amounts in [atto Brand Token](#converting-brand-token-to-atto-brand-token)** that are to be transfered to the addresses listed in **transfersTo** array. These amounts should be in the same sequence as the addresses in **transfersTo** array are. <br> Example: <br> **transfersTo** = [address1, address2, address3] <br> **transfersAmount** = [amount1, amount2, amount3] <br> <br> `address1` will get the `amount1`, `address2` will get the `amount2` and `address3` will get the `amount3` |


<br>

2. **Pricer**: `PricerRule` Contract can be used to transfer an amount of brand tokens based on fiat amount. You will have to specify the fiat currency code and the amount in fiat currency. This amount will then be converted into brand token and then the transfer will happen in brand token.


### `pay` Method Parameters
| Rule Method | Method Inputs | Inputs Description |
|---|---|---|
|  **pay**  |  |  |
|  | **from** <br> **Address**   | Transaction executor's address |
|  | **toList** <br> **Array of addresses** | Array of receiver's  **TokenHolder**  address. |
|  | **amountList** <br> **Array of amounts in atto** | Array of **amounts in [atto USD](#converting-usd-to-atto-usd)** that are to be transfered to the addresses listed in **toList** array. These amounts should be in the same sequence as the addresses in **toList** array are. <br> Example: <br> **transfersTo** = [address1, address2, address3] <br> **transfersAmount** = [amount1, amount2, amount3] <br> <br> `address1` will get the `amount1`, `address2` will get the `amount2` and `address3` will get the `amount3` |
|  | **payCurrencyCode** <br> **String** | Pay Currency code. It's possible value for now will be `USD`.  |
|  | **baseCurrencyIntendedPrice** <br> **Integer** | This is the pay currency(USD) value in atto USD for 1 OST. <br> Example: 1 OST = 0.5 USD <br> 0.5 USD = 0.5 * 10^18 atto USD = 5*10^17 atto USD   |


<br>

> ## Generating QRCode with Transaction Data
To enable transaction execution from web application we have supported QRCodes. For different operations there is a different QRCode data definition. 

QRCode can be generated using transaction information which then can be scanned by your mobile application. The mobile application will then execute the transaction using the QRCode data. 
 

The QRCode data for executing transactions via web application should be a JSON object with the following format.  

| **Property**  | **Description**  |   |
|---|---|---|
| **dd** <br> **String** | Data Definition. Its value will be `TX` since the QRCode is meant for transactions.  |   |
| **ddv** <br> **String**  | Data Definition Version. Current version is `1.0.0`  |   |
|  **d** <br> **JSON Object** |   |   |
|   | **Property**  | **Description** |
|   | **rn**  <br> **String** | Rule Name. It can take 1 of the 2 values: <br> 1. `Direct Transfer`<br> 2. `Pricer` |
|   | **ads**  <br> **Array** | Array of receiver's  **TokenHolder**  Addresses. |
|   | **ams**  <br> **Array** | Array of amounts in atto to be transferred. These amounts should be in the same sequence as the **ads** addresses are. These amounts should be in atto.  |
|   | **tid**  <br> **String** | token_id of your Brand Token. |

<br>

> Example JSON data for QRCode. The amounts are in atto. [Wei conversions](/platform/docs/guides/execute_transaction/#wei-conversions) are explained in [next section](/platform/docs/guides/execute_transaction/#wei-conversions).

```js
// Direct Transfer JSON data used to generate QRCode
{
    "dd": "TX", // Data Definition
    "ddv": "1.0.0", // Data Definition Version
    "d": {
        "rn": "Direct Transfer", // Rule Name
        "ads": ["0x0hhd1.....", "0xc3B......"],   // Array of receiver's  **TokenHolder**  Addresses
        "ams": ["1000000000000000000000", "100000000000000000000000"],  // Array of amounts in atto (In the same squence as the addresses in "ams" array are. 
        "tid": "123"     // token_id of your Brand Token
    }
}
```



<br>


> ## Executing company-to-user Transactions
`company-to-user` transactions can be executed using using Server Side SDK (available in [PHP](/platform/docs/sdk/server_sdk_setup/php//), [Java](/platform/docs/sdk/server_sdk_setup/java/), [Node.js](/platform/docs/sdk/server_sdk_setup/nodejs/), [Ruby](/platform/docs/sdk/server_sdk_setup/ruby/)). 

Please refer API references for details on the [input parameters of execute company-to-user transaction](/platform/docs/api/#execute-a-transaction). 



Sample code for executing a `directTransfer` is shown below.

Brand token to transfer: 10 Brand Token

Converting `Brand token` to `atto Brand Token` = `10 *10^18` = `10^19` atto Brand Token



```php
<?php
require 'vendor/autoload.php';
 
$params = array();
$params['apiKey']='65e20fcfce72f4c34546338a70518478';
$params['apiSecret']='f07f94340ab66045634d7505385a53e4ed12f7d9792a40798f60fa9a95adb3e0';
$params['apiBaseUrl']='https://api.ost.com/testnet/v2/';
 
$ostObj = new OSTSdk($params);
 
$transactionService = $ostObj->services->transactions;
 
$executeParams = array();
 
 
// Direct Brand Token Transfer

$executeParams = array(
    'user_id' => '724ed66c-8a0a-477e-b303-b0486e2a3797',
    'to' => '0x64315ba1018307d6bc0380fa8eb8af210991ccbc',

    
    'raw_calldata' => json_encode(array(
        'method' => 'directTransfers',

        // These are method parameters in rule contract
        'parameters' => array(
            // First array is of receiver's  **TokenHolder**  addresses 
            array("0xc3B9B4A5c1997D73cd8d9D0fb95AA945e68e0496"),
            
            // Second array is of receiver's amounts in atto 
            // (10 Brand Token = 10^19 atto)
            array("10000000000000000000")
        );
    )),

    'meta_property' => array(
        'details' => 'this is test',
        'type' => 'company_to_user',
        'name' => 'download'
    ),
)

$response = $transactionService->execute($executeParams)->wait();
echo json_encode($response, JSON_PRETTY_PRINT);
 
?>
```






> ## Executing `user` initiated transactions
* `User` initiated transactions need to be signed by the user's device keys. 

* User's device keys are created and stored in their mobile device. So, user initiated transactions (`user-to-company`, `user-to-user`) need to be executed in the mobile app using wallet SDK (available for Android and iOS).

* To execute the transaction using wallet SDK, you will have to use `executeTransaction` workflow. 



> ## Executing `user` intiated transactions in web.

To execute the `user` initiated transactions in web, you will have to create QRCode with transaction data and then you need to build a QRCode scanner in your app to scan it. After scanning the QRCode, your application will have the transaction data. As a last step, you need to pass the transaction data to `performQRAction` workflow using wallet SDK.

1. Generate QRCode with transaction data.
2. Scan QRCode with mobile app.
3. Call `performQRAction` workflow in mobile app.

<br>
### 1. Generate QRCode with transaction data.

To generate QRCode with transaction data follow the steps expained in [above section.](#generating-qrcode-with-transaction-data) 

**Sample QRCode Data**

```js
// Direct Transfer JSON data used to generate QRCode
{
    "dd": "TX", // Data Definition
    "ddv": "1.0.0", // Data Definition Version
    "d": {
        "rn": "Direct Transfer", // Rule Name
        "ads": ["0x0hhd1.....", "0xc3B......"],   // Array of receiver's  **TokenHolder**  Addresses
        "ams": ["1000000000000000000000", "100000000000000000000000"],  // Array of amounts in atto (In the same squence as the addresses in "ams" array are. 
        "tid": "123"     // token_id of your Brand Token
    }
}
```

<br>

### 2. Scan QRCode with mobile app.
You need to provide functionality to scan a QRCode. You can use 3rd party libraries to create the QRCode scanner.

**Android 3rd party libraries to scan QRCode**

* https://github.com/zxing/zxing

* Sample implementation: https://github.com/dm77/barcodescanner#simple-usage


**iOS QRCode reader (iOS Native) API**

* https://developer.apple.com/documentation/coreimage/cidetector

* https://developer.apple.com/documentation/coreimage/cidetectortypeqrcode?language=objc


<br>

### 3. Call `performQRAction` workflow in mobile app.
After scanning the QRCode, mobile app should pass this QRCode data to `performQRAction` workflow.

**Sample Android Wallet SDK Code**

```java
OstWalletSdk.performQRAction(userId, QRCodeData, this);
```

* `performQRAction` workflow will then read the data and will call `verifyData` callback function.

* You will get the transaction data as one of the argument of `verifyData` with name `ostContextEntity`.

Arguments of verifyData (Android Wallet SDK Example)

```java
public void verifyData(OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity, OstVerifyDataInterface ostVerifyDataInterface)
```

* Now you can verify this information with your app user.

* To successfully verify this information, call the `ostVerifyDataInterface.dataVerified()`.

* To cancel the workflow call the `ostVerifyDataInterface.cancelFlow()`.


**After successful verification of data, `performQRAction` workflow will call `executeTransaction` using the data scanned from the QRCode. You don't have to call `executeTransaction` separately.**

Sample verifyData code (Android Wallet SDK)
```java
@Override
   public void verifyData(OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity, OstVerifyDataInterface ostVerifyDataInterface) {
       super.verifyData(ostWorkflowContext, ostContextEntity, ostVerifyDataInterface);
       JSONObject jsonObject;
       
       if (OstWalletSdk.DEVICE.equalsIgnoreCase(ostContextEntity.getEntityType())) {
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
           }
       });
   }
```

### Verify Transaction Status

#### Receiving `performQRAction` workflow status callbacks
There is a list of methods available as [interface](/platform/docs/sdk/references/wallet_sdk/android/latest/interfaces/) (in [Android wallet SDK](/platform/docs/wallet_sdk_setup/android/)) and as [protocol](/platform/docs/sdk/references/wallet_sdk/iOS/latest/protocols/) (in [iOS wallet SDK](/platform/docs/wallet_sdk_setup/iOS/)) for communication between mobile app and Wallet SDK. 


To show you an example, we will just implement 2 functions to get the workflow status.


1. **flowComplete**:  This callback function will be called if the workflow is completed successfully. The workflow details and the updated entity will be received in the arguments. When the transaction is complete, this function will receive the transaction entity.

Sample code (Android Wallet SDK)
```java
public void flowComplete(OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity) {
        String completeString = String.format("Workflow %s complete entity %s ",
                ostWorkflowContext.getWorkflow_type(), null == ostContextEntity ? "null" : ostContextEntity.getEntityType());
 
        Toast.makeText(OstWalletSdk.getContext(), "Work Flow Successful", Toast.LENGTH_SHORT).show();
        ....
        ....
    }
```

2. **flowInterrupt**:  The workflow details and OstError object will be received in the arguments. The error details will be available in OstError object. 

Sample code (Android Wallet SDK)
```java
@Override
    public void flowInterrupt(OstWorkflowContext ostWorkflowContext, OstError ostError) {
        String errorString = String.format("Work Flow %s Error: %s", ostWorkflowContext.getWorkflow_type(), ostError.getMessage());
        Toast.makeText(OstWalletSdk.getContext(), errorString, Toast.LENGTH_SHORT).show();
        ...
        ...
    }
```
