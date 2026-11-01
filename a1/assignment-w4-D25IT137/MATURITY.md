# Richardson Maturity Model Evaluation & HATEOAS Analysis

**Student Roll No**: D25IT137  
**Assignment**: Week 4 Assignment 1 (A1) - Richardson Maturity Model Evaluation  
**Course**: Advanced Web Development Frameworks (ITUE301)

---

## 1. Richardson Maturity Model (RMM) Evaluation Table

| Level | Criterion | Does API Satisfy? | Evidence & Explanation |
|---|---|---|---|
| **Level 0** | **The Swamp of POX (Single URI & HTTP POST)** | **Yes** *(Passed & Exceeded)* | The API does not use a single endpoint like `/api` for all operations. It uses individual resource URIs (`/tasks`, `/tasks/:id`). |
| **Level 1** | **Resources (Separate URIs for individual entities)** | **Yes** | Tasks are exposed as discrete resource URIs (`/tasks` for collection, `/tasks/:id` for specific task resources). |
| **Level 2** | **HTTP Verbs & Status Codes** | **Yes** | Standard HTTP verbs are strictly mapped (`GET` to fetch, `POST` to create, `PUT` to update, `DELETE` to remove) and meaningful status codes are returned (`200 OK`, `201 Created`, `400 Bad Request`, `404 Not Found`, `500 Internal Server Error`). |
| **Level 3** | **HATEOAS (Hypermedia As The Engine Of Application State)** | **No** *(Targeted for awareness)* | Response payloads currently contain raw resource data without hypermedia `_links` navigation objects pointing to available actions/next states. |

---

## 2. API Level Conclusion & Justification

The Task Management API built in Practical 4 **satisfies Level 2** of the Richardson Maturity Model.

### Level 2 Compliance Justification:
1. **HTTP Verbs Usage**:
   - `GET /tasks` -> Retrieves task list (Idempotent & Safe).
   - `POST /tasks` -> Creates a new task (Non-idempotent).
   - `PUT /tasks/:id` -> Replaces/updates an existing task.
   - `DELETE /tasks/:id` -> Removes a task by ID.
2. **Proper HTTP Status Codes**:
   - `200 OK` on successful GET, PUT, and DELETE operations.
   - `201 Created` upon successful task creation via POST.
   - `400 Bad Request` when request validation fails (e.g. invalid task ID format or missing `Content-Type: application/json` header).
   - `404 Not Found` when a requested task ID or route path does not exist.
   - `500 Internal Server Error` on server failures handled centrally without revealing stack traces.

---

## 3. Level 3: HATEOAS Awareness & Representation

To elevate the API from **Level 2 to Level 3**, response payloads must include **Hypermedia Controls** (`_links`), allowing clients to dynamically discover available actions without hardcoding API endpoints.

### Example Level 3 Task Response Payload:

```json
{
  "id": "123",
  "title": "Task A",
  "completed": false,
  "_links": {
    "self": { "href": "/tasks/123", "method": "GET" },
    "update": { "href": "/tasks/123", "method": "PUT" },
    "delete": { "href": "/tasks/123", "method": "DELETE" },
    "collection": { "href": "/tasks", "method": "GET" }
  }
}
```

---

## 4. Analysis: Why Most Production APIs Stop at Level 2

While Level 3 (HATEOAS) offers self-describing APIs and decouples client route configurations, the vast majority of real-world production REST APIs stop at **Level 2** for the following key reasons:

1. **Payload Overhead & Bandwidth**: Adding `_links` objects to every item in large JSON arrays increases payload size, consuming additional bandwidth and parsing overhead on mobile and web clients.
2. **Client Complexity**: Front-end applications (React, Angular, Mobile Apps) almost always hardcode client-side routing and API service calls. Parsing dynamic hypermedia links from responses introduces extra code complexity with minimal practical benefit.
3. **API Documentation Standards**: Modern OpenAPI / Swagger specifications provide clear, versioned documentation out of the box, making dynamic link discovery redundant for developers.
4. **Standardization Gaps**: Unlike HTML, JSON does not have a single universally accepted hypermedia format (HAL, JSON-LD, Siren, and Collection+JSON all compete), leading teams to stick to clean Level 2 JSON.
