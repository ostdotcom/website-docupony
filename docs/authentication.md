---
id: authentication
title: Authentication 
sidebar_label:Authentication
---

For being able to use and run the API in [getting started](http://localhost:3000/ostkit-restful-api/docs/started.html) provided in this documentation. You will need to authenticate your account by including the API signature in each API request. You can get your API secret-key in the OST KIT⍺ developers [page](https://kit.stagingost.com/).  Please be sure to keep your API keys safely. Do not share your secret API keys in publicly accessible areas such as GitHub, Google docs etc. In case you think that your secret key has been compromised please generate a new API secret key as soon as possible from the OST KIT⍺ [Dashboard](https://kit.stagingost.com/dashboard).

To generate the API signature follow the steps below:

## 1. String-to-Sign Concatenation 

### API Endpoint 
The API URL endpoint. 
```url
https://kit.stagingost.com/api
```

### API Request timestamp
The timestamp of the API request.
```javascript 
Request_timestamp : “1519281513”
````

### API Parameters  
The parameters of the API call itself. 
```javascript
parameters : {“ethereum_address” => “0xccf5571277b74586733de2e68064ab234ef2a9a8”}
```

#### String to Sign
The sting to sign can be generated using the following concatenation strategy. 

`string_to_sign` = `Endpoint`+'::'+`Request_timestamp`+'::'+`parameters` 

In this case the formula leads to the following.

```javascript
string_to_sign = https://kit.stagingost.com/api::1519281513::{“ethereum_address” => “0xccf5571277b74586733de2e68064ab234ef2a9a8”}
```


## 2. Generating the Signature.

The signature can be generated using the OST ruby [sdk](https://github.com/OpenSTFoundation/ost-sdk-ruby) or in case you are using a language other than ruby, the signature can be generated as seen below by an _Hmac_Sha256_Hexdigest_ function, the arguments of which are the _string-to-sign_ and the _api_secret_ . An equivalent of the same is provided on this [page](https://github.com/danharper/hmac-examples) for all other lanaguages.    

The function as described :
_generated-signature_ = _Hmac_Sha256_Hexdigest(string-to-sign, api-secret)_

Find below a sample Ruby code that can be used to achieve the same :

```ruby
def generate_signature(api_secret, string_to_sign)
    digest = OpenSSL::Digest.new('sha256')
    OpenSSL::HMAC.hexdigest(digest, api_secret, string_to_sign)
End
```
	
### Final Request Url

The final url that should be used to make the API call.


`https://kit.stagingost.com/api/?api_key=your-key&signature=generated-signature&request_time=2018-01-01T16:40:50+05:30&api_parameters`


Please ensure that the final URL is encoded in this format while making the API request.


## 3. Adding API Parameters. 

With each api endpoint these are the three additional parameters that you will need to add. 

```javascript
{"request-timestamp" => request_timestamp, "signature" => signature, "api-key" => api_key}
```

## 4. Next Steps

If the authentication is not working correctly, please procced to the Error handling [documentation](http://localhost:3000/ostkit-restful-api/docs/error.html) to read more about what could have gone wrong. Else please proceed to either [Starting Overview](http://localhost:3000/ostkit-restful-api/docs/started.html) or [User API](http://localhost:3000/ostkit-restful-api/docs/user.html).
