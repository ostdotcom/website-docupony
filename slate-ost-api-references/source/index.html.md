---
title: API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - ruby: Ruby

toc_footers:
  - <a href='#'>Sign Up for a Developer Key</a>
  - <a href='https://github.com/lord/slate'>Documentation Powered by Slate</a>

search: true
---

# OST KYC
OST KYC is the first plug-and-play KYC/AML management solution for token sales to process
thousands of applicants smoothly and securely. Once you sign up for the KYC services and an OST KYC client account is activated, the following details are provided :

|Account Activation | Elements |
-------------------|----------
| |<img width=1200/>|
|<u>**Account Details**</u>| Link to KYC Dashboard <br> Login Credentials for KYC Dashboard <br> Link to Cynopsis Environment <br>
Login credentials to Cynopsis Environment |
|<u>**API Access:​**</u> API access is authorized using secret key. Please share the key with trusted entities only. | API Key <br> API Secret Key |
|<u>**Whitelisting Address:​**</u> This is the address which will be communicating to the Sale contract to whitelist registered Eth addresses. This is also known as Verified Operator Address | Whitelisting Address |
|<u>**DNS records for domain verification:**</u>It is required to add the DNS records for the domain authentication in the DNS provider in order to start sending emails.| DNS records will be provided in the form of a CSV file. |
|<u>**Participating Countries:**</u> ​This is the list of countries and nationalities in yml file format to be used in the submission formfor API validation. This list shall be adjusted by the client based on his specific requirements. |List of Countries and Nationalities. |


As part of the complete solution one of the product offerings is the robust set of OST KYC APIs. They allow access to several functionality used for KYC/AML verification. Here are the APIs that we deliver through OST KYC -

## Authentication

> To authorize, you can use this sample code:

```ruby
require 'uri'
require 'open-uri'
require 'openssl'
require 'net/http'
require 'rails'


# Generate Signature
def generate_signature(string_to_sign)
  digest = OpenSSL::Digest.new('sha256')
  puts "--------string_to_sign=>#{string_to_sign}-----"
  OpenSSL::HMAC.hexdigest(digest, 'API_SECRET', string_to_sign) # Make sure to replace `API_SECRET` with your API secret key.
end

# Create Base Parameters
def base_params(endpoint, custom_params = {})
  request_time = Time.now.to_i
  request_params = custom_params.merge("request_timestamp" => request_time, "api_key" => 'API_KEY') # Make sure to replace `API_KEY` with your API key.
  query_param = request_params.to_query.gsub(/^&/, '')
  str = "#{endpoint}?#{query_param}"
  signature = generate_signature(str)
  request_params.merge!("signature" => signature)
  request_params
end

custom_params = {email: 'custom_email'}
endpoint = "/api/v2/users"

request_params = base_params(endpoint, custom_params)
```
Every API request on https://kyc.ost.com/v2 requires hash-based message authentication. Every request has three mandatory parameters that must be included:

* api_key, the API key as provided post KYC client account activation.
* request_timestamp, the current unix timestamp in seconds.
* signature, the signature as the sha256 digest of the API secret and the correctly formatted query string as described below.

<aside class="warning">The request timestamp will be valid for up to ten seconds. Your computer clock must therefore be synchronised for authentication to succeed.</aside>

You can implement the signature generation by computing the HMAC sha256digest of the API secret and the query string. The resulting signature must be then included in the request.

### 1. Creating the string to sign.
To generate the signature you must first form the string to sign. This string to sign can be formed by concatenation of the following elements
* API endpoint
* api_key, the API key as provided from OST KIT⍺
* request_timestamp, the current unix timestamp in seconds.
* API parameters.

<aside class="warning">Note all the inputs must be alphabetically sorted on the keys.ss</aside>

### 2. Generating a signature.
The signature is the sha256 digest of the shared API secret and the correctly formatted query string

generated_signature = Hmac_Sha256_Hexdigest(string-to-sign, api-secret)

<aside class="warning">Please ensure that the final URL is encoded while making the API request.</aside>

