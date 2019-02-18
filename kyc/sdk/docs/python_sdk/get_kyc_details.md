---
id: get_kyc_details
title: Get KYC details
sidebar_label: Get KYC Details
---

## Get KYC Details
User's KYC details are sensitive information so there is differnt service fetch these details back. As a company using KYC you can choose which fields to expose in API. You canchoose the fields in KYC admin dashboard.

To get KYC details we should use `users_kyc_details` service provided in SDK.

### Sample Code
```
import ost_kyc_sdk_python

# Initializing SDK
kyc_sdk = ost_kyc_sdk_python.Services({
    "api_key": "Your API key",
    "api_secret": "Your API",
    "api_base_url": "API base URL",
    "config": { "timeout": "An integer representing desired timeout in seconds"}
})

users_kyc_details_service = kyc_sdk.services.users_kyc_details

response = users_kyc_details_service.get({'user_id':11003})
print(response)

```

### Response

```
{
    "success": true,
    "data": {
        "result_type": "user_kyc_detail",
        "user_kyc": {
            "first_name": "Test",
            "last_name": "1549446973362",
            "birthdate": "1992-07-29",
            "country": "INDIA",
            "id": 1460,
            "created_at": 1549446976
        }
    }
}
```


