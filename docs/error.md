---
id: error
title: Error Handling
sidebar_label:Error Handling
---

OST KIT alpha uses conventional HTTP response codes to indicate the success or failure of an API request. In general, codes in the 2xx range indicate successes, codes in the 4xx range indicate errors, with the error information provided and codes in the 5xx range indicate an error with OST's servers while these are rare. The codes are used internally, for debugging purposes.


## HTTP Status Codes

| Error Code                         | Description                                          |
|------------------------------------|--------------------------------------------------------------------------|
| 200 - OK                           | Everything worked as expected.                                           |
| 400 - Bad Request                  | The request was unacceptable, often due to missing a required parameter. |
| 401 - Unauthorized                 | No valid API key provided.                                               |
| 404 - Not Found                    | The requested resource doesn't exist.                                    |
| 500, 502, 503, 504 <br> OST Server Errors | Something went wrong on OST's end. (These are rare.)                     |

Not all errors map cleanly onto HTTP response codes. However, when a request is valid but is not completed successfully. A, `success => false` is returned in the response.

The user might still recieve a 200-OK for the request, but for one of the parameters, the `success` value will be false. To understand better the error there are other attributes in the response code which can be referred to.

### Error Attributes

| Attributb                         | Description                                          |
|------------------------------------|--------------------------------------------------------------------------|
| _success_ | The status of the API call. values are _true_ or _false_ depending on if the API went through or not. |
| _code_ | The kind of error that occurred. Used internally at OST for troubleshooting. |
| _display_text_ | The description of the error that occurred. This can be used to display the message near the appropriate form field for example. These messages are generic. |
| _display_heading_|The kind of error that occurred. You can use this to the display value header of the error message pop-up. |
| _Error_data_ (optional) | This relates to parameter specific errors. It is a key-value pair where the key will be the parameter name and the corresponding error string for it. This can be used to display specific messages at appropriate user interface and be used to show errors in form fields.|


### Response Format
```javascript
{:success=>false,
 :err=>
  {:code=>"sd",
   :display_text=>"Something went wrong.",
   :display_heading=>"Error.",
   :error_data=>{}},
 :data=>{}}
 ```

### Updates

We shall send information on new additions and changes to API and language libraries to the be sure to [subscribe](https://kit.stagingost.com/) to stay informed or send us an [email](pranay@ost.com).