For a Post request,the parameters are sent in the request body with default application/x-www-form-urlencoded content-type so the request body uses the same format as the query string.
 

# Users
## The User Object 
> Example Response:

```json
{
  "id": 11428,
  "email": "kycuser@ost.com",
  "properties": [],
  "created_at": 1539163614
}
```
|PARAMETER|TYPE|DESCRIPTION|
----------|----|------------
|id|string| unique identifier for the user |
|email| string | Email Id of the user|
|properties|array<strings>|Properties of the user:<br> "kyc_submitted",<br> "double_optin_mail_sent",<br> "double_optin_done".<br> Remains empty when the user is created. |
|created_at| timestamp |timestamp at which user was created. (epoc time in sec? millisecond?)|

## Add a User
> Example Request code:

```ruby
# setup http request
  def setup_request(uri)
     http = Net::HTTP.new(uri.host, uri.port)
     http.use_ssl = true
     http.verify_mode = OpenSSL::SSL::VERIFY_PEER
     http
  end
    
# Make a Post Request
def make_post_request(endpoint, custom_params = {})
  request_params = base_params(endpoint, custom_params)
  uri = URI('https://kyc.ost.com' + endpoint)
  http = setup_request(uri)
  result = http.post(uri.path, request_params.to_query)
  result
end  
# create user
def create_user(custom_params = {})
  endpoint = "/api/v2/users"
  res = make_post_request(endpoint, custom_params)
  JSON.parse(res.body)
end
```

A POST to `kyc.ost.com/api/v2/users` creates a new user object for the user in OST KYC database. Only user's signup information is sent via this endpoint. For sending user's KYC details a POST request to a different endpoint `/users-kyc/{{user_id}}` has to be sent.

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|email | string | yes | A <u>unique</u> email id of the user whose KYC enrty has to be made|

<aside class="warning">Information about - this API would be useful to only API clients!!??</aside>

<u>**Returns**</u><br>
For api calls to `/users` the data.result\_type is the string "user" and the key data.user is an array of user objects. On successful creation of the user, user contains the created user as a single element. The returned user object will return an ID in it that can be used to fetch the user information using the retrieve user endpoint.

> Example Response

```json
{
  "success": true,
   "data": {
      "result_type": "user",
      "user": {
         "id": 11428,
         "email": "kycuser@ost.com",
         "properties": [],
         "created_at": 1539163614
      }
   }
}
```



## Retrieve a User
> Example Request code:

```ruby
# setup http request
def setup_request(uri)
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http
end
# Make a Get Request
def make_get_request(endpoint, custom_params = {})
  request_params = base_params(endpoint, custom_params)
  query_string = request_params.to_query
  uri = URI('https://kyc.ost.com' + endpoint + "?" + query_string)
  http = setup_request(uri)
  result = http.get(uri)
  result
end  
# retrieve a user
def get_user(user_id, custom_params = {})
      endpoint = "/api/#{@version}/users/#{user_id}"
      make_get_request(endpoint, custom_params)
end
```
A GET to `kyc.ost.com/api/v2/users/{id}` retrieves the information of an existing user. You need to supply the identifier that was returned upon user creation.

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|id | integer | yes | An unique identifier of the user whose information is to be retrieved|

<u>**Returns**</u><br>
For api calls to `/users` the data.result\_type is the string "user" and the key data.user is an array of returned user object if a valid identifier was provided. When the requesting ID of a user is not found a 404, resource could not be located error will be returned.

<aside class="warning">Information  - Can we deleted a user? what if a deleted user is retrieved?</aside>


> Example Response

```json
{
  "success": true,
   "data": {
    "result_type": "user",
    "user": {
         "id": 11428,
         "email": "kycuser@ost.com",
         "properties": [],
         "created_at": 1539163614
    }
  }
}
```

> Example Error Response

```json
{
  "success": false,
  "err": {
    "internal_id": "um_u_g_favu_2",
    "msg": "The requested resource could not be located.",
    "code": "NOT_FOUND"
  }
}
```

