---
id: installation
title: Installation
sidebar_label: Installation
---

## Installing Pip
**Do you need to install pip?** <br>
Pip is already installed if you are using **Python 2** >=**2.7.9** or **Python 3** >=**3.4** downloaded from python.org or if you are working in a Virtual Environment created by virtualenv or pyvenv. Just make sure to upgrade pip.

### Installing with get-pip.py 
To install pip, securely download get-pip.py.
> curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py

Then run the following: <br>
Python 2
> python get-pip.py

Python 3
> python3 get-pip.py


## Installing SDK

To install the SDK run the following command <br>
### Python 2 
> pip install ost\_kyc\_sdk\_python

### Python 3
> pip3 install ost\_kyc\_sdk\_python


## Initializing SDK

```
import ost_kyc_sdk_python

kyc_sdk = ost_kyc_sdk_python.Services({
    "api_key": "Your API key",
    "api_secret": "Your API secret",
    "api_base_url": "API base URL",
    "config": { "timeout": "An integer representing desired timeout in seconds"}
})

```

### Initialization parameters

|   Name             |  Type  | Notes   |
|--------------------|--------|---------|
|   API key          |  string      | You can find this key in settings of KYC dashboard        |
|   API Secret key   |  string      | You can find this key in settings of KYC dashboard        |
|   API base URL     |  string      | For Sandbox environment base URL will be: `https://kyc.sandboxost.com`     <br><br>   For Production environment base URL will be: `https://kyc.ost.com`|
|   Config           |  Dict      |  You can pass timeout with key as "timeout" and value as number (Will be considered as seconds) for http requests that SDK will make Ex: `config: {"timeout": 10}`    |

