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

{
  "fullname": {
    "firstname": "string (min: 3 characters, required)",
    "lastname": "string (min: 3 characters, optional)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}

#### Error Responses:
1. **Validation Errors:**
 - **Status Code:** `400 Bad Request`
 - **Response Body:**
   {
     "errors": [
       {
         "msg": "string (error message)",
         "param": "string (field name)",
         "location": "string (body)"
       }
     ]
   }

2. **Missing Required Fields:**
 - **Status Code:** `400 Bad Request`
 - **Response Body:**
   {
     "error": "All fields are required"
   }

---

### Example Request:

#### Request Body:
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

---

# User Login Endpoint Documentation

## Endpoint: `/users/login`

### Description:
This endpoint is used to authenticate an existing user. It validates the input data, checks the credentials, and returns a JSON Web Token (JWT) along with the user details upon successful login.

---

### HTTP Method:
**POST**

---

### Request Body:
The following fields are required in the request body:

{
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)"
}

#### Error Responses:
1. **Validation Errors:**
 - **Status Code:** `400 Bad Request`
 - **Response Body:**
   {
     "errors": [
       {
         "msg": "string (error message)",
         "param": "string (field name)",
         "location": "string (body)"
       }
     ]
   }

2. **Invalid Credentials:**
 - **Status Code:** `401 Unauthorized`
 - **Response Body:**
   {
     "message": "Invalid email or password"
   }

---

### Example Request:

#### Request Body:
{
  "email": "john.doe@example.com",
  "password": "password123"
}

#### Example Response:
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

```
# User Profile Endpoint Documentation

## Endpoint: `/users/profile`

### Description:
This endpoint retrieves the profile information of the authenticated user. It requires a valid JWT token for access.

```

### HTTP Method:
**GET**

---
```
### Authentication:
This endpoint requires authentication via a JWT token, which should be included in the request headers or cookies.

```

### Example Request:
**Headers:**
```
Authorization: Bearer <token>
```

### Example Response:
{
  "_id": "644b0c8b8f1b2c001c8e4d9a",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}

```
```

# User Logout Endpoint Documentation

```
## Endpoint: `/users/logout`

### Description:
This endpoint logs out the authenticated user by clearing the JWT token from the cookies and blacklisting it to prevent further use.

```

### HTTP Method:
**GET**

```

### Authentication:
This endpoint requires authentication via a JWT token, which should be included in the request headers or cookies.

```

### Example Request:
**Headers:**
```
Authorization: Bearer <token>
```

### Example Response:
{
  "message": "Logged out successfully"
}
```