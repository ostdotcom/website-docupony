---
id: get_kyc_status
title: KYC Python SDK | Get KYC status
sidebar_label: Get KYC status
---

## Get KYC status
To get the KYC status of a user. We should use `users_kyc` service.

### Sample code
```
response = users_kyc_service.get({'user_id':11003})
print(response)
```

### Response
```
{
    "data": {
            "result_type": "user_kyc",
            "user_kyc": {
                "admin_action_types": [],
                 "admin_status": "qualified",
                 "aml_status": "cleared",
                 "created_at": 1549446976,
                 "id": 482,
                 "kyc_status": "approved",
                 "last_acted_by": "",
                 "submission_count": 1,
                 "user_id": 11767,
                 "user_kyc_detail_id": 1460,
                 "whitelist_status": "failed"}
            },    
    "success": true
}
```

