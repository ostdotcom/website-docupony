---
id: utilities
title: KYC Python SDK | Utilities
sidebar_label: Utilities
---

## Ethereum Validators
A validator service is provided to validate ethereum addresses.

### Sample Code

```
import ost_kyc_sdk_python

kyc_sdk = ost_kyc_sdk_python.Services({
    "api_key": "Your API key",
    "api_secret": "Your API",
    "api_base_url": "API base URL",
    "config": { "timeout": "An integer representing desired timeout in seconds"}
})
validator_service = kyc_sdk.services.validators
response = validator_service.verify_ethereum_address({'ethereum_address': '0x32be343b94f860124dc4fee278fdcbd38c102d88'})
 
 print(response)

```



##Notification Emails
When you want to send emails manually to your users you can use `users_kyc` service to send emails.

### Notification Email types
1. KYC Approve Email: 

```
import ost_kyc_sdk_python

kyc_sdk = ost_kyc_sdk_python.Services({
    "api_key": "Your API key",
    "api_secret": "Your API",
    "api_base_url": "API base URL",
    "config": { "timeout": "An integer representing desired timeout in seconds"}
})
users_kyc_service = kyc_sdk.services.users_kyc

response = users_kyc_service.email_approve({'user_id': 11003})
print(response)
```

2. KYC Deny Email

```
import ost_kyc_sdk_python

kyc_sdk = ost_kyc_sdk_python.Services({
    "api_key": "Your API key",
    "api_secret": "Your API",
    "api_base_url": "API base URL",
    "config": { "timeout": "An integer representing desired timeout in seconds"}
})
users_kyc_service = kyc_sdk.services.users_kyc

response = users_kyc_service.email_deny({'user_id': 11003})
print(response)
```

3. KYC report issue email

```
import ost_kyc_sdk_python

kyc_sdk = ost_kyc_sdk_python.Services({
    "api_key": "Your API key",
    "api_secret": "Your API",
    "api_base_url": "API base URL",
    "config": { "timeout": "An integer representing desired timeout in seconds"}
})
users_kyc_service = kyc_sdk.services.users_kyc

response = users_kyc_service.email_report_issue({'user_id': 11003})
print(response)
```