## List Users
> Example Request code:

```ruby
# setup http request
def setup_request(uri)
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http
end
# Make a Get Request
def make_get_request(endpoint, custom_params = {})
  request_params = base_params(endpoint, custom_params)
  query_string = request_params.to_query
  uri = URI('https://kyc.ost.com' + endpoint + "?" + query_string)
  http = setup_request(uri)
  result = http.get(uri)
  result
end 
# Get user list
def get_user_list(custom_params = nil)
# default_params = {page_number: 1, order: 'asc', filters: {}, page_size: 3}
  default_params = {}
  endpoint = "/api/#{@version}/users"
  custom_params = custom_params || default_params
  make_get_request(endpoint, custom_params)
end
```
A GET to `kyc.ost.com/api/v2/users` returns a list of all users who have signed up. This doesn't imply that all these users have submitted their required KYC details. The users are returned sorted by creation date, with the most recent users appearing first. 

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|filters | object | no | A filter on the list based on the object `filter` field. The value can be a boolean or a string |
|page\_number|integer|no | A field that helps in pagination. page\_number is an integer that defines the page of  the list to fetch. For instance, if you make a list request and receive 100 objects, each page sends 10 objects as default limit is 10. If you want to access 45th object your subsequent call can include page\_number=5 in order to fetch the 5th page of the list|
|order|string|no| A sort order to be applied based on the user creation time. default is desc ( asc / desc ) |
|limit|integer|no| A limit on the number of user objects to be sent in one request(min. 1, max. 100, default 10)|

<br>
<u>**Filter Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|is\_kyc\_submitted| boolean | no | A filter on users list who have submitted there kyc data. (true/false)|
|is\_doptin\_done|boolean|no| A filter on users list who have done email double opt in.(true/false)|
|is_doptin_mail_sent|boolean| no | A filter on users list who have been sent the double opt in email. (true/false)| 
|email| string | no | A filter on the users list based on the user's email field.|

<br>
<u>**Returns**</u><br>
> Example Response

```json
{
   "success": true,
   "data": {
      "result_type": "users",
      "users": [
         {
            "id": 11442,
            "email": "kycuser10@ost.com",
            "properties": [],
            "created_at": 1539339413
         },
         {
            "id": 11430,
            "email": "kycuser9@ost.com",
            "properties": [
               "kyc_submitted"
            ],
            "created_at": 1539169109
         },
         {
            "id": 11429,
            "email": "kycuser8@ost.com",
            "properties": [],
            "created_at": 1539169086
         },
         {
            "id": 11428,
            "email": "kycuser7@ost.com",
            "properties": [],
            "created_at": 1539163614
         },
         {
            "id": 11427,
            "email": "kycuser6@ost.com",
            "properties": [
               "kyc_submitted"
            ],
            "created_at": 1539154855
         },
         {
            "id": 11426,
            "email": "kycuser5@ost.com",
            "properties": [
               "kyc_submitted"
            ],
            "created_at": 1539092212
         },
         {
            "id": 11420,
            "email": "kycuser4@ost.com",
            "properties": [
               "kyc_submitted"
            ],
            "created_at": 1538992711
         },
         {
            "id": 11417,
            "email": "kycuser3@ost.com",
            "properties": [
               "kyc_submitted"
            ],
            "created_at": 1538979927
         },
         {
            "id": 11414,
            "email": "kycuser2@ost.com",
            "properties": [],
            "created_at": 1538747355
         },
         {
            "id": 11413,
            "email": "kycuser1@ost.com",
            "properties": [],
            "created_at": 1538747119
         }
      ],
      "meta": {
         "total": 39,
         "next_page_payload": {
            "page_number": 2,
            "filters": {},
            "order": "desc",
            "limit": 10
         }
      }
   }
}
```

For api calls to `/users` the data.result\_type is the string "users" and the key data.users is an array of the returned user objects (10 users per page). The field data.meta.next_page_payload contains the filter and order information and the page_no number for the next page; or is empty for the last page of the list.

