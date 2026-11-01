# QuickNotes System Design

## Project Description

QuickNotes is a simple note-taking application that allows users to create, view, and delete notes using REST API requests.

This project demonstrates how a frontend application communicates with an API using HTTP methods such as GET, POST, and DELETE.

It also includes documentation covering REST API design, relational database design, and system architecture.

## Features

* Load notes from a REST API.
* Create new notes.
* Delete existing notes.
* Validate note titles.
* Display loading, success, and error messages.
* Handle empty note lists.
* Disable buttons while requests are processing.

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Fetch API
* JSONPlaceholder REST API
* Git and GitHub

## How to Run the Application

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html` using the Live Server extension.
4. Click **Load notes** to retrieve notes from the API.
5. Use the form to create a new note.
6. Click **Delete** to remove a note from the page.

## API Information

This project uses JSONPlaceholder as a testing API.

API endpoint:

`https://jsonplaceholder.typicode.com/posts`

**Important:** JSONPlaceholder simulates POST and DELETE operations. New notes and deleted notes are not permanently stored on its server.

## Project Documentation

The project includes three technical documents:

* [API Design](docs/api-design.md) – REST endpoints, request and response examples, and error handling.
* [Database Design](docs/data-model.md) – Database tables, relationships, SQL queries, and indexing.
* [System Architecture](docs/architecture.md) – System components, traffic estimates, request flows, and scalability strategies.

## What I Learned

Through this project, I learned:

1. How to use JavaScript Fetch API to communicate with a REST API.
2. How GET, POST, and DELETE HTTP methods work.
3. How to handle API responses, errors, and loading states.
4. How to design RESTful API endpoints.
5. How relational databases use primary keys, foreign keys, and relationships.
6. How system architecture supports scalability and reliability.
7. How to organize and document a software project using Markdown.

## Conclusion

This project helped me understand the connection between frontend applications, APIs, databases, and system architecture. It also improved my practical skills in JavaScript, API communication, and technical documentation.
