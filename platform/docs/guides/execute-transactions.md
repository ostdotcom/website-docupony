---
id: execute-transactions
title: Technical Guide to Executing Transactions
sidebar_label: Execute Transactions
---

1. Owner/device key is created on the user's mobile device. The OST Wallet SDK uses standard web3 libraries to generate the public-private key pairs on the device
2. The private key in each pair is encrypted and stored on device. A MultiSig contract is deployed on the blockchain. The public addresses from device keys generated on the user's device(s) are set as owners for the MultiSig.
3. A TokenHolder contract is deployed on the blockchain. The MultiSig controls the TokenHolder contract, as its owner.
4. A sessionKey is created on the user's device and is authorized by device key in TokenHolder
5. Whenever a user does an action which triggers a token transfer a message signed by an authorized sessionKey is sent from the user's device to the user's TokenHolder contract
6. The TokenHolder contract verifies that the request is initiated by an authorized sessionKey and executes the transfer

:::warning atto denomination
atto is the smallest denomination used in OST Platform. OST Platform APIs and SDKs accept value in `atto`, so it is important to understand the conversions to `atto`. 

**To convert a standard amount to its atto denomination, multiply the amount by 10^18**
:::

| Conversion | Example | 
| --- | --- |
| `Token` --> `atto Token`, multiply amount of Token by 10^18 | 10 Token = 10*10^18 atto Token |
| `USD` --> `atto USD`, multiply amount of USD by 10^18 | 25 USD = 25*10^18 atto USD |
| `OST` --> `atto OST`, multiply amount of OST by 10^18 | 76 OST = 76*10^18 atto OST |


## Executing a Token Transfer
Each transaction is defined by a **Rules** Contract. OST Platform, through the OpenST Protocol, includes a ****Rules** Contract and **TokenRules** Contract to enable you to define the behavior of token transfers and design custom rules that align with your goals. OST has written one **Rules** Contract, the **PricerRule** Contract, for you to use. This allows you (and your end-users) to send an amount in fiat (EUR, GBP, or USD). The equivalent amount of Tokens is calculated and sent.

![TransactionsExplained2](/platform/docs/assets/transactions_explained_2.png)

:::tip GET `/rules` endpoint
You can choose to get information about rules by sending a GET to `/rules` endpoint.
:::

The sections below lists the two rules deployed with the rule names and rule parameters which are to be sent as input parameter for executing a transaction.

## Direct Transfers (Transfers in Token amounts)
`directTransfers` is a method that enables a user or a company to directly transfer Tokens to a beneficiary. 

### `directTransfers` Method Parameters

