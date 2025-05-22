# NIDHI_DHINOJA-MARWADIUNIVERSITY-NODE.JS

This repository contains both backend and frontend code for a Node.js-based project, including RESTful APIs for managing software requests and user authentication, and a React frontend.

## Table of Contents

* [Setup Instructions](#setup-instructions)
* [API Documentation](#api-documentation)
* [Project Structure](#project-structure)
* [Technologies Used](#technologies-used)
* [Contributing](#contributing)

## Setup Instructions

### Prerequisites

* Node.js (v14 or above recommended)
* npm (comes with Node.js)
* PostgreSQL database installed and running
* Git

### Backend Setup

1. **Clone the repository**

```bash
git clone https://github.com/nidhidhinoja/NIDHI_DHINOJA-MARWADIUNIVERSITY-NODE.JS.git
cd NIDHI_DHINOJA-MARWADIUNIVERSITY-NODE.JS/backend-management
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in `backend-management/` folder with the following variables (adjust values accordingly):

```ini
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret_key
```

4. **Run database migrations (if any)**

*(If you are using any migration tool like TypeORM, Sequelize CLI, etc., mention commands here)*

5. **Start the backend server**

```bash
npm run start
```

The backend API will be available at: `http://localhost:PORT` (default port as configured in your app)

### Frontend Setup

1. **Navigate to the frontend folder:**

```bash
cd ../frontend
```

2. **Install frontend dependencies:**

```bash
npm install
```

3. **Create a `.env` file in the frontend folder and set the backend API URL:**

```ini
REACT_APP_API_URL=http://localhost:PORT
```

4. **Start the frontend:**

```bash
npm start
```

5. **Open your browser and visit:** `http://localhost:3000` (or the port your React app runs on)

## API Documentation

### Authentication

| Endpoint | Method | Description | Body Parameters | Response |
|----------|--------|-------------|----------------|----------|
| `/auth/signup` | POST | Register a new user | `{ name, email, password }` | Success message or error |
| `/auth/login` | POST | Login user | `{ email, password }` | JWT token or error |
| `/auth/logout` | POST | Logout user | *Requires auth token* | Success message |

### User Routes

| Endpoint | Method | Description | Headers | Body Parameters |
|----------|--------|-------------|---------|----------------|
| `/users/profile` | GET | Get logged-in user profile | `Authorization: Bearer <token>` | N/A |
| `/users/profile` | PUT | Update logged-in user profile | `Authorization: Bearer <token>` | `{ name, email }` |
| `/users/change-password` | PUT | Change password | `Authorization: Bearer <token>` | `{ currentPassword, newPassword }` |

### Software Requests

| Endpoint | Method | Description | Headers | Body Parameters |
|----------|--------|-------------|---------|----------------|
| `/requests` | GET | Get all software requests | `Authorization: Bearer <token>` | N/A |
| `/requests` | POST | Create a new software request | `Authorization: Bearer <token>` | `{ softwareId, reason, details }` |
| `/requests/:id` | GET | Get details of a request | `Authorization: Bearer <token>` | N/A |
| `/requests/:id` | PUT | Update a request | `Authorization: Bearer <token>` | Request fields to update |
| `/requests/:id` | DELETE | Delete a request | `Authorization: Bearer <token>` | N/A |

### Software Management

| Endpoint | Method | Description | Headers | Body Parameters |
|----------|--------|-------------|---------|----------------|
| `/software` | GET | Get list of software | `Authorization: Bearer <token>` | N/A |
| `/software` | POST | Add new software | `Authorization: Bearer <token>` | `{ name, version, description }` |
| `/software/:id` | GET | Get software details | `Authorization: Bearer <token>` | N/A |
| `/software/:id` | PUT | Update software details | `Authorization: Bearer <token>` | Fields to update |
| `/software/:id` | DELETE | Delete software | `Authorization: Bearer <token>` | N/A |

### Notes

* All endpoints that require authentication expect a JWT token in the `Authorization` header like: `Authorization: Bearer <your_token_here>`
* Request and response formats are JSON.
* Replace `PORT` with the actual port number your backend server runs on.

## Project Structure

```
/backend-management
  /src
    /controllers
    /entity
    /middleware
    /routes
    /utils
  package.json
  tsconfig.json
  .env

/frontend
  /src
    /components
    /pages
    /api
  package.json
  .env
```

## Technologies Used

* Node.js & Express.js (Backend)
* TypeScript
* PostgreSQL
* React (Frontend)
* JWT Authentication
* Axios (HTTP client in frontend)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
