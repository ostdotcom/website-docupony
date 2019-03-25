---
id: add_kyc_details
title: Add KYC details
sidebar_label: Add KYC details
---

## Add KYC details
To add personal information about a user for KYC purpose, a service called as `users_kyc` should be used.
 
 ```
 kyc_sdk.services.users_kyc
 ```


## Prerequisite to upload KYC documents:

### Following are KYC documents proof needed from user 
1. residence_proof
2. investor\_proof\_file1
3. investor\_proof\_file2
4. document_id
5. selfie

Documents proof are stored in encrypted AWS S3 buckets. Developer using the SDK will have to first get the signed URL from the sdk. These signed URL will be then used to upload the documents directly onto AWS S3. These URL will have an expiry time so developer have to fetch these URLs each time before uploading the documents.



### Get Signed URL to upload documents

1. Upload from browser (S3 URL accepting POST request): When you want to upload documents directly from browser you need to get signed URL that will accept POST requests. This URL will be valid for some time so developer has to request for URL everytime he needs to upload documents.
<br> When requesting the signed URL for S3 buckets we will have to pass file types for each document needed from user.

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

user_kyc_service = kyc_sdk.services.users_kyc

users_kyc_service.get_pre_signed_url_post({'files': {
    'residence_proof': 'application/pdf',
    'investor_proof_file1': 'application/pdf',
    'investor_proof_file2': 'application/pdf',
    'document_id': 'image/jpeg',
    'selfie': 'image/jpeg'
}})

