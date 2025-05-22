# Backend Management Project

This project is a TypeScript-based backend application designed for software and request management. It provides a RESTful API to manage software entities and their associated requests.

## Features

- **Software Management**: Create, retrieve, and delete software entries.
- **Request Management**: Create, retrieve, and delete requests associated with software.
- **Authentication Middleware**: Protect routes with authentication checks.
- **Validation Middleware**: Ensure incoming request data is valid.

## Directory Structure

- `src/`: Contains the source code for the application.
  - `app.ts`: Entry point of the application.
  - `controllers/`: Contains controllers for handling requests.
  - `models/`: Defines the data models for software and requests.
  - `services/`: Contains business logic for managing software and requests.
  - `routes/`: Defines the API routes.
  - `middleware/`: Contains middleware functions for authentication and validation.
  - `config/`: Configuration files, such as database connection.
  - `types/`: TypeScript types and interfaces.
- `tests/`: Contains unit tests for the application.
- `package.json`: Lists dependencies and scripts.
- `tsconfig.json`: TypeScript configuration file.

## Installation

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Configure the database connection in `src/config/database.ts`.
4. Start the application with `npm start`.

## License

This project is licensed under the MIT License.