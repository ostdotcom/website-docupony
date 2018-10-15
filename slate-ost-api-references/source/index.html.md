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
|properties|array<strings>|Properties of the user: "kyc_submitted", "double_optin_mail_sent", "double_optin_done" . Remains empty when the user is created. |
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

A POST to `kyc.ost.com/api/v2/users` creates a new user object for the user in OST KYC database.

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|email | string | yes | A <u>unique</u> email id of the user whose KYC enrty has to be made|

<aside class="warning">Information about - this API would be useful to only API clients!!??</aside>

<u>**Returns**</u><br>
For api calls to `/users` the data.result\_type is the string "user" and the key data.user is an array of user objects. On successful creation of the user, user contains the created user as a single element. The returned user object will return an ID that can be used to fetch the full source details when retrieving the user.

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
  uri = URI('https://kyc.ost.com' + endpoint + request_params)
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
A POST to `kyc.ost.com/api/v2/users/{id}` retrieves the details of an existing user. You need to supply the identifier that was returned upon user creation.

<u>**Input Parameters**</u>

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|id | integer | yes | An unique identifier of the user whose information is to be retrieved|

<u>**Returns**</u><br>
For api calls to `/users` the data.result\_type is the string "user" and the key data.user is an array of returned user object if a valid identifier was provided. When the requesting ID of a user is not found a 404, resource could not be located error will be returned.

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