```

### Response

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
            "investor_proof_file1": {
                "url": "https://s3.amazonaws.com/kyc.stagingost.com",
                "fields": {
                    "key": "4/d/f192b508d4e47a214705410ca4b2b51f",
                    "Content-Type": "application/pdf",
                    "x-amz-server-side-encryption": "aws:kms",
                    "x-amz-server-side-encryption-aws-kms-key-id": "94b97a97-c2c8-4fc7-946d-a14a26ae264b",
                    "policy": "eyJleHBpcmF0aW9uIjoiMjAxOS0wMi0xM1QwNTowODo0MVoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJreWMuc3RhZ2luZ29zdC5jb20ifSx7ImtleSI6IjQvZC9mMTkyYjUwOGQ0ZTQ3YTIxNDcwNTQxMGNhNGIyYjUxZiJ9LHsiQ29udGVudC1UeXBlIjoiYXBwbGljYXRpb24vcGRmIn0seyJ4LWFtei1zZXJ2ZXItc2lkZS1lbmNyeXB0aW9uIjoiYXdzOmttcyJ9LHsieC1hbXotc2VydmVyLXNpZGUtZW5jcnlwdGlvbi1hd3Mta21zLWtleS1pZCI6Ijk0Yjk3YTk3LWMyYzgtNGZjNy05NDZkLWExNGEyNmFlMjY0YiJ9LFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLDIwNDgwMCwyMDk3MTUyMF0seyJ4LWFtei1jcmVkZW50aWFsIjoiQUtJQUo3WFJMSU9BNlNJQUNOVFEvMjAxOTAyMTMvdXMtZWFzdC0xL3MzL2F3czRfcmVxdWVzdCJ9LHsieC1hbXotYWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsieC1hbXotZGF0ZSI6IjIwMTkwMjEzVDA0NTM0MVoifV19",
                    "x-amz-credential": "AKIAJ7XRLIOA6SIACNTQ/20190213/us-east-1/s3/aws4_request",
                    "x-amz-algorithm": "AWS4-HMAC-SHA256",
                    "x-amz-date": "20190213T045341Z",
                    "x-amz-signature": "3463a7ca9feb579191cda92c5098a9700fba16221900511c7eb2fc9ad9fb48f7"
                }
            },
            "investor_proof_file2": {
                "url": "https://s3.amazonaws.com/kyc.stagingost.com",
                "fields": {
                    "key": "4/d/f096e913a9798217046d5cad669ab388",
                    "Content-Type": "application/pdf",
                    "x-amz-server-side-encryption": "aws:kms",
                    "x-amz-server-side-encryption-aws-kms-key-id": "94b97a97-c2c8-4fc7-946d-a14a26ae264b",
                    "policy": "eyJleHBpcmF0aW9uIjoiMjAxOS0wMi0xM1QwNTowODo0MVoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJreWMuc3RhZ2luZ29zdC5jb20ifSx7ImtleSI6IjQvZC9mMDk2ZTkxM2E5Nzk4MjE3MDQ2ZDVjYWQ2NjlhYjM4OCJ9LHsiQ29udGVudC1UeXBlIjoiYXBwbGljYXRpb24vcGRmIn0seyJ4LWFtei1zZXJ2ZXItc2lkZS1lbmNyeXB0aW9uIjoiYXdzOmttcyJ9LHsieC1hbXotc2VydmVyLXNpZGUtZW5jcnlwdGlvbi1hd3Mta21zLWtleS1pZCI6Ijk0Yjk3YTk3LWMyYzgtNGZjNy05NDZkLWExNGEyNmFlMjY0YiJ9LFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLDIwNDgwMCwyMDk3MTUyMF0seyJ4LWFtei1jcmVkZW50aWFsIjoiQUtJQUo3WFJMSU9BNlNJQUNOVFEvMjAxOTAyMTMvdXMtZWFzdC0xL3MzL2F3czRfcmVxdWVzdCJ9LHsieC1hbXotYWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsieC1hbXotZGF0ZSI6IjIwMTkwMjEzVDA0NTM0MVoifV19",
                    "x-amz-credential": "AKIAJ7XRLIOA6SIACNTQ/20190213/us-east-1/s3/aws4_request",
                    "x-amz-algorithm": "AWS4-HMAC-SHA256",
                    "x-amz-date": "20190213T045341Z",
                    "x-amz-signature": "0377488bcd73721182b5ee5289b399cc095915ebd673fa4ab5a3c1ea7f3e7739"
                }
            },
            "residence_proof": {
                "url": "https://s3.amazonaws.com/kyc.stagingost.com",
                "fields": {
                    "key": "4/d/3f0845f327747142a1d5d174e757bfb5",
                    "Content-Type": "application/pdf",
                    "x-amz-server-side-encryption": "aws:kms",
                    "x-amz-server-side-encryption-aws-kms-key-id": "94b97a97-c2c8-4fc7-946d-a14a26ae264b",
                    "policy": "eyJleHBpcmF0aW9uIjoiMjAxOS0wMi0xM1QwNTowODo0MVoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJreWMuc3RhZ2luZ29zdC5jb20ifSx7ImtleSI6IjQvZC8zZjA4NDVmMzI3NzQ3MTQyYTFkNWQxNzRlNzU3YmZiNSJ9LHsiQ29udGVudC1UeXBlIjoiYXBwbGljYXRpb24vcGRmIn0seyJ4LWFtei1zZXJ2ZXItc2lkZS1lbmNyeXB0aW9uIjoiYXdzOmttcyJ9LHsieC1hbXotc2VydmVyLXNpZGUtZW5jcnlwdGlvbi1hd3Mta21zLWtleS1pZCI6Ijk0Yjk3YTk3LWMyYzgtNGZjNy05NDZkLWExNGEyNmFlMjY0YiJ9LFsiY29udGVudC1sZW5ndGgtcmFuZ2UiLDIwNDgwMCwyMDk3MTUyMF0seyJ4LWFtei1jcmVkZW50aWFsIjoiQUtJQUo3WFJMSU9BNlNJQUNOVFEvMjAxOTAyMTMvdXMtZWFzdC0xL3MzL2F3czRfcmVxdWVzdCJ9LHsieC1hbXotYWxnb3JpdGhtIjoiQVdTNC1ITUFDLVNIQTI1NiJ9LHsieC1hbXotZGF0ZSI6IjIwMTkwMjEzVDA0NTM0MVoifV19",
                    "x-amz-credential": "AKIAJ7XRLIOA6SIACNTQ/20190213/us-east-1/s3/aws4_request",
                    "x-amz-algorithm": "AWS4-HMAC-SHA256",
                    "x-amz-date": "20190213T045341Z",
                    "x-amz-signature": "84966fa454fb728b89af85929652d4fb8eb5ebdd8477301ee19a05951b2659ea"
                }
            },
            "selfie": {
                "url": "https://s3.amazonaws.com/kyc.stagingost.com",
                "fields": {
                    "key": "4/i/84834d7123273021e4d902a7de2d66e7",
                    "Content-Type": "image/jpeg",
                    "x-amz-server-side-encryption": "aws:kms",
                    "x-amz-server-side-encryption-aws-kms-key-id": "94b97a97-c2c8-4fc7-946d-a14a26ae264b",
                    "policy": "eyJleHBpcmF0aW9uIjoiMjAxOS0wMi0xM1QwNTowODo0MVoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJreWMuc3RhZ2luZ29zdC5jb20ifSx7ImtleSI6IjQvaS84NDgzNGQ3MTIzMjczMDIxZTRkOTAyYTdkZTJkNjZlNyJ9LHsiQ29udGVudC1UeXBlIjoiaW1hZ2UvanBlZyJ9LHsieC1hbXotc2VydmVyLXNpZGUtZW5jcnlwdGlvbiI6ImF3czprbXMifSx7IngtYW16LXNlcnZlci1zaWRlLWVuY3J5cHRpb24tYXdzLWttcy1rZXktaWQiOiI5NGI5N2E5Ny1jMmM4LTRmYzctOTQ2ZC1hMTRhMjZhZTI2NGIifSxbImNvbnRlbnQtbGVuZ3RoLXJhbmdlIiwyMDQ4MDAsMjA5NzE1MjBdLHsieC1hbXotY3JlZGVudGlhbCI6IkFLSUFKN1hSTElPQTZTSUFDTlRRLzIwMTkwMjEzL3VzLWVhc3QtMS9zMy9hd3M0X3JlcXVlc3QifSx7IngtYW16LWFsZ29yaXRobSI6IkFXUzQtSE1BQy1TSEEyNTYifSx7IngtYW16LWRhdGUiOiIyMDE5MDIxM1QwNDUzNDFaIn1dfQ==",
                    "x-amz-credential": "AKIAJ7XRLIOA6SIACNTQ/20190213/us-east-1/s3/aws4_request",
                    "x-amz-algorithm": "AWS4-HMAC-SHA256",
                    "x-amz-date": "20190213T045341Z",
                    "x-amz-signature": "57c6b9e93d0f4cce1c2be15188cda4e693feb326badba58c16cb6527d21e28c6"
                }
            }
        }
    }
}
```

