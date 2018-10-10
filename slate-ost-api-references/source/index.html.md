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

var custom_params = 'sample_email'
var api_key = 'API_KEY';  # Make sure to replace `API_KEY` with your API key.
var api_secret = 'API_SECRET'; # Make sure to replace `API_SECRET` with your API secret key.
var api_base_url = 'https://kyc.ost.com';
var version = 'v2';

# Generate Signature
def generate_signature(string_to_sign)
  digest = OpenSSL::Digest.new('sha256')
  puts "--------string_to_sign=>#{string_to_sign}-----"
  OpenSSL::HMAC.hexdigest(digest, @api_secret, string_to_sign)
end

# Create Base Parameters
def base_params(endpoint, custom_params = {})
  request_time = Time.now.to_i
  request_params = custom_params.merge("request_timestamp" => request_time, "api_key" => @api_key)
  query_param = request_params.to_query.gsub(/^&/, '')
  str = "#{endpoint}?#{query_param}"
  signature = generate_signature(str)
  request_params.merge!("signature" => signature)
  request_params
end

var endpoint = "/api/#{@version}/users"
var request_params = base_params(endpoint, custom_params);
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
 

## Users
### Add a User
> To create a user, use this code:

```ruby
# Post API URI object
def post_api_uri(endpoint)
  URI(@api_base_url + endpoint)
end
# Handle With Exception
def handle_with_exception(uri)
  begin
    Timeout.timeout(5) do
    http = setup_request(uri)
    result = yield(http)
      parse_api_response(result)
    end
  end
end
# Make a Post Request
def make_post_request(endpoint, custom_params = {})
  request_params = base_params(endpoint, custom_params)
  uri = post_api_uri(endpoint)
  result = handle_with_exception(uri) do |http|
    http.post(uri.path, request_params.to_query)
  end
  result
end  
# create user
def create_user(custom_params = {})
  endpoint = "/api/#{@version}/users"
  make_post_request(endpoint, custom_params)
end
```

A POST to `kyc.ost.com/api/v2/users` will create an entry for the user in OST KYC database.

Input Parameters

|Parameter| Type | Mandatory | Description | 
----------|------|-----------|--------------
|email | string | yes | A <u>unique</u> email id of the user whose KYC enrty has to be made|


For api calls to /users the data.result_type is the string "user" and the key data.user is an array of user objects. On successful creation of the user, user contains the created user as a single element.

> For above request following response is sent

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

### User Object Attributes
|PARAMETER|TYPE|DESCRIPTION|
----------|----|------------
|id|string| unique identifier for the user |
|email| string | Email Id of the user|
|properties|array<strings>|Properties of the user: "kyc_submitted", "double_optin_mail_sent", "double_optin_done" . Remains empty when the user is created. |
|created_at| timestamp |timestamp at which user was created. (epoc time in sec? millisecond?)|
