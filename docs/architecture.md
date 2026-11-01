# QuickNotes System Architecture

## 1. Introduction

QuickNotes is a note-taking application that allows users to create, view, update, and delete personal notes.

The system is designed to support up to one million users while maintaining good performance, availability, security, and reliability.

The architecture uses multiple application servers, caching, database replication, and background processing to support growth.

## 2. Functional Requirements

The system must allow users to:

1. Register and log in securely.
2. Create new notes.
3. View all their notes.
4. Search for notes.
5. Update existing notes.
6. Delete notes.
7. Organize notes using tags.
8. Access only notes they are authorized to view.

## 3. Non-Functional Requirements

The system should provide:

1. **Scalability:** Support one million registered users.
2. **Availability:** Remain accessible even if one application server fails.
3. **Performance:** Respond quickly to user requests.
4. **Security:** Protect user accounts and private notes.
5. **Reliability:** Prevent data loss and maintain database consistency.
6. **Maintainability:** Allow developers to update and improve the application.

## 4. Traffic and Storage Estimates

Assumptions for one million registered users:

* Total registered users: 1,000,000.
* Average reads per user per day: 20.
* Average new notes per user per day: 2.
* Average storage per note: 1 KB.
* Days per year: 365.
* Peak traffic multiplier: 5 times average traffic.

### A. Read Requests

1,000,000 users × 20 reads per day = 20,000,000 reads per day.

Average reads per second:

20,000,000 ÷ 86,400 = approximately 231 reads per second.

Peak reads per second:

231 × 5 = approximately 1,155 reads per second.

### B. Write Requests

1,000,000 users × 2 notes per day = 2,000,000 writes per day.

Average writes per second:

2,000,000 ÷ 86,400 = approximately 23 writes per second.

Peak writes per second:

23 × 5 = approximately 115 writes per second.

### C. Annual Storage

2,000,000 notes per day × 365 days = 730,000,000 notes per year.

Assuming each note requires approximately 1 KB:

730,000,000 × 1 KB = approximately 730 GB per year.

This estimate covers note content only. Actual storage will be higher because of indexes, metadata, backups, and database overhead.

## 5. System Architecture Diagram

The following diagram shows how the main components communicate.

```text
             USERS
               |
               v
          WEB / MOBILE
             CLIENT
               |
               v
              DNS
               |
               v
              CDN
               |
               v
        LOAD BALANCER
               |
          _____|_____
         |           |
         v           v
    APP SERVER 1  APP SERVER 2
         |           |
         |___________|
               |
          _____|_____
         |           |
         v           v
       CACHE     PRIMARY DATABASE
                     |
                     v
                READ REPLICA

         APP SERVER
               |
               v
          MESSAGE QUEUE
               |
               v
        BACKGROUND WORKER
```

## 6. Architecture Components

### 1. Client

The client is the web or mobile application that users interact with to manage their notes.

### 2. DNS (Domain Name System)

DNS translates the application domain name into the IP address of the service.

### 3. CDN (Content Delivery Network)

The CDN delivers static files such as CSS, JavaScript, and images from locations closer to users.

### 4. Load Balancer

The load balancer distributes incoming requests across multiple application servers to prevent one server from becoming overloaded.

### 5. Application Servers

At least two application servers process requests, apply business rules, authenticate users, and communicate with the database.

### 6. Cache

The cache stores frequently accessed information temporarily to reduce database queries and improve response times.

### 7. Primary Database

The primary database stores permanent application data, including users, notes, and tags. It handles write operations.

### 8. Read Replica

The read replica receives copies of database changes from the primary database and handles read requests to reduce the primary database workload.

### 9. Message Queue

The message queue stores background tasks so that they can be processed asynchronously without delaying the user's request.

### 10. Background Worker

The background worker processes queued tasks such as sending notifications, generating reports, and performing scheduled maintenance.

## 7. Request Flow Examples

### A. GET /notes (Read Request)

When a user wants to view their notes:

1. The user opens the QuickNotes application.
2. DNS resolves the application domain.
3. The CDN delivers static application files.
4. The request reaches the load balancer.
5. The load balancer forwards the request to an available application server.
6. The application server authenticates the user.
7. The server checks whether the requested notes are available in the cache.
8. If the notes are not cached, the application retrieves them from the read replica.
9. The server returns the notes to the client as JSON.
10. The client displays the notes.

### B. POST /notes (Write Request)

When a user creates a new note:

1. The user submits a new note through the application.
2. The request reaches the load balancer.
3. The load balancer forwards it to an application server.
4. The application server authenticates the user and validates the note.
5. The server saves the new note in the primary database.
6. The database confirms that the note was created.
7. The application returns a successful response with HTTP status 201 Created.
8. The application may invalidate or update the related cache entry.
9. Any additional background task can be placed in the message queue.
10. A background worker processes queued tasks.

## 8. Scalability Strategies

QuickNotes uses several strategies to support increasing traffic:

1. **Horizontal scaling:** Add more application servers when traffic increases.
2. **Caching:** Store frequently requested data to reduce database workload.
3. **Database replication:** Use read replicas to handle additional read traffic.
4. **Load balancing:** Distribute requests across multiple servers.
5. **Asynchronous processing:** Use queues and background workers for tasks that do not need to finish during the user's request.
6. **CDN:** Deliver static content efficiently to users in different locations.

## 9. Trade-offs and Design Decisions

### SQL Database

A relational database is selected because QuickNotes has structured data and relationships between users, notes, and tags.

The trade-off is that database scaling and schema changes can require additional planning.

### Caching

Caching improves performance and reduces database workload.

However, cached information can become outdated. Cache invalidation is necessary when notes are updated or deleted.

### Read Replicas

Read replicas improve read performance and reduce pressure on the primary database.

However, replication may introduce a small delay before new changes appear in read queries.

### Multiple Application Servers

Using multiple application servers improves availability and supports horizontal scaling.

However, it increases infrastructure and maintenance costs.

### Message Queues

Queues allow background tasks to run independently of user requests.

However, the system must handle failed tasks, retries, and duplicate processing.

## 10. Avoiding Single Points of Failure

A single point of failure is a component whose failure can make the entire system unavailable.

QuickNotes reduces this risk by:

1. Using at least two application servers.
2. Using a load balancer to distribute traffic.
3. Maintaining database backups.
4. Using database replication and a recovery plan for primary database failure.
5. Running background workers with retry mechanisms.
6. Monitoring infrastructure and application health.

The load balancer and other critical infrastructure should also have redundancy or managed failover.

## 11. Conclusion

The QuickNotes architecture combines load balancing, multiple application servers, caching, database replication, and background processing.

These components help the application handle increasing traffic while maintaining performance, reliability, security, and availability.

The proposed architecture provides a foundation for growing QuickNotes to support one million registered users.
