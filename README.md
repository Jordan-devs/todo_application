# Todo App with PostgreSQL & Drizzle ORM

A full-stack todo application with user authentication, built with Express.js, PostgreSQL, and Drizzle ORM.

## Features

- 🔐 User authentication (registration & login)
- 🎯 JWT-based authorization with HTTP-only cookies
- ✅ Full CRUD operations for todos
- 👤 User-specific todo lists
- 🔒 Secure password hashing with bcrypt
- 🗃️ PostgreSQL database with Drizzle ORM
- 📱 RESTful API design

## Tech Stack

**Backend:**

- Node.js & Express.js
- TypeScript
- PostgreSQL
- Drizzle ORM
- JWT (jsonwebtoken)
- bcrypt

**Frontend:**

- HTML5, CSS3, Vanilla JavaScript

## Prerequisites

- Node.js (v18+)
- PostgreSQL (v15+)
- npm or yarn

## Installation

1. **Clone the repository**

```bash
git clone <your-repo-url>
cd todo-app
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up PostgreSQL database**

```bash
# Create database and user
sudo -u postgres psql
CREATE DATABASE todo_application;
CREATE USER myadmin WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE todo_application TO myadmin;
\q

# Connect and create tables
psql -U myadmin -d todo_application

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  task TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

4. **Configure environment variables**

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://myadmin:your_password@localhost:5432/todo_application"
JWT_SECRET="your_jwt_secret_here"
PORT=5000
NODE_ENV="development"
```

5. **Run the application**

```bash
npm run dev
```

6. **Open your browser**

```
http://localhost:5000
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Todos (Protected Routes)

- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Database Schema

### Users Table

| Column   | Type         | Constraints      |
| -------- | ------------ | ---------------- |
| id       | SERIAL       | PRIMARY KEY      |
| username | VARCHAR(100) | UNIQUE, NOT NULL |
| password | VARCHAR(100) | NOT NULL         |

### Todos Table

| Column    | Type    | Constraints                   |
| --------- | ------- | ----------------------------- |
| id        | SERIAL  | PRIMARY KEY                   |
| user_id   | INTEGER | NOT NULL, FOREIGN KEY → users |
| task      | TEXT    | NOT NULL                      |
| completed | BOOLEAN | NOT NULL, DEFAULT FALSE       |

## Project Structure

```
todo-app/
├── src/
│   ├── db/
│   │   ├── index.ts       # Database connection
│   │   └── schema.ts      # Drizzle schema definitions
│   ├── routes/
│   │   ├── authRoutes.ts  # Authentication routes
│   │   └── todoRoutes.ts  # Todo CRUD routes
│   ├── handlers/
│   │   ├── authHandlers.ts
│   │   └── todoHandlers.ts
│   ├── middleware/
│   │   └── authMiddleware.ts  # JWT verification
│   ├── types/
│   │   └── types.ts
│   └── server.ts          # Express server setup
├── drizzle.config.ts      # Drizzle Kit configuration
├── .env
└── package.json
```

## Security Features

- Passwords hashed using bcrypt (10 rounds)
- JWT tokens stored in HTTP-only cookies
- Protected routes with authentication middleware
- User-specific data isolation
- Parameterized queries (SQL injection prevention)

## What I Learned

- PostgreSQL setup and configuration
- Client-server vs file-based databases
- Connection pooling for production readiness
- Drizzle ORM schema definitions and queries
- Type-safe database operations with TypeScript
- Migration from SQLite to PostgreSQL
- Debugging environment variable loading issues

## Deployment

Coming soon - deploying to Render with managed PostgreSQL.

## License

MIT

---

Built as part of my Backend learning journey 🚀
