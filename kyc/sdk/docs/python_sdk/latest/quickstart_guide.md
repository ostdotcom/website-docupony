---
id: quickstart_guide
title: Quickstart Guide
sidebar_label: Quickstart Guide
---

In this Python SDK quickstart guide, we will first create a user and then submit its KYC details. We will also show how can you get the KYC status and retrieve the KYC details.

## Create User

In order to create a user entity, we will have to use `Users` service provided by SDK. `Users` service is only used to create primary user entity that will only strore email address of a user.

### Create User Code
Below is a sample code to create user. 

```
import ost_kyc_sdk_python

kyc_sdk = ost_kyc_sdk_python.Services({
    "api_key": "Your API key",
    "api_secret": "Your API",
    "api_base_url": "API base URL",
    "config": { "timeout": "An integer representing desired timeout in seconds"}
})

Users = kyc_sdk.services.users
user = Users.create({'email': 'bob@example-domain.com'})

```
**Don't forget to replace your `API keys` while initializing SDK.**


## Upload KYC document proof files
Documents proof are stored in encrypted AWS S3 buckets. Developer using the SDK will have to first get the signed URL from the sdk. These signed URL will be then used to upload the documents directly onto AWS S3. These URL will have an expiry time so developer have to fetch these URLs each time before uploading the documents.

1. Upload from browser (S3 URL accepting POST request): When you want to upload documents directly from browser you need to get signed URL that will accept POST requests. This URL will be valid for some time so developer has to request for URL everytime he needs to upload documents.
<br> When requesting the signed URL for S3 buckets we will have to pass file types for each document needed from user.

### Signed URL for POST request code
```
user_kyc_service = kyc_sdk.services.users_kyc

users_kyc_service.get_pre_signed_url_post({'files': {
    'residence_proof': 'application/pdf',
    'investor_proof_file1': 'application/pdf',
    'investor_proof_file2': 'application/pdf',
    'document_id': 'image/jpeg',
    'selfie': 'image/jpeg'
}})

```
### Sample response

```
{
    "success": true,
    "data": {
        "result_type": "file_upload_post",
        "file_upload_post": {
            "document_id": {
                "url": "https://s3.amazonaws.com/kyc.stagingost.com",
                "fields": {
                    "key": "4/i/a1172a8d7a5dee632afd5b0bee8c6114",
                    "Content-Type": "image/jpeg",
                    "x-amz-server-side-encryption": "aws:kms",
                    "x-amz-server-side-encryption-aws-kms-key-id": "94b97a97-c2c8-4fc7-946d-a14a26ae264b",
                    "policy": "eyJleHBpcmF0aW9uIjoiMjAxOS0wMi0xM1QwNTowODo0MVoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJreWMuc3RhZ2luZ29zdC5jb20ifSx7ImtleSI6IjQvaS9hMTE3MmE4ZDdhNWRlZTYzMmFmZDViMGJlZThjNjExNCJ9LHsiQ29udGVudC1UeXBlIjoiaW1hZ2UvanBlZyJ9LHsieC1hbXotc2VydmVyLXNpZGUtZW5jcnlwdGlvbiI6ImF3czprbXMifSx7IngtYW16LXNlcnZlci1zaWRlLWVuY3J5cHRpb24tYXdzLWttcy1rZXktaWQiOiI5NGI5N2E5Ny1jMmM4LTRmYzctOTQ2ZC1hMTRhMjZhZTI2NGIifSxbImNvbnRlbnQtbGVuZ3RoLXJhbmdlIiwyMDQ4MDAsMjA5NzE1MjBdLHsieC1hbXotY3JlZGVudGlhbCI6IkFLSUFKN1hSTElPQTZTSUFDTlRRLzIwMTkwMjEzL3VzLWVhc3QtMS9zMy9hd3M0X3JlcXVlc3QifSx7IngtYW16LWFsZ29yaXRobSI6IkFXUzQtSE1BQy1TSEEyNTYifSx7IngtYW16LWRhdGUiOiIyMDE5MDIxM1QwNDUzNDFaIn1dfQ==",
                    "x-amz-credential": "AKIAJ7XRLIOA6SIACNTQ/20190213/us-east-1/s3/aws4_request",
                    "x-amz-algorithm": "AWS4-HMAC-SHA256",
                    "x-amz-date": "20190213T045341Z",
                    "x-amz-signature": "6af03e1d399da9a0543c442e47c0069ddcb9081f62f5833d18e5a844e04c4278"
                }
            },
            "residence_proof": {
                ......
            },
            "investor_proof_file1": {
                ......
            },
            "residence_proof": {
                ......
            },
            "selfie": {
                ......
            }

        }
    }
}
```

