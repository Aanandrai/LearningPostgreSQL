# LearningPostgreSQL User API

A simple RESTful API for managing users(CRUD), built with Express and PostgreSQL using node pg.

## Table of Contents

- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
  - [Create User](#create-user)
  - [Get All Users](#get-all-users)
  - [Get User By ID](#get-user-by-id)
  - [Update User](#update-user)
  - [Delete User](#delete-user)
- [Response Format](#response-format)
- [Error Handling](#error-handling)

---

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up your `.env` file with PostgreSQL credentials and `PORT`.
4. Start the server:
   ```sh
   npm run dev
   ```

---

## API Endpoints

### Create User

- **URL:** `/user`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "statusCode": 200,
      "message": "User created successfully",
      "success": true,
      "data": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "created_at": "2024-06-01T12:00:00.000Z"
      }
    }
    ```
  - **Errors:**
    - Missing fields: 401
    - Duplicate email: 400

---

### Get All Users

- **URL:** `/user`
- **Method:** `GET`
- **Request Body:** _None_
- **Response:**
  - **Success (200):**
    ```json
    {
      "statusCode": 200,
      "message": "User retrieve successful",
      "success": true,
      "data": [
        {
          "id": 1,
          "name": "John Doe",
          "email": "john@example.com",
          "created_at": "2024-06-01T12:00:00.000Z"
        },
        ...
      ]
    }
    ```

---

### Get User By ID

- **URL:** `/user/:id`
- **Method:** `GET`
- **Request Params:**
  - `id` (integer): User ID
- **Response:**
  - **Success (200):**
    ```json
    {
      "statusCode": 200,
      "message": "User fetched successfully",
      "success": true,
      "data": {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "created_at": "2024-06-01T12:00:00.000Z"
      }
    }
    ```
  - **Error:** User not found (404)

---

### Update User

- **URL:** `/user/:id`
- **Method:** `PUT`
- **Request Params:**
  - `id` (integer): User ID
- **Request Body:** (at least one field required)
  ```json
  {
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
  ```
- **Response:**
  - **Success (200):**
    ```json
    {
      "statusCode": 200,
      "message": "User Updated successfull",
      "success": true,
      "data": {
        "id": 1,
        "name": "Jane Doe",
        "email": "jane@example.com",
        "created_at": "2024-06-01T12:00:00.000Z"
      }
    }
    ```
  - **Errors:**
    - User not found: 404
    - Email already exists: 401

---

### Delete User

- **URL:** `/user/:id`
- **Method:** `DELETE`
- **Request Params:**
  - `id` (integer): User ID
- **Response:**
  - **Success (200):**
    ```json
    {
      "statusCode": 200,
      "message": "User deleted successful",
      "success": true,
      "data": {
        "id": 1,
        "name": "Jane Doe",
        "email": "jane@example.com",
        "created_at": "2024-06-01T12:00:00.000Z"
      }
    }
    ```
  - **Error:** User not found (404)

---

## Response Format

All responses follow this structure:

```json
{
  "statusCode": 200,
  "message": "Some message",
  "success": true,
  "data": { ... } // or array or null
}
```

## Error Handling

Errors return a similar structure with `success: false` and appropriate `statusCode` and `message`.

---

## Notes

- All endpoints expect and return JSON.
- Make sure to provide all required fields in the request body.
- Unique constraint on `email` field.

---

## Author

- Your Name
