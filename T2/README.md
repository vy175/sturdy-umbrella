# Task 2: User Directory Management Portal

A full-stack web application designed for searching, managing, and inline-editing user directory records with real-time database synchronization and token-based security.

---

## 🌐 Live Production Deployments

| Component | Platform | Live URL |
| :--- | :--- | :--- |
| **Frontend (UI)** | **Vercel** | [https://sturdy-umbrella-zeta.vercel.app](https://sturdy-umbrella-zeta.vercel.app/) |
| **Backend (API)** | **Render** | [https://sturdy-umbrella-4r11.onrender.com](https://sturdy-umbrella-4r11.onrender.com) |
| **Database** | **MongoDB Atlas** | Cloud M0 Cluster |

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite 6, Modern Vanilla CSS (Glassmorphic Design, Responsive Tables)
- **Backend**: Node.js, Express.js 5, Mongoose 9
- **Database**: MongoDB Atlas
- **Authentication**: Bearer Token Authentication Middleware
- **Containerization**: Docker, Docker Compose, Nginx
- **Deployment & CI/CD**: Vercel (Frontend) + Render (Backend)

---

## 📌 Implementation Details

### 1. Backend Architecture (`T2/backend`)

The backend is built with Express and Mongoose following a clean MVC/Service-oriented structure:

- **Database Connection (`src/config/db.js`)**: Connects securely to MongoDB Atlas using connection pooling and error-handling routines.
- **Data Model (`src/models/User.js`)**: Defines schema with strict validation rules for `username`, unique lowercase `email`, and `birthdate`.
- **Database Seeder (`src/seed.js`)**: Script to clear and populate initial user records from `users.json` into MongoDB Atlas (`npm run seed`).
- **REST Endpoints (`src/routes/userRoutes.js`)**:
  - `GET /api/users?name=<keyword>`: Performs **case-insensitive regex search** across both `username` and `email` fields using MongoDB's `$or` operator.
  - `POST /api/users`: Executes **bulk updates** for multiple modified user records in parallel using `Promise.all` and `findByIdAndUpdate`.
- **Security Middleware (`src/middleware/auth.js`)**: Enforces Bearer Token authentication (`Authorization: Bearer <token>`) on all user endpoints.
- **Validation Middleware (`src/middleware/validateUser.js`)**: Validates input array structure, required fields, email format, and valid dates before updating the database.

---

### 2. Frontend Architecture (`T2/frontend`)

The frontend is a lightweight, responsive Single Page Application (SPA) powered by Vite and React:

- **Search System**: Accepts string queries and triggers case-insensitive search via the backend `GET` API.
- **Live Inline Editing**: Every table cell (`username`, `email`, `birthdate`) is an editable input. Modifications are tracked in local component state (`editedUsers`).
- **Visual State Management**:
  - Modified rows highlight dynamically with an **"Unsaved"** status pill.
  - Unsaved change count indicator displays how many records have pending changes.
- **Bulk Save & Callback Refresh**:
  - **"Save Changes to DB"** button submits all accumulated edits via `POST /api/users`.
  - Upon successful response, it triggers an immediate callback (`await handleSearch()`) to refresh the table with current database records.
  - **"Revert Edits"** button discards all pending changes and resets table to server state.
- **Environment Agnostic (`import.meta.env`)**:
  - `.env.development`: Automatically points to local `http://localhost:5000/api`.
  - `.env.production`: Automatically points to live Render API `https://sturdy-umbrella-4r11.onrender.com/api`.

---

## 📂 Project Structure

```text
T2/
├── docker-compose.yml             # Orchestrates backend and frontend containers
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js              # MongoDB Atlas connection handler
│   │   ├── middleware/
│   │   │   ├── auth.js            # Bearer token authentication
│   │   │   └── validateUser.js    # Bulk update payload validation
│   │   ├── models/
│   │   │   └── User.js            # Mongoose user schema & model
│   │   ├── routes/
│   │   │   └── userRoutes.js      # GET and POST API routes
│   │   ├── app.js                 # Express application & middleware setup
│   │   ├── seed.js                # Database seeder script
│   │   └── server.js              # Server entry point
│   ├── users.json                 # Initial seed dataset
│   ├── Dockerfile                 # Backend container image definition
│   ├── .dockerignore
│   ├── .env                       # Environment variables (Mongo URI, Port, Secret)
│   ├── .gitignore
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── App.jsx                # Main portal component (Search, Table, Edit, Save)
    │   ├── App.css                # Premium modern UI styling
    │   └── index.jsx              # React DOM root mounting
    ├── .env.development           # Local API endpoint configuration
    ├── .env.production            # Cloud Production API endpoint configuration
    ├── index.html                 # Vite HTML entry point
    ├── vite.config.js             # Vite configuration with local proxy
    ├── nginx.conf                 # Nginx production configuration
    ├── Dockerfile                 # Multi-stage frontend container image definition
    ├── .dockerignore
    ├── .gitignore
    └── package.json
```

---

## 💻 Local Development Setup

### Option A: One-Command Docker Setup (Recommended)

Run the entire full-stack application with a single command:

```bash
cd T2
docker-compose up --build
```
- **Frontend Portal**: `http://localhost:3000`
- **Backend API**: `http://localhost:5000`

---

### Option B: Manual Setup (Node.js)

#### 1. Start the Backend

```bash
cd T2/backend

# 1. Install dependencies
npm install

# 2. Seed database with initial users (optional/first time)
npm run seed

# 3. Start development server
npm run dev
```
> Backend runs at `http://localhost:5000`

#### 2. Start the Frontend

```bash
cd T2/frontend

# 1. Install dependencies
npm install

# 2. Start development server
npm run dev
```
> Frontend runs at `http://localhost:3000` and automatically connects to the backend.

---

## 🔑 Authentication

All API endpoints require the following Bearer token:
```text
Authorization: Bearer super_secret_auth_token_key_123
```
The frontend includes this default token in the **API Security Token** field on the portal interface.
