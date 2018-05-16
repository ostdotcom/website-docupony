---
id: version-1.0.0-api_error_handling
title: OST KIT⍺ API | Error Handling
sidebar_label: Error Handling
original_id: api_error_handling
---

We use HTTP response status codes to indicate the success or failure of an API request. OST returns `4xx` or `5xx` status codes.

In reponse to failed requests an error response body if sent that includes additional error details in this format : 

```json
{
  "success": false,
  "err": {
    "code": "SHORT STRING CODE",
    "msg": "ERROR DESCRIPTION",
    "internal_id": "debug info code",
    // Some types of errors also include an error_data array that gives additiional information at parameter level:
    "error_data": [
      {
        "parameter": "field name",
        "msg": "problem_with_the_field"
      }
      ]
  }
}
```

Some 4xx error are too broad 
so we have included short string codes so that they can be handled programatically. Below is the list of error
codes corresponding HTTP response status codes along with error messages to help in recovering from errors.


| HTTP status code | String codes | Error messages | Cause and actionable steps |
|------------------|--------------|---------------|--------------|
| 400 | BAD_REQUEST  | At least one parameter is invalid or missing. See "err.error_data" array for more details. |  Check our API Documentation to see which values are required or modify the specified resource.| 
| 401 | UNAUTHORIZED | We could not authenticate the request. Please review your credentials and authentication method | Check 'authentication' page in our API Documentation to see how to generate API signature. |
| 404 | NOT_FOUND    | The requested resource could not be located. | Please check the information provided and try again. |
| 422 | INSUFFICIENT_FUNDS | The account executing the transaction or transfer does not have sufficient funds to complete the transaction or transfer. |  Reduce the amount to transfer and execute the request again. | 
|     | UNPROCESSABLE_ENTITY | An error occurred while processing the request.  | Check the information provided and try again.|
| 500 | INTERNAL_SERVER_ERROR | Something went wrong | This is usually a temporary error, when the endpoint is temporarily having issues. Check in the gitter forums in case others are having similar issues or try again later. If the problem persists log a ticket on [help.ost.com](help.ost.com) | 


>_last updated 17th May 2018_; for support see [help.ost.com](help.ost.com)
>
> OST KIT⍺ sandboxapi v1 | OpenST Platform v0.9.2