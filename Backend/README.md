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

```

# Captain Routes Documentation

## Overview
This document provides detailed information about the captain-related routes in the UBER CLONE backend application. It includes the endpoints for registering a captain, along with the required request formats, response formats, and error handling.

---

## Endpoint: `/captains/register`

### Description
This endpoint is used to register a new captain in the system. It validates the input data, hashes the password, and creates a new captain in the database. Upon successful registration, it returns a JSON Web Token (JWT) and the captain details.

### HTTP Method
**POST**

### Request Body
The following fields are required in the request body:

```json
{
  "fullname": {
    "firstname": "string (min: 3 characters, required)",
    "lastname": "string (min: 3 characters, optional)"
  },
  "email": "string (valid email format, required)",
  "password": "string (min: 6 characters, required)",
  "vehicle": {
    "color": "string (min: 3 characters, required)",
    "plate": "string (min: 3 characters, required)",
    "capacity": "number (min: 1, required)",
    "vehicleType": "string (must be one of ['car', 'motorcycle', 'auto'], required)"
  }
}
```

### Error Responses
1. **Validation Errors:**
   - **Status Code:** `422 Unprocessable Entity`
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

2. **Captain Already Exists:**
   - **Status Code:** `409 Conflict`
   - **Response Body:**
   ```json
   {
     "message": "Captain already exists"
   }
   ```

### Example Request
#### Request Body
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "XYZ 123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

### Example Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "captain": {
    "_id": "644b0c8b8f1b2c001c8e4d9a",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plate": "XYZ 123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

---

## Authentication
This endpoint does not require authentication for registration. However, subsequent operations related to the captain will require a valid JWT token.

---

## Conclusion
This documentation outlines the registration process for captains in the UBER CLONE backend application. Ensure that all required fields are provided in the correct format to avoid validation errors.