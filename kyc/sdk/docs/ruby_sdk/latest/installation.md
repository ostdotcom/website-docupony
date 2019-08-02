---
id: installation
title: Installation
sidebar_label: Installation
---

## Installing SDK

To install the SDK run the following command <br>

> gem install ost-kyc-sdk-ruby


## Initializing SDK

```
require('ost-kyc-sdk-ruby')

# The timeout in the config is the timeout in seconds for which the socket connection will remain open
CONFIG = {timeout: 10}

ost_kyc_sdk = OstKycSdkRuby::Saas::Services.new({
    api_key: 'Your API key', 
    api_secret: 'Your API Secret', 
    api_base_url: 'API base URL', 
    config: CONFIG})

```

### Initialization parameters

|   Name             |  Type  | Notes   |
|--------------------|--------|---------|
|   API key          |  string      | You can find this key in settings of KYC dashboard        |
|   API Secret key   |  string      | You can find this key in settings of KYC dashboard        |
|   API base URL     |  string      | For Sandbox environment base URL will be: `https://kyc.sandboxost.com`     <br><br>   For Production environment base URL will be: `https://kyc.ost.com`|
|   Config           |  Dict      |  You can pass timeout with key as "timeout" and value as number (Will be considered as seconds) for http requests that SDK will make Ex: `config: {"timeout": 10}`    |