Passing an optional email will result in filtering to users with only that exact email address. Each entry in the array is a separate user object. If no more user are available, the resulting array will be empty without an error thrown.

# Users KYC Details
## The User KYC Detail Object 
> Example Response:

```json
```

|PARAMETER|TYPE|DESCRIPTION|
----------|----|------------
|||<img width=1000/>|
|id|integer| unique identifier of the last submitted kyc of a user. |
|first_name|string| The user's first name. |
|last_name| string | The user's last name.|
|birthdate| string | The user's birthdate in dd/mm/yyyy format.|
|country|string|The user's country of residence.|
|nationality|string| The user's nationality.|
|document\_id\_number| string| The users identification number from their identification document.|
|document_id_file|string|S3 file url of the document id file. This link expires in 12 hours.|
|selfie_file|string|S3 file url of the selfile file. This link expires in 12 hours.|
|residence_proof_file|string| S3 file url of the residence proof file. This link expires in 12 hours.|
|investor_proof_files|array\<string\>| An array of S3 file urls of investor proof files. These links expire in 12 hours|
|ethereum_address|string|Ethereum address from where the user intends to transfer Eth to company to buy tokens|
|estimated_participation_amount|float|Estimated participation amount that user intends to invest during the token sale|
|street_address|string|The user's current address|
|city|string|the user's current city of residence|
|state|string|The user's state|
|postal\_code|string|postal_code|
|submitted_at|timestamp|timestamp at which kyc was submitted. (epoc time in sec? millisecond?)|



## Add or Update User KYC Details
> Example Request code :

```ruby
# setup http request
  def setup_request(uri)
     http = Net::HTTP.new(uri.host, uri.port)
     http.use_ssl = true
     http.verify_mode = OpenSSL::SSL::VERIFY_PEER
     http
  end
    
# Make a Post Request
def make_post_request(endpoint, custom_params = {})
  request_params = base_params(endpoint, custom_params)
  uri = URI('https://kyc.ost.com' + endpoint)
  http = setup_request(uri)
  result = http.post(uri.path, request_params.to_query)
  result
end  

# Submit KYC details request
def submit_kyc(user_id, custom_params = nil)
  default_params = {}
  endpoint = "/api/#{@version}/users-kyc/#{user_id}"
  custom_params = custom_params || default_params
  make_post_request(endpoint, custom_params)
end
```

A POST to `kyc.ost.com/api/v2/users-kyc/{{user_id}}` creates a new `user kyc detail` object for a user with the details provided through the input parameters. The same endpoint has to be used to update a user's KYC details in case of re-submissions. All parameters are required to be re-sent in an update request. You need to supply the user identifier as part of the endpoint that was returned upon user creation.

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|first_name|string| yes | The user's first name. |
|last_name| string | yes| The user's last name.|
|birthdate| string | yes |The user's birthdate in dd/mm/yyyy format.|
|country|string| yes |The user's country of residence.|
|nationality|string| yes |The user's nationality.|
|document\_id\_number| string| yes| The users identification number from their identification document.|
|document_id_file|string| yes | S3 file url of the document id file. This link expires in 12 hours.|
|selfie_file|string| yes |S3 file url of the selfile file. This link expires in 12 hours.|
|residence_proof_file|string|no | S3 file url of the residence proof file. This link expires in 12 hours.|
|investor_proof_files|array\<string\>|no| An array of S3 file urls of investor proof files. These links expire in 12 hours|
|ethereum_address|string|yes|Ethereum address from where the user intends to transfer Eth to company to buy tokens|
|estimated_participation_amount|float|yes|Estimated participation amount that user intends to invest during the token sale|
|street_address|string|yes|The user's current address|
|city|string|yes|the user's current city of residence|
|state|string|yes|The user's state|
|postal\_code|yes|string|postal_code|

The Input parameters above list all the fields accepted as input. KYC clients should send only those fields which they have selected for their users' kyc.

<br>

<u>**Returns**</u><br>
> Example Response

