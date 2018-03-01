---
id: authentication
title: Authentication 
sidebar_label:Authentication
---

For being able to use and run the APIs provided in this documentation. You need to authenticate your account by including the API signature in each API request. You can get your API secret-key in the OST KIT alpha developers [page](https://ostkit.com/developers).  Please be sure to keep your API keys safely. Do not share your secret API keys in publicly accessible areas such as GitHub, Google docs etc. In case you think that your secret key has been compromised please generate a new API secret key using this link.

To generate the API signature follow the steps below:

## 1. String-to-Sign Concatenation 

### Endpoint 
The URL endpoint. 
```url
https://ost.com/api
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
string_to_sign = https://ost.com/::1519281513::{“ethereum_address” => “0xccf5571277b74586733de2e68064ab234ef2a9a8”}
```


## 2. Generating the Signature.

The signature can be generated using the OST KIT ruby [sdk](https://github.com/OpenSTFoundation/ost-sdk-ruby) or in case you are using a language other than ruby the signature can be generated as seen below by an _Hmac_Sha256_Hexdigest_ function of the _string-to-sign_ and the _api_secret_ provided by libraries in other languages.   

_generated-signature_ = _Hmac_Sha256_Hexdigest(string-to-sign, api-secret)_
	
### Final Request Url

The url that should be used to make the API call.

```url
https://sale.simpletoken.org/api/v1/kyc/add-kyc/?api_key=your-key&signature=generated-signature&request_time=2018-01-01T16:40:50+05:30&api_parameters
```

Please ensure that the final URL is encoded while making the API request.
Find below a sample Ruby code that can be used to achieve the same :

```ruby
def generate_signature(api_secret, string_to_sign)
    digest = OpenSSL::Digest.new('sha256')
    OpenSSL::HMAC.hexdigest(digest, api_secret, string_to_sign)
End
```


## 3. Adding Parameter to the API call. 

With each api endpoint these are the three additional parameters that you will need to add. 

```javascript
{"request-timestamp" => request_timestamp, "signature" => signature, "api-key" => api_key}
```

## 4. Next Steps

If the authentication is not working correctly, please procced to the Error handling [documentation](http://localhost:3000/ostkit-restful-api/docs/error.html) to read more about what could have gone wrong. Else please proceed to either [Starting Overview](http://localhost:3000/ostkit-restful-api/docs/started.html) or [User API](http://localhost:3000/ostkit-restful-api/docs/user.html).
