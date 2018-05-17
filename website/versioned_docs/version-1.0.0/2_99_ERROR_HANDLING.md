---
id: version-1.0.0-api_error_handling
title: OST KIT⍺ API | Error Handling
sidebar_label: Error Handling
original_id: api_error_handling
---

We use HTTP response status codes to indicate the success or failure of an API request. OST KIT⍺ returns `4xx` or `5xx` status codes.

In reponse to failed requests an error object is included in the response body that includes additional error details in this format : 

```json
{
  "success": false,
  "err": {
    "code": "SHORT STRING CODE",
    "msg": "ERROR DESCRIPTION",
    "internal_id": "internal debug info code",
    
    // Some types of errors also include an error_data array 
    //that gives additiional information at parameter level:
    "error_data": [
      {
        "parameter": "field name",
        "msg": "problem with the field"
      }
      ]
  }
}
```

We return following HTTP status codes and corresponding short string codes for failed requests:

| HTTP status code | String codes | Error messages | Cause and actionable steps |
|------------------|--------------|---------------|--------------|
| 400 | BAD_REQUEST  | At least one parameter is invalid or missing. See "err.error_data" array for more details. |  Check the API Documentation for the endpoint to see which values are required. To prevent validation errors, ensure that parameters are of the right type.| 
| 401 | UNAUTHORIZED | We could not authenticate the request. Please review your credentials and authentication method |   Check [<u>Authentication</u>](/docs/api_authentication.html) to understand the API signature generation steps.
| 404 | NOT_FOUND    | The requested resource could not be located. | Please check the information provided. The server did not find anything that matches the request URI. Either the URI is incorrect or the resource is not available. For example, in-correct 'id' passed while retrieving a user. |
| 422 | INSUFFICIENT_FUNDS | The account executing the transaction or transfer does not have sufficient funds to complete the transaction or transfer. |  You'll need to add funds to your account or reduce the amount and send the request again. | 
|     | UNPROCESSABLE_ENTITY | An error occurred while processing the request.  |  The API cannot complete the requested action, might require interaction with processes outside of the current request OR is failing business validations thats not a 400 type of validation. Check the information provided or get in touch on [<u>help.ost.com</u>](https://help.ost.com)|
| 500 | INTERNAL_SERVER_ERROR | Something went wrong | This is usually a temporary error, when the endpoint is temporarily having issues. Check in the gitter forums in case others are having similar issues or try again later. If the problem persists log a ticket on [<u>help.ost.com</u>](https://help.ost.com) | 


>_last updated 17 May 2018_; for support see [<u>help.ost.com</u>](https://help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2
