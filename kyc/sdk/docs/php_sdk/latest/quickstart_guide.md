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

$userService = $ostKycSdkObj->services->user;

$params = array();
$params['email'] = 'email@domain.com';
$user = $userService->create($params)->wait();

```
**Don't forget to replace your `API keys` while initializing SDK.**


## Upload KYC document proof files
Documents proof are stored in encrypted AWS S3 buckets. Developer using the SDK will have to first get the signed URL from the sdk. These signed URL will be then used to upload the documents directly onto AWS S3. These URL will have an expiry time so developer have to fetch these URLs each time before uploading the documents.

1. Upload from browser (S3 URL accepting POST request): When you want to upload documents directly from browser you need to get signed URL that will accept POST requests. This URL will be valid for some time so developer has to request for URL everytime he needs to upload documents.
<br> When requesting the signed URL for S3 buckets we will have to pass file types for each document needed from user.

### Signed URL for POST request code
```
$usersKycService = $ostKycSdkObj->services->usersKyc;

$params = array();
$nestedparams = array();

$nestedparams['selfie'] = 'image/jpeg';
$nestedparams['document_id'] = 'image/jpeg';
$nestedparams['investor_proof_file1'] = 'application/pdf';
$nestedparams['investor_proof_file2'] = 'application/pdf';
$nestedparams['residence_proof'] = 'application/pdf';

$params['files'] = $nestedparams;

$response = $usersKycService->get_presigned_url_post($params)->wait();
var_dump($response);

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
$usersKycService = $ostKycSdkObj->services->usersKyc;

$params = array();
$nestedparams = array();

$nestedparams['selfie'] = 'image/jpeg';
$nestedparams['document_id'] = 'image/jpeg';
$nestedparams['investor_proof_file1'] = 'application/pdf';
$nestedparams['investor_proof_file2'] = 'application/pdf';
$nestedparams['residence_proof'] = 'application/pdf';

$params['files'] = $nestedparams;

$response = $usersKycService->get_presigned_url_put($params)->wait();
var_dump($response);

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
$usersKycService = $ostKycSdkObj->services->usersKyc;

$params = array();
$params['user_id'] = "11035";
$params['first_name'] = "aniket";
$params['last_name'] = "ayachit";
$params['birthdate'] = "21/12/1991";
$params['country'] = "india";
$params['nationality'] = "indian";
$params['document_id_number'] = "arqpa7659a";
$params['document_id_file_path'] = "2/i/016be96da275031de2787b57c99f1471";
$params['selfie_file_path'] = "2/i/9e8d3a5a7a58f0f1be50b7876521aebc";
$params['residence_proof_file_path'] = "2/i/4ed790b2d525f4c7b30fbff5cb7bbbdb";
$params['ethereum_address'] = "0xdfbc84ccac430f2c0455c437adf417095d7ad68e";
$params['postal_code'] = "afawfveav";
$params['investor_proof_files_path'] = array("2/i/9ff6374909897ca507ba3077ee8587da", "2/i/4872730399670c6d554ab3821d63ebce");

$response = $usersKycService->submit_kyc($params)->wait();
```

## Check KYC status
To get the KYC status of a user. We should use `users_kyc` service.

### KYC status code
```
$usersKycService = $ostKycSdkObj->services->usersKyc;

$params = array();
$params['user_id'] = '11007';
$response = $usersKycService->get($params)->wait();
var_dump($response);
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
$usersKycDetailService = $ostKycSdkObj->services->usersKycDetail;

$params = array();
$params['user_id'] = '11007';
$response = $usersKycDetailService->get($params)->wait();
var_dump($response);

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
