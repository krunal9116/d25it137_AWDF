# ITUE301: Advanced Web Development Frameworks (AWDF)
### Semester 5 — AY 2026-27 | Charotar University of Science and Technology (CHARUSAT)
**Faculty of Technology & Engineering | Department of Information Technology**

---

## 👤 Student Information
* **Student Name:** Krunal Vaghamshi
* **Student ID:** D25IT137
* **Batch / Class:** 5IT-2(C2)
* **Course Code:** ITUE301 (Advanced Web Development Frameworks)

---

## 📑 Consolidated Practical Manual & Index
* 📄 **Official Consolidated Manual (70 Pages):** [`D25IT137_AWDF_Practical-Manual.pdf`](./D25IT137_AWDF_Practical-Manual.pdf)


---

## 📂 Laboratory Practicals Directory (1 to 13)

| Prac. No. | Practical Title & Objectives | Source Code | Individual Report | Official Date |
| :---: | :--- | :---: | :---: | :---: |
| **1** | Building Component-Based UI using React, JSX & Props | [`p1/`](./p1) | [📄 Report](./D25IT137_P1.pdf) | 08/07/2026 |
| **2** | State Management, Event Handling, Controlled Components & Navigation | [`p2/`](./p2) | [📄 Report](./D25IT137_P2.pdf) | 15/07/2026 |
| **3** | Asynchronous Data Fetching, Lifecycle Hooks & REST API Consumption | [`p3/`](./p3) | [📄 Report](./D25IT137_P3.pdf) | 20/07/2026 |
| **4** | RESTful API Development using Node.js, Express & In-Memory CRUD | [`p4/`](./p4) | [📄 Report](./D25IT137_P4.pdf) | 27/07/2026 |
| **5** | Database Integration with MongoDB & Mongoose Schema Validation | [`p5/`](./p5) | [📄 Report](./D25IT137_P5.pdf) | 03/08/2026 |
| **6** | Full-Stack Integration (Connecting React Frontend to Express & MongoDB) | [`p6/`](./p6) | [📄 Report](./D25IT137_P6.pdf) | 14/08/2026 |
| **7** | User Authentication & Authorization with JWT and Middleware Pipeline | [`p7/`](./p7) | [📄 Report](./d25it137_p7.pdf) | 17/08/2026 |
| **8** | Performance Optimization & Lazy Loading in React (React.lazy & Suspense) | [`p8/`](./p8) | [📄 Report](./D25IT137_P8.pdf) | 18/09/2026 |
| **9** | In-Memory Caching and Query Optimization using Node-Cache | [`p9/`](./p9) | [📄 Report](./D25IT137_P9.pdf) | 18/09/2026 |
| **10** | Asynchronous Processing with Event-Driven Architecture (EventEmitter) | [`p10/`](./p10) | [📄 Report](./D25IT137_P10.pdf) | 30/09/2026 |
| **11** | Application Containerization with Docker and Docker Compose Orchestration | [`p11/`](./p11) | [📄 Report](./D25IT137_P11.pdf) | 07/10/2026 |
| **12** | Automated CI/CD Pipeline Implementation using GitHub Actions | [`p12/`](./p12) | [📄 Report](./D25IT137_P12.pdf) | 27/10/2026 |
| **13** | External AI Service Integration (OpenAI/Gemini) & Graceful Degradation | [`p13/`](./p13) | [📄 Report](./D25IT137_P13.pdf) | 27/10/2026 |

---

## 📝 Assignments
* **Assignment 1:** Richardson Maturity Model (Levels 0–3) Evaluation & Improvement
  * **Directory:** [`a1/`](./a1)
  * **Report:** [`D25IT137_A1.pdf`](./D25IT137_A1.pdf)

---

## 🚀 How to Run the Final Project (Practical 13)

### Single-Command Startup:
```bash
npm start
```
*(Starts MongoDB in-memory daemon on port 27017, Express REST backend on port 5001, and Vite React frontend on port 5173)*

### Web Application Endpoints:
* **Frontend Application:** `http://localhost:5173`
* **Backend API Gateway:** `http://localhost:5001`
* **Event Stream / Notifications:** `http://localhost:5001/notifications`
* **Demo Login:** `demo@faculty.com` / `password123`

### Run Automated Quality Tests:
```bash
npm test --prefix p13/backend
```
*(Runs 6 Jest & Supertest automated test suites verifying CRUD, validation, rate limiting, and AI graceful degradation)*

