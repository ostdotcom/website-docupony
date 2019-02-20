---
id: installation
title: Installation
sidebar_label: Installation
---


## Installing SDK

To install the SDK run the following command <br>

### Installing composer
> curl -sS https://getcomposer.org/installer | php

### Install the latest stable version of the SDK:
> php composer.phar require ostdotcom/ost-kyc-sdk-php


## Initializing SDK

```
require 'vendor/autoload.php';

$params = array();
$params['apiKey']='API_KEY';
$params['apiSecret']='API_SECRET';
$params['apiBaseUrl']='API_BASE_URL';

// The config field is optional for $ostKycSdkObj Object
$nestedparams = array();
// This is the timeout in seconds for which the socket connection will remain open
$nestedparams["timeout"] = 15;
$params["config"] = $nestedparams;

$ostKycSdkObj = new OSTKYCSDK($params);

```

### Initialization parameters

|   Name             |  Type  | Notes   |
|--------------------|--------|---------|
|   API key          |  string      | You can find this key in settings of KYC dashboard        |
|   API Secret key   |  string      | You can find this key in settings of KYC dashboard        |
|   API base URL     |  string      | For sandbox environment base URL will be: `https://kyc.sandboxost.com`     <br><br>   For production environment base URL will be: `https://kyc.ost.com`|
|   Config           |  Dict      |  You can pass timeout with key as "timeout" and value as number (Will be considered as seconds) for http requests that SDK will make Ex: `config: {"timeout": 10}`    |