| Parameter Name | Parameter Description |
|---|---|
| **transferToAddresses** <br> **Array of Address**   | Array of receivers TokenHolder  addresses |
| **transferAmountsinAtto** <br> **Array of amounts in atto** | Array of **amounts in [atto Token](#converting-brand-token-to-atto-brand-token)** that are to be transferred to the addresses listed in **transferToAddresses** array. These amounts should be in the same sequence as the addresses in **transferToAddresses** array are. <br> Example: <br> **transferToAddresses** = [address1, address2, address3] <br> **transfersAmount** = [amount1, amount2, amount3] <br> <br> `address-1` will get the `amount-1`, `address-2` will get the `amount-2` and `address-3` will get the `amount-3` |

## **PricerRule** Transfers (Transfers in Fiat amounts)
`pay` OR " **PricerRule**" transfers can be used to transfer an amount of Tokens based on fiat amount (in EUR, GBP or USD). You will have to specify the fiat currency code and the amount in fiat currency. This amount will then be converted into Token amount and the Tokens transferred.

### `pay` Method Parameters
| Parameter Name | Parameter Description |
|---|---|
|**fromTokenHolderAddress** <br> **Address**  | Transaction executors TokenHolder address |
|**transferToAddresses** <br> **Array of addresses** | Array of receivers  TokenHolder  address |
|**transferAmountsinAtto** <br> **Array of amounts in atto** | Array of **amounts in [atto USD](#converting-usd-to-atto-usd)** that are to be transferred to the addresses listed in **transferToAddresses** array. These amounts should be in the same sequence as the addresses in **toList** array are. <br> Example: <br> **transfersTo** = [address1, address2, address3] <br> **transferAmountsinAtto** = [amount1, amount2, amount3] <br> <br> `address1` will get the `amount1`, `address2` will get the `amount2` and `address3` will get the `amount3` |
|**payCurrencyCode** <br> **String** | Pay Currency code. It's possible values are `EUR`, `GBP`, and `USD`.  |
|**attoUSDIntendedPrice** <br> **Integer** | This is intended conversion of OST to pay currency (in atto denomination) which is USD in this example. This value will be used to calculate the deviation from actual conversion rate at the time of execution of transaction. If this deviation is more than the threshold value ($1), the transaction will be cancelled. This is to avoid transactions from happening during high deviation periods. This is the pay currency (USD) value in atto USD for 1 OST. <br> Example: 1 OST = 0.5 USD <br> 0.5 USD = 0.5 * 10^18 atto USD = 5*10^17 atto USD   |

## Generating QRCode with Transaction Data
To enable transaction execution from web applications we have supported QRCodes. For different operations there is a different QRCode data definition. 

QRCode can be generated using transaction information which can then be scanned by the users mobile application (integrated with OST Wallet SDK). The users mobile application (wallet) will then execute the transaction using the QRCode data. 
 
The QRCode data for executing transactions via web applications should be a JSON object with the following format.  

| **Property**  | **Description**  | 
|---|---|
| **dd** <br> **String** | Data definition. Its value will be `TX` since the QRCode is meant for transactions.|
| **ddv** <br> **String**  | Data definition version. Current version is `1.0.0` |
|  **d** <br> **JSON Object** |  Array of data properties |
| { |   |
|  **rn**  <br> **String** | Rule Name. It can take 1 of the 2 values: <br> 1. `Direct Transfer`<br> 2. `Pricer` |
|  **ads**  <br> **Array** | Array of receiver's TokenHolder Addresses |
|  **ams**  <br> **Array** | Array of amounts in atto to be transferred. These amounts should be in the same sequence as the **ads** addresses are. These amounts should be in atto.  |
|  **tid**  <br> **String** | token_id of your Token |
|  **o**  <br> **String** | Array of options |
|   { |   |
|  **cs**  | Currency Symbol | 
|  **s**  | Currency Sign | 
|   } |   |
| } |   |
|  **m** <br> **JSON Object** |  Array of meta properties | 
| { |   |
|  **tn**  | Name. Only numbers, alphabets, spaces, "-" and "_" are allowed. Max length is 25 characters. |  
|  **tt**  | Type. String representing the type of transaction. It can have one of the following value: user_to_user, company_to_user and user_to_company. |
|  **td**  | Details. String value having some extra information about transaction. Max length is 120 characters. |
| } |   |

### Example JSON data for QRCode

:::note The amounts are in atto 
[Wei conversions](/platform/docs/guides/execute-transactions/#wei-conversions) are explained in [next section](/platform/docs/guides/execute-transactions/#wei-conversions)
:::

```js
// Direct Transfer JSON data used to generate QRCode
{
    "dd": "TX",   // Data definition
    "ddv": "1.0.0",   // Data definition version
    "d":{   // Data
        "rn": "Direct Transfer",   // Rule Name
        "ads": ["0x0hhd1.....", "0xc3B......"],   // Array of receiver's TokenHolder Addresses
        "ams": ["1000000000000000000000", "100000000000000000000000"],   // Array of amounts in atto (In the same squence as the addresses in "ads" array are.)
        "tid": "1234",   // token_id of your Token
        "o":{   /// Options
            "cs":"USD",   // Currency symbol
            "s":"$"   /// Sign
            }
        },
    "m":{   // Meta properties
        "tn": "metaname1",   // Name
        "tt": "user_to_company",    // Type: can be either user_to_company or user_to_user
        "td": "detail s3 ios"   // Details
        }
}
```


## Executing company-to-user Transactions
`company-to-user` transactions can be executed using Server Side SDK (available in [PHP](/platform/docs/sdk/server-side-sdks/php/), [Java](/platform/docs/sdk/server-side-sdks/java/), [Node.js](/platform/docs/sdk/server-side-sdks/nodejs/), [Ruby](/platform/docs/sdk/server-side-sdks/ruby/)). 

Please refer to API References for details on the [input parameters of execute company-to-user transaction](/platform/docs/api/#execute-a-transaction). 

Sample code for executing a `directTransfer` is shown below.

Token to transfer: 10 Token

Converting `Token` to `atto Token` = `10 *10^18` = `10^19` atto Token

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
 
// Direct Token Transfer

$executeParams = array(
    'user_id' => '724ed66c-8a0a-477e-b303-b0486e2a3797',
    'to' => '0x64315ba1018307d6bc0380fa8eb8af210991ccbc',

    
    'raw_calldata' => json_encode(array(
        'method' => 'directTransfers',

        // These are method parameters in rule contract
        'parameters' => array(
            // First array is of receiver's  TokenHolder  addresses 
            array("0xc3B9B4A5c1997D73cd8d9D0fb95AA945e68e0496"),
            
            // Second array is of receiver's amounts in atto 
            // (10 Token = 10^19 atto)
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

## Executing `user` initiated transactions
* `User` initiated transactions need to be signed by the user's device keys
* User's device keys are created and stored in their mobile device. So, user initiated transactions (`user-to-company`, `user-to-user`) need to be executed in the mobile app using Wallet SDK (available for Android and iOS).
* To execute the transaction using Wallet SDK, you will have to use `executeTransaction` workflow. 

## Executing `user` initiated transactions in web

To execute `user` initiated transactions in web, you will have to create QRCode with transaction data and then you need to build a QRCode scanner in your app to scan it. After scanning the QRCode, your application will have the transaction data. As a last step, you need to pass the transaction data to `performQRAction` workflow using OST Wallet SDK.

1. Generate QRCode with transaction data
2. Scan QRCode with mobile app
3. Call `performQRAction` workflow in mobile app

### 1. Generate QRCode with transaction data

To generate QRCode with transaction data follow the steps explained in the [above section.](#generating-qrcode-with-transaction-data)

**Sample QRCode Data**

```js
// Direct Transfer JSON data used to generate QRCode
{
    "dd": "TX",   // Data definition
    "ddv": "1.0.0",   // Data definition version
    "d":{
        "rn": "Direct Transfer",   // Rule Name
        "ads": ["0x0hhd1.....", "0xc3B......"],   // Array of receiver's  TokenHolder  Addresses
        "ams": ["1000000000000000000000", "100000000000000000000000"],   // Array of amounts in atto (In the same squence as the addresses in "ads" array are.) 
        "tid": "1234"   // token_id of your Token
        "o":{   /// Options
            "cs":"USD",   // Currency symbol
            "s":"$"   /// Sign
            }
        },   
    "m":{   // Meta properties
        "tn": "metaname1",   // name
        "tt": "user_to_company",    // type: can be either user_to_company or user_to_user
        "td": "detail s3 ios"   // details
        }
}
```

### 2. Scan QRCode with mobile app
You need to provide functionality to scan a QRCode. You can use 3rd party libraries to create the QRCode scanner.

**Android 3rd party libraries to scan QRCode**
* https://github.com/zxing/zxing
* Sample implementation: https://github.com/dm77/barcodescanner#simple-usage

**iOS QRCode reader (iOS Native) API**
* https://developer.apple.com/documentation/coreimage/cidetector
* https://developer.apple.com/documentation/coreimage/cidetectortypeqrcode?language=objc

### 3. Call `performQRAction` workflow in mobile app
After scanning the QRCode, mobile app should pass this QRCode data to `performQRAction` workflow.

**Sample Android Wallet SDK Code**

```java
OstWalletSdk.performQRAction(userId, QRCodeData, this);
```

* `performQRAction` workflow will then read the data and will call `verifyData` callback function
* You will get the transaction data as one of the arguments of `verifyData` with name `ostContextEntity`

Arguments of verifyData (Android Wallet SDK Example)

```java
public void verifyData(OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity, OstVerifyDataInterface ostVerifyDataInterface)
```

* Now you can verify this information with your app user
* To successfully verify this information, call the `ostVerifyDataInterface.dataVerified()`
* To cancel the workflow call the `ostVerifyDataInterface.cancelFlow()`

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
There is a list of methods available as [interface](/platform/docs/sdk/mobile-wallet-sdks/android/latest/interfaces/) (in [Android Wallet SDK](/platform/docs/sdk/mobile-wallet-sdks/android/)) and as [protocol](/platform/docs/sdk/mobile-wallet-sdks/iOS/latest/protocols/) (in [iOS Wallet SDK](/platform/docs/sdk/mobile-wallet-sdks/iOS)) for communication between mobile app and OST Wallet SDK. 

To show you an example, we will just implement 2 functions to get the workflow status.

1. **flowComplete**:  This callback function will be called if the workflow is completed successfully. The workflow details and the updated entity will be received in the arguments. When the transaction is complete, this function will receive the transaction entity.

Sample code (Android Wallet SDK)
```java
public void flowComplete(OstWorkflowContext ostWorkflowContext, OstContextEntity ostContextEntity) {
        String completeString = String.format("Workflow %s complete entity %s ",
                ostWorkflowContext.getWorkflow_type(), null == ostContextEntity ? "null": ostContextEntity.getEntityType());
 
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