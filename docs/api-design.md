# QuickNotes API Design

## 1. Introduction

The QuickNotes API allows users to create, view, update, and delete notes. It follows REST principles and uses HTTP methods to communicate between the client and server.

The API exchanges data using JSON format.

## 2. API Endpoints

| HTTP Method | Endpoint         | Description                 | Success Status |
| ----------- | ---------------- | --------------------------- | -------------- |
| POST        | /auth/login      | Authenticate a user         | 200 OK         |
| GET         | /notes           | Retrieve all notes          | 200 OK         |
| GET         | /notes/{id}      | Retrieve one note by ID     | 200 OK         |
| POST        | /notes           | Create a new note           | 201 Created    |
| PUT         | /notes/{id}      | Update an existing note     | 200 OK         |
| DELETE      | /notes/{id}      | Delete a note               | 204 No Content |
| GET         | /tags            | Retrieve all available tags | 200 OK         |
| POST        | /notes/{id}/tags | Add a tag to a note         | 201 Created    |

## 3. Create Note Request Example

**Endpoint:** POST /notes

**Request Body:**

```json
{
  "title": "My First Note",
  "body": "This is my first QuickNotes entry.",
  "userId": 1
}
```

**Successful Response (201 Created):**

```json
{
  "id": 101,
  "title": "My First Note",
  "body": "This is my first QuickNotes entry.",
  "userId": 1
}
```

## 4. List Notes Request Example

**Endpoint:** GET /notes

**Successful Response (200 OK):**

```json
[
  {
    "id": 1,
    "title": "Learning JavaScript",
    "body": "JavaScript is used to build interactive websites.",
    "userId": 1
  },
  {
    "id": 2,
    "title": "Learning APIs",
    "body": "APIs allow applications to communicate.",
    "userId": 1
  }
]
```

## 5. Error Handling

The API uses HTTP status codes to communicate errors.

| Status Code | Meaning               | Description                          |
| ----------- | --------------------- | ------------------------------------ |
| 400         | Bad Request           | The request contains invalid data.   |
| 401         | Unauthorized          | The user is not authenticated.       |
| 403         | Forbidden             | The user does not have permission.   |
| 404         | Not Found             | The requested note does not exist.   |
| 500         | Internal Server Error | An unexpected server error occurred. |

### Example Error Response

```json
{
  "error": {
    "status": 400,
    "message": "The note title is required."
  }
}
```

## 6. Authentication and Security

The API uses authentication to protect private user information.

Authenticated requests include a Bearer token in the Authorization header.

Example:

```http
Authorization: Bearer <token>
```

Users should only be allowed to access and modify notes they have permission to use.

## 7. Conclusion

The QuickNotes API provides a simple RESTful structure for managing notes. It uses standard HTTP methods, JSON data, appropriate status codes, and error handling to support reliable communication between the client and server.