**We have recieved to objects for each document.**
1. **URL:** We will be using the URL field to make a PUT (from server) or POST (from browser) request.
2. **Fields:** We will be using only `key` field while submiting other details for user's KYC.


2. Upload from server side (S3 URL accepting PUT request): When you want to upload documents directly from browser you need to get signed URL that will accept PUT requests. This URL will be valid for some time so you have to request it everytime you want to submit the user's documents.
<br> When requesting the signed URL for S3 buckets you will have to pass file types for each document needed from user.

### Signed URL for PUT request code
```
user_kyc_service = kyc_sdk.services.users_kyc

users_kyc_service.get_pre_signed_url_put({'files': {
    'residence_proof': 'application/pdf',
    'investor_proof_file1': 'application/pdf',
    'investor_proof_file2': 'application/pdf',
    'document_id': 'image/jpeg',
    'selfie': 'image/jpeg'
}})

```

### sample response

```
{
    "success": true,
    "data": {
        "result_type": "file_upload_put",
        "file_upload_put": {
            "document_id": {
                "url": "https://s3.amazonaws.com/*******",
                "fields": {
                    "key": "4/i/f6417391000fae92b5d074b2e5928a3b"
                }
            },
            "investor_proof_file1": {
                ......
            },
            "investor_proof_file2": {
                ......
            },
            "residence_proof": {
                ......
            },
            "selfie": {
                ......
            }
        }
    }
}
```

**We have recieved to objects for each document.**
1. **URL:** We will be using the URL field to make a PUT (from server) or POST (from browser) request.
2. **Fields:** We will be using only `key` field while submiting other details for user's KYC.

### Uploading document proofs
To upload the documents we will make a PUT or POST request to S3 URLs we have got from above methods.

### Sample code to upload the documents
```
Code to be added here
```


## Submit KYC details
We have uploaded documents on S3 and we have their bucket paths (the `key` field we had received in signed URLs). Now we will use these `bucket paths (key field)` alogn with the details like `first name, last name, birthdate, etc` to submit the user's KYC.

### Submit KYC code

```
kyc_sdk.services.users_kyc.submit_kyc({
        'user_id': 11035,
        'first_name':'aniket',
        'last_name':'ayachit', 
        'birthdate':'21/12/1991', 
        'country':'india', 
        'nationality':'indian', 
        'document_id_number':'arqpa7659a',
        'document_id_file_path': '4/i/f6417391000fae92b5d074b2e5928a3b', 
        'selfie_file_path':'4/i/dc71d140532b1a7b55ba29f35b7a16d2', 
        'residence_proof_file_path':'4/d/6c6c6e759bee4c496c325decdeeef007', 
        'ethereum_address': '0xdfbc84ccac430f2c0455c437adf417095d7ad68e', 
        'estimated_participation_amount':'2', 
        'street_address':'afawfveav ',
        'city':'afawfveav', 
        'state':'afawfveav',
        'postal_code':'afawfveav',
        'investor_proof_files_path':[
            '4/d/5cfaefa078eb75f3a6470474053ef175', 
            '4/d/5ccc6d4b167e12af4616f1c96eb6505a']
        })
```

## Check KYC status
To get the KYC status of a user. We should use `users_kyc` service.

### KYC status code
```
response = users_kyc_service.get({'user_id':11003})
print(response)
```

### KYC status sample response 
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

## Retrieve KYC details

User's KYC details are sensitive information so there is differnt service fetch these details back. As a company using KYC you can choose which fields to expose in API. You canchoose the fields in KYC admin dashboard.
To get KYC details we should use `users_kyc_details` service provided in SDK.


###  Retrieve KYC details code
```
users_kyc_details_service = kyc_sdk.services.users_kyc_details

response = users_kyc_details_service.get({'user_id':11003})
print(response)

```

### KYC details sample response

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