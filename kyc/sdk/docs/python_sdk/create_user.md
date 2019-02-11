---
id: create_user
title: Create User
sidebar_label: Create User
---

In order to create a user entity, we will have to use `Users` service provided by SDK. `Users` service is only used to create primary user entity that will only strore email address of a user.

In order to craete a user for KYC, following steps

## Input Data


## Sample Code
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
print(user) # Print the newly created user object

```
**Don't forget to replace your `API keys` while initializing SDK.**

## Output
If we run the above code, the output will be:


```
{
	'success': True, 
	'data': {
		'result_type': 'user',
		'user': {'id': 11833, 
	 			'email': 'bob@example-domain.com', 
	 			'properties': [], 
	 			'created_at': 1549873046
		 		}
			}
}
```

