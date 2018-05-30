---
id: version-1.0.0-sdk_php
title: PHP SDK Quick Start Guide
sidebar_label: PHP SDK Quick Start Guide
original_id: sdk_php
---

The [<u>OST PHP SDK</u>](https://github.com/OpenSTFoundation/ost-sdk-php/tree/v1.0.0) is a PHP wrapper for the OST Developers API. This Quick Start Guide will show you how to use the OST PHP SDK to create users, airdrop tokens to those users, create actions, and execute one of those actions.


### Prerequisites

To use the SDK, developers will need to:

1. Sign-up on [<u>https://kit.ost.com</u>](https://kit.ost.com).
2. Launch a branded token economy with OST KIT⍺. You can see a step by step guide [<u>here</u>](/docs/kit_overview.html).
3. Obtain an API Key and API Secret from the OST KIT⍺ [<u>Developer API Console</u>](https://kit.ost.com/developer-api-console):

![API Credentials](assets/Developer_section.jpg)

### Install ost-sdk-php

Make sure PHP composer is installed to run php commands from the Terminal. Once the installation is done and the API Key and Secret are obtained, install the latest version of the SDK.

From your terminal window, enter:

```bash
$ curl -sS https://getcomposer.org/installer | php   #installs the php composer
$ php composer.phar require ostdotcom/ost-sdk-php    #installs the latest stable version of the SDK
```

If you would like to work on an interactive shell, command 'php -a' usually works on mac systems. So to initiate the interactive environment type:

```bash
$ php -a
```

Require the module to use it in your application, we require it in command line:

```php
> require 'vendor/autoload.php';
```

### Set Variables

Set the following variables and initialize the SDK object for convenience:

```php
$params = array();
$params['apiKey']='6078017455d8be7d9f07'; // replace with the API Key you obtained earlier
$params['apiSecret']='f32a333d82ba73a9db406afb4dbcfdc51cd36ccb742770276d6c4155783ca8d0'; // replace with the API Secret you obtained earlier
$params['apiBaseUrl']='https://sandboxapi.ost.com/v1/';

$ostObj = new OSTSdk($params);
```

### Create Jaimme and Jack

Initialize a Users object to perform user specific actions, like creating users:

```php
> $userService = $ostObj->services->users;
```

Create users:

```php
// following code returns object containing Jaimme's ID , among other information, which you will need later
$createUserParams = array();
$createUserParams['name'] = 'Jaimme';
$response = $userService->create($createUserParams)->wait();
var_dump($response);

// following code returns object containing Jack's ID , among other information, which you will need later
$createUserParams = array();
$createUserParams['name'] = 'Jack';
$response = $userService->create($createUserParams)->wait();
var_dump($response);
```

### Airdrop Tokens to Jaimme and Jack

Newly created users do not have any tokens; but you can airdrop tokens to them so that they can participate in your branded token economy.

Initialize an Airdrop Object to execute an airdrop, get airdrop status and list airdrops:  

```php
$airdropService = $ostObj->services->airdrops;
```

Execute an airdrop to one or many users, by using their user IDs returned when creating users:

```php
//airdrops 5 BT to both users passed in user_ids field.
$airdropParams = array();
$airdropParams['airdropped'] = 'false';
$airdropParams['amount'] = '5';
$airdropParams['user_ids'] = 'e979c365-99f5-4589-84bb-93d9345a7816,1c25552b-7f6a-495c-95e5-646e4da07820';
$response = $airdropService->execute($airdropParams)->wait();
var_dump($response);

```

Airdropping involves several asynchronous steps and you can use the airdrop IDs of the returned airdrop object to check its status:

```php
// returns object with "steps_complete"=>["users_identified", "tokens_transfered", "contract_approved", "allocation_done"]
$getairdropStatusParams = array();
$getairdropStatusParams['id'] = 'baf86567-71b3-474f-9786-0b785b77062d'; // the airdrop ID will differ
$response = $airdropService->get($getairdropStatusParams)->wait();
var_dump($response);

```

### Create a Purchase Action

You can create named actions with defined values that are between users or between a user and your company. For instance, to make a "Purchase" action for your branded token between users, that is priced in Branded Token, first initialize an action object:

```php
$actionService = $ostObj->services->actions;
```
Now create a new action called 'Purchase'. We've opted to set 'arbitrary_amount' to 'true' for this action. So the amount will be set at the time of executing the action and not during creation.

```php
$createParams = array();
$createParams['name'] = 'Purchase';
$createParams['kind'] = 'user_to_user';
$createParams['currency'] = 'TEST';
$createParams['arbitrary_amount'] = 'true';
$createParams['commission_percent'] = '5';
$response = $actionService->create($createParams)->wait();
var_dump($response);
```

To understand more about how to use arbitrary amounts for action checkout the [<u>action documentation.</u>](/docs/api_actions_create.html) 

### Jaimme makes a Purchase from Jack

Now that you've created a Purchase action, funded Jack and Jaimme with airdropped tokens, you can execute a Purchase action between Jaimme and Jack.

To execute the Purchase action, you will need Jaimme and Jack's IDs and the action ID. The user ID are returned when you created Jaimme and Jack. However, you can get them again by retrieving the list of users:

```php
// returns object that includes the list of users
// fetch IDs for Jaimme and Jack
$listUserParams = array();
$response = $userService->getList($listUserParams)->wait();
var_dump($response);
```
_Note: OST KIT⍺ does not place a uniqueness constraint on user names_

You can use filters on specific fields in the user object to further refine your users list. For further infomation please refer [<u>List Users API</u>](/docs/api_users_list.html) 

To retrieve the action ID, list the actions object as follows:

```php
$listParams = array();
$response = $actionService->getList($listParams)->wait();
var_dump($response);
```

And now inititalize a transactions object to make a purchase:

```php
$transactionService = $ostObj->services->transactions;
```

To make a purchase between Jaimme and Jack, use the users IDs and the action ID as follows:

```php
// returns object with ID of executed transaction
$executeParams = array();
// the IDs of your users Jaimme and Jack and the "Purchase" action will differ
$executeParams['from_user_id'] = 'e979c365-99f5-4589-84bb-93d9345a7816';
$executeParams['to_user_id'] = '1c25552b-7f6a-495c-95e5-646e4da07820';
$executeParams['action_id'] = '23047';
$executeParams['amount'] = '2';
$response = $transactionService->execute($executeParams)->wait();
var_dump($response);
```

You can query for the status of the purchase transaction in a couple of ways.
You can get the status of the specific transaction with its ID:

```php
$getParams = array();
$getParams['id'] = '9524c215-aa99-45a2-80f5-7a4f0a8c3228'; // the ID of your executed transaction will differ 
$response = $transactionService->get($getParams)->wait();
var_dump($response);

```

Or you can get the list of all transactions. For all list APIs you can use filters on specific fields in the object to further refine your lists. As an example below we set 'limit' as '15' to get 15 instances of transaction objects in one list transactions request:

```php
$listParams = array();
$listParams['limit'] = '15';
$response = $transactionService->getList($listParams)->wait();
var_dump($response);
```

There is much more that you can do with OST KIT APIs. Read through the detailed API Reference [<u>here</u>](/docs/api.html).

>_last updated 30 May 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2