```json
{
   "success": true,
   "data": {
      "result_type": "user_kyc",
      "user_kyc": {
         "id": 290,
         "user_kyc_detail_id": 727,
         "user_id": 11420,
         "kyc_status": "pending",
         "admin_status": "unprocessed",
         "aml_status": "unprocessed",
         "whitelist_status": "unprocessed",
         "admin_action_types": [],
         "submission_count": 7,
         "last_acted_by": "yogesh4staging",
         "created_at": 1538995369
      }
   }
}
```
For POST calls to `/users-kyc/{{user_id}}` the data.result\_type is the string "user_kyc" and the key data.user\_kyc is an array of returned **user-kyc** object if a valid user identifier was provided. A `user-kyc` object provides properties and status related information of the kyc details that a user had last submitted.
 
## Retrieve User KYC Details
> Example Request code :

```ruby
# setup http request
  def setup_request(uri)
     http = Net::HTTP.new(uri.host, uri.port)
     http.use_ssl = true
     http.verify_mode = OpenSSL::SSL::VERIFY_PEER
     http
  end

# Make a Get Request
def make_get_request(endpoint, custom_params = {})
  request_params = base_params(endpoint, custom_params)
  query_string = request_params.to_query
  uri = URI('https://kyc.ost.com' + endpoint + "?" + query_string)
  http = setup_request(uri)
  result = http.get(uri)
  result
end  

# Get user kyc details for particular id
def get_user_kyc_detail(id)
  endpoint = "/api/#{@version}/users-kyc-detail/#{id}"
  make_get_request(endpoint)
end
```

A GET to `kyc.ost.com/api/v2/users-kyc-detail/{{user_id}}` retrieves the details of KYC data an existing user has submitted. You need to supply the user identifier that was returned while creating the user. 

<aside class="warning">The kyc data submitted by users is included in the response only based on KYC client's setting in the admin management dashboard. This adds an additional layer of security towards user's data protection.</aside>

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|user_id | integer | yes | A <u>unique</u> identifier of the user that is returned upon user creation.|


<u>**Returns**</u><br>

> Example Response 

```json
# If the setting in admin management dashboard if OFF
{
   "success": true,
   "data": {
      "result_type": "user_kyc_detail",
      "user_kyc": {
         "first_name": "yogesh",
         "last_name": "sawant",
         "ethereum_address": "0xEC305b4c269dEd899b6fBA12776fbbDBdC564793",
         "id": 727,
         "created_at": 1539622156
      }
   }
}

# If the setting in admin management dashboard if ON
# All fields in the response are not mandatory. They vary based on fields which KYC clients have selected for their users' kyc.
{
    "success": true,
    "data": {
        "result_type": "user_kyc_detail",
        "user_kyc_detail": {
            "id": 727,
            "created_at": 1539622156,
            "first_name": "yogesh",
            "last_name": "sawant",                 
            "birthdate": "23/07/1991",
            "country": "INDIA",
            "nationality": "INDIAN",
            "document_id_number": "Ab0bd1234",
            "document_id_file": "https://s3.amazonaws.com/kyc.stagingost.com/3/i/anm15395b85581eab3068cb43ftc0rt1_ROTATE_0?X-Amz-Algorithm=AWS4-HMAC-SHA256..",
            "selfie_file": "https://s3.amazonaws.com/kyc.stagingost.com/3/i/b3vvte895rt5581eab3068cb43ftc0vg1_ROTATE_0?X-Amz-Algorithm=AWS4-HMAC-SHA256..",
            "residence_proof_file": "https://s3.amazonaws.com/kyc.stagingost.com/3/i/bty153op985581eab3068cb43ftcqw21_ROTATE_0?X-Amz..",
            "investor_proof_files": [
                "https://s3.amazonaws.com/kyc.stagingost.com/3/i/a3991395b852serab3068cb43ftc0f61_ROTATE_0?X-Amz..",
                "https://s3.amazonaws.com/kyc.stagingost.com/3/i/a5565395b85581eiop3068cb43ftc0f61_ROTATE_0?X-Amz.."
            ],
            "ethereum_address": "0xEC305b4c269dEd899b6fBA12776fbbDBdC564793",
            "estimated_participation_amount": 1.1,
            "street_address": "Hadapsar",
            "city": "pune",
            "state": "Maharashtra",
            "postal_code": "411028"
        }
    }
}
```
For GET calls to `/users-kyc-detail/{{user_id}}` the data.result\_type is the string "user\_kyc\_detail" and the key in data is dependent on the setting done by the KYC client's in their admin management dashboard. 

