# QuickNotes Database Design

## 1. Introduction

QuickNotes uses a relational database to store user accounts, notes, and tags. The database is designed to organize information, reduce duplication, and maintain relationships between records.

The four main tables are:

* Users
* Notes
* Tags
* Note_Tags

## 2. Database Tables

### A. Users Table

Stores information about registered users.

| Column        | Data Type    | Key         | Description             |
| ------------- | ------------ | ----------- | ----------------------- |
| id            | INTEGER      | Primary Key | Unique user ID          |
| name          | VARCHAR(100) |             | User's full name        |
| email         | VARCHAR(150) | UNIQUE      | User's email address    |
| password_hash | VARCHAR(255) |             | Encrypted password hash |
| created_at    | TIMESTAMP    |             | Account creation date   |

### B. Notes Table

Stores notes created by users.

| Column     | Data Type    | Key         | Description           |
| ---------- | ------------ | ----------- | --------------------- |
| id         | INTEGER      | Primary Key | Unique note ID        |
| user_id    | INTEGER      | Foreign Key | References users.id   |
| title      | VARCHAR(100) |             | Note title            |
| body       | TEXT         |             | Note content          |
| created_at | TIMESTAMP    |             | Date note was created |
| updated_at | TIMESTAMP    |             | Date note was updated |

### C. Tags Table

Stores available note categories or tags.

| Column | Data Type   | Key         | Description   |
| ------ | ----------- | ----------- | ------------- |
| id     | INTEGER     | Primary Key | Unique tag ID |
| name   | VARCHAR(50) | UNIQUE      | Tag name      |

### D. Note_Tags Table

Connects notes and tags. This table handles the many-to-many relationship between notes and tags.

| Column  | Data Type | Key                      | Description         |
| ------- | --------- | ------------------------ | ------------------- |
| note_id | INTEGER   | Primary Key, Foreign Key | References notes.id |
| tag_id  | INTEGER   | Primary Key, Foreign Key | References tags.id  |

The combination of note_id and tag_id forms a composite primary key.

## 3. Database Relationships

The database has the following relationships:

1. One user can create many notes (one-to-many).
2. One note can have many tags.
3. One tag can belong to many notes.
4. Notes and tags have a many-to-many relationship through the Note_Tags table.

The Note_Tags junction table prevents unnecessary duplication.

## 4. SQL CREATE TABLE Statements

The following SQL statements create the four database tables.

### Create Users Table

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Create Notes Table

```sql
CREATE TABLE notes (
    id INTEGER PRIMARY KEY,
    user_id INTEGER NOT NULL,
    title VARCHAR(100) NOT NULL,
    body TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Create Tags Table

```sql
CREATE TABLE tags (
    id INTEGER PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);
```

### Create Note_Tags Table

```sql
CREATE TABLE note_tags (
    note_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (note_id, tag_id),
    FOREIGN KEY (note_id) REFERENCES notes(id),
    FOREIGN KEY (tag_id) REFERENCES tags(id)
);
```

## 5. SQL Query Examples

### Query 1: Retrieve all notes

This query retrieves all notes belonging to a specific user.

```sql
SELECT *
FROM notes
WHERE user_id = 1;
```

### Query 2: Find a note by its ID

This query retrieves one specific note.

```sql
SELECT *
FROM notes
WHERE id = 10;
```

### Query 3: Retrieve notes with their tags (JOIN)

This query combines notes, note_tags, and tags to display each note with its associated tags.

```sql
SELECT
    notes.title,
    tags.name AS tag_name
FROM notes
JOIN note_tags ON notes.id = note_tags.note_id
JOIN tags ON note_tags.tag_id = tags.id;
```

## 6. Database Indexing

An index should be created on the user_id column in the notes table.

```sql
CREATE INDEX idx_notes_user_id
ON notes(user_id);
```

### Why is this index important?

The index improves the speed of retrieving notes belonging to a particular user. Without an index, the database may need to scan many records to find the notes.

This becomes especially important when the application has many users and notes.

## 7. Why Choose SQL Instead of NoSQL?

QuickNotes uses a relational SQL database because:

1. **Structured data:** Users, notes, and tags have clear relationships.
2. **Data consistency:** Primary keys and foreign keys help maintain accurate relationships.
3. **Reduced duplication:** Normalization avoids storing the same information repeatedly.
4. **Reliable transactions:** SQL databases support transactions to protect data integrity.
5. **Powerful queries:** JOIN operations make it easy to retrieve notes together with their tags.

A NoSQL database can be useful for flexible or rapidly changing data structures. However, SQL is a better choice for QuickNotes because its data has clear relationships and requires consistency.

## 8. Conclusion

The QuickNotes database uses four related tables to organize users, notes, and tags. Primary keys, foreign keys, indexing, and SQL queries help make the database organized, efficient, and reliable.
