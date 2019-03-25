---
id: installation
title: Installation
sidebar_label: Installation
---


## Installing SDK

To install the SDK run the following command <br>



## Initializing SDK
We will create a `Test` class to show SDK initialization

```
import java.io.IOException;
import java.util.HashMap;

import com.ost.kyc.OSTKYCSDK;
import com.ost.kyc.services.OSTKYCAPIService;

public class Test {
    public static void main(String[] args) throws IOException, OSTKYCAPIService.MissingParameter, OSTKYCAPIService.InvalidParameter {
        HashMap<String, Object> sdkConfig = new HashMap<String, Object>();
        
        sdkConfig.put("apiEndpoint", "API base URL");
        sdkConfig.put("apiKey", "Your API key");
        sdkConfig.put("apiSecret", "API secret"); 

        OSTKYCSDK ostObj = new OSTKYCSDK(sdkConfig);
        com.ost.kyc.services.v2.Manifest services = (com.ost.kyc.services.v2.Manifest) ostObj.services;
    }
}
```

### Initialization parameters

|   Name             |  Type  | Notes   |
|--------------------|--------|---------|
|   API key          |  string      | You can find this key in settings of KYC dashboard        |
|   API Secret key   |  string      | You can find this key in settings of KYC dashboard        |
|   API base URL     |  string      | For sandbox environment base URL will be: `https://kyc.sandboxost.com`     <br><br>   For production environment base URL will be: `https://kyc.ost.com`|
|   Config           |  Dict      |  You can pass timeout with key as "timeout" and value as number (Will be considered as seconds) for http requests that SDK will make Ex: `config: {"timeout": 10}`    |