If the setting to send KYC data is `ON` then the key data.user\_kyc\_detail is an array of returned **user\_kyc\_detail** object if a valid user identifier was provided.

If the setting to send KYC data is `OFF` then the key data.user\_kyc is an array of returned objects with a few default fields if a valid user identifier was provided.



# Users KYC Status
## The User KYC Object 
> Example Response:

```json
{
   "id": 304,
   "user_kyc_detail_id": 702,
   "user_id": 11430,
   "kyc_status": "pending",
   "admin_status": "unprocessed",
   "aml_status": "cleared",
   "whitelist_status": "unprocessed",
   "admin_action_types": [],
   "submission_count": 2,
   "last_acted_by": "",
   "created_at": 1539279352
}
```
|PARAMETER|TYPE|DESCRIPTION|
----------|----|------------
|id|integer| unique identifier of the last submitted kyc of a user |
|user\_kyc\_detail\_id| integer | A unique identifier of the `user kyc details` object that is returned upon submitting  a user's kyc details|
|user_id|integer| An unique identifier of the user that is returned upon user creation|
|kyc_status|string|A kyc status will be `pending` until it has been taken up for processing. If the KYC goes through successfully the status will change to `approved` otherwise `denied` |
|admin_status|string | Admin status is helpful for actors doing the KYC checks. `unprocessed` admin status indicates that the kyc entry needs to be taken care of. If any one of the admins approves a KYC entry the status changes to `qualified` and in case of a disapproval the status changes to `denied` |
|aml_status|string |AML status of KYC will be `unprocessed` until it has been taken up for processing. It changes to `pending` while the KYC is being processed. As a result of processing it is either `cleared` or `failed`. If a KYC is cleared via an AML check the admin actor does a manual check and further approves the submission and the status changes to `approved` or rejects the submission which changes the status to `rejected` |
|whitelist_status| string | Whitelisting status will be `unprocessed` until an approved KYC has been taken up for whitelisting. It changes to `started` while the whitelisting is in progress. Based on the result of whitelisting process the status is `done` if it finishes successfully or the status is `failed` if a technical issue occurs during the process of whitelisting. This is very rare but you will have to contact the OST KYC support team in such situation. |
|admin\_action\_types |array | An array that shows the different kyc issue emails that are sent to the user. The triggers to send emails are `data_mismatch` , `document_issue ` or an email with custom instructions with action type `other_issue` ] |
|submission_count | integer | A count of number of time KYC is submitted by a user| 
|last\_acted\_by | string | Name of the last admin actor who took an action on the KYC. `nil` value indicates the last action was by the ost kyc system or no action has been taken. |
|created_at | timestamp| timestamp at which user KYC was created. (epoc time in sec? millisecond?)| 


## Retrieve KYC Status 
> Example Request code:

```ruby
# setup http request
def setup_request(uri)
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http
end
# Make a Get Request
def make_get_request(endpoint, custom_params = {})
  request_params = base_params(endpoint, custom_params)
  query_string = request_params.to_query
  uri = URI('https://kyc.ost.com' + endpoint + "?" + query_string)
  http = setup_request(uri)
  result = http.get(uri)
  result
end   
# retrieve user kyc for particular user
def get_user_kyc(id)
  endpoint = "/api/#{@version}/users-kyc/#{id}"
  make_get_request(endpoint)
end
```