2. Upload from server side (S3 URL accepting PUT request): When you want to upload documents directly from browser you need to get signed URL that will accept PUT requests. This URL will be valid for some time so you have to request it everytime you want to submit the user's documents.
<br> When requesting the signed URL for S3 buckets you will have to pass file types for each document needed from user.

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

user_kyc_service = kyc_sdk.services.users_kyc

users_kyc_service.get_pre_signed_url_put({'files': {
    'residence_proof': 'application/pdf',
    'investor_proof_file1': 'application/pdf',
    'investor_proof_file2': 'application/pdf',
    'document_id': 'image/jpeg',
    'selfie': 'image/jpeg'
}})

```
### Response


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
                "url": "https://s3.amazonaws.com/*******",

                "fields": {
                    "key": "4/d/5cfaefa078eb75f3a6470474053ef175"
                }
            },
            "investor_proof_file2": {
                "url": "https://s3.amazonaws.com/*******",

                "fields": {
                    "key": "4/d/5ccc6d4b167e12af4616f1c96eb6505a"
                }
            },
            "residence_proof": {
                "url": "https://s3.amazonaws.com/*******",

                "fields": {
                    "key": "4/d/6c6c6e759bee4c496c325decdeeef007"
                }
            },
            "selfie": {
                "url": "https://s3.amazonaws.com/*******",

                "fields": {
                    "key": "4/i/dc71d140532b1a7b55ba29f35b7a16d2"
                }
            }
        }
    }
}
```



## Uploading KYC documents


## Add KYC details:
We have recieved AWS S3 file paths where we have uploaded KYC documents. We can now start adding the KYC details like name, address, documents file paths (S3 paths)


### Sample Code


Sample code to add KYC details of a user. 



```
import ost_kyc_sdk_python

kyc_sdk = ost_kyc_sdk_python.Services({
    "api_key": "Your API key",
    "api_secret": "Your API",
    "api_base_url": "API base URL",
    "config": { "timeout": "An integer representing desired timeout in seconds"}
})

response = kyc_sdk.services.users_kyc.submit_kyc({
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
        
print(response)

```