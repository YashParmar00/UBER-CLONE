# User Registration Endpoint Documentation

## Endpoint: `/users/register`

### Description:
This endpoint is used to register a new user in the system. It validates the input data, hashes the password, and creates a new user in the database. Upon successful registration, it returns a JSON Web Token (JWT) and the user details.

---

### HTTP Method:
**POST**

---

### Request Body:
The following fields are required in the request body:

```json
{
  "fullname": {
    "firstname": "string (min: 3 characters, required)",
    "lastname": "string (min: 3 characters, optional)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}
```

#### Error Responses:
1. **Validation Errors:**
 - **Status Code:** `400 Bad Request`
 - **Response Body:**
   ```json
   {
     "errors": [
       {
         "msg": "string (error message)",
         "param": "string (field name)",
         "location": "string (body)"
       }
     ]
   }
   ```

2. **Missing Required Fields:**
 - **Status Code:** `400 Bad Request`
 - **Response Body:**
   ```json
   {
     "error": "All fields are required"
   }
   ```

---

### Example Request:

#### Request Body:
```json
{
"fullname": {
  "firstname": "John",
  "lastname": "Doe"
},
"email": "john.doe@example.com",
"password": "password123"
}
```

#### Example Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "644b0c8b8f1b2c001c8e4d9a",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```