A user can submit their KYC details multiple times, a GET to `kyc.ost.com/api/v2/users-kyc/{{user_id}}` retrieves some properties and status related information of the last KYC that a user had submitted. This endpoint however doesn't returns `KYC data` submitted by users. You need to supply the identifier that was returned upon user creation for fetching the information.

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|user_id | integer | yes | An unique identifier of the user whose KYC status information is to be retrieved|

<u>**Returns**</u><br>
For api calls to `/users-kyc/{{user_id}}` the data.result\_type is the string "user_kyc" and the key data.user\_kyc is an array of returned user-kyc object if a valid identifier was provided. When the requesting ID of a user is not found a 404, resource could not be located error will be returned.

> Example Response

```json
{
   "success": true,
   "data": {
      "result_type": "user_kyc",
      "user_kyc": {
         "id": 304,
         "user_kyc_detail_id": 702,
         "user_id": 11430,
         "kyc_status": "pending",
         "admin_status": "unprocessed",
         "aml_status": "cleared",
         "whitelist_status": "unprocessed",
         "admin_action_types": [],
         "submission_count": 2,
         "last_acted_by": "",
         "created_at": 1539279352
      }
   }
}
```

## List KYC Statuses 
> Example Request code:

```ruby
# setup http request
def setup_request(uri)
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_PEER
  http
end
# Make a Get Request
def make_get_request(endpoint, custom_params = {})
  request_params = base_params(endpoint, custom_params)
  query_string = request_params.to_query
  uri = URI('https://kyc.ost.com' + endpoint + "?" + query_string)
  http = setup_request(uri)
  result = http.get(uri)
  result
end   
# list kyc status of users 
def get_users_kyc_list(custom_params = nil)
# default_params = {filters: {admin_status: 'unprocessed', aml_status: 'cleared'}}
  default_params = {}
  endpoint = "/api/#{@version}/users-kyc"
  custom_params = custom_params || default_params
  make_get_request(endpoint, custom_params)
end
```
A GET to `kyc.ost.com/api/v2/users-kyc` returns a list of all user-kyc objects. A `user-kyc` object provides some properties and status related information of the kyc details that a user had last submitted. The `user-kyc` objects are returned sorted by the date when the kyc details were first submitted, with the most recent `user-kyc` object appearing first.

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|filters | object | no | A filter on the list based on the object `filter` field. The value can be a boolean or a string |
|page\_number|integer|no | A field that helps in pagination. page\_number is an integer that defines the page of  the list to fetch. For instance, if you make a list request and receive 100 objects, each page sends 10 objects as default limit is 10. If you want to access 45th object your subsequent call can include page\_number=5 in order to fetch the 5th page of the list|
|order|string|no| A sort order to be applied based on the `user-kyc` entry creation time. default is desc ( asc / desc ) |
|limit|integer|no| A limit on the number of `user-kyc` objects to be sent in one request(min. 1, max. 100, default 10)|

<br>
<u>**Filter Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|admin_status| string | no | A filter on `user-kyc` admin status :<br> unprocessed, <br> qualified, <br> denied|
|aml_status|string|no| A filter on `user-kyc` aml\_status :<br> cleared:approved, <br> unprocessed, <br> pending, <br> cleared, <br> approved, <br> rejected, <br> failed.|
|whitelist_status|string| no | A filter on `user-kyc` whitelist\_status:<br>unprocessed, <br> started, <br> done, <br> failed.| 
|admin\_action\_types| string | no | A filter on `user-kyc` admin\_action_types:<br> no\_admin\_action, <br> data\_mismatch, <br> document\_issue, <br> other\_issue|

<br>
<u>**Returns**</u><br>
For api calls to `/users-kyc/` the data.result_type is the string "user_kyc" and the key data.user\_kyc is an array of the returned `user-kyc` objects (10 objects per page). The field data.meta.next_page_payload contains the filter and order information and the page_no number for the next page; or is empty for the last page of the list.

Each entry in the array is a separate user object. If no more user are available, the resulting array will be empty without an error thrown.

```json

```
