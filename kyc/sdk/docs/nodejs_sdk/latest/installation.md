---
id: installation
title: Installation
sidebar_label: Installation
---

## Installing SDK

To install the SDK run the following command <br>
> npm install @ostdotcom/ost-kyc-sdk-js


## Initializing SDK

```
const KYCSDK = require('@ostdotcom/ost-kyc-sdk-js');

const kycObj = new KYCSDK({
    apiKey: <api_key>, 
    apiSecret: <api_secret>, 
    apiEndpoint: <api_endpoint>, 
    config: {timeout: <timeout>}
    });

```

### Initialization parameters

|   Name             |  Type  | Notes   |
|--------------------|--------|---------|
|   API key          |  string      | You can find this key in settings of KYC dashboard        |
|   API Secret key   |  string      | You can find this key in settings of KYC dashboard        |
|   API base URL     |  string      | For sandbox environment base URL will be: `https://kyc.sandboxost.com`     <br><br>   For production environment base URL will be: `https://kyc.ost.com`|
|   Config           |  Dict      |  You can pass timeout with key as "timeout" and value as number (Will be considered as seconds) for http requests that SDK will make Ex: `config: {"timeout": 10}`    |

