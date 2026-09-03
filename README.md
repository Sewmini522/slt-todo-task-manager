# To-Do Task Manager

A small full-stack To-Do task management web application built for the Sri Lanka Telecom (Services) Ltd Software Developer/Intern take-home assessment.

Users can create tasks, view their 5 most recent active tasks, edit them, mark them complete, and delete them permanently.

## Architecture

MySQL Database → Laravel REST API (backend) → React SPA (frontend)


The backend and frontend are two independent projects that communicate over HTTP (JSON). The backend has no knowledge of the frontend and could serve any client; the frontend talks to the backend purely through its REST API.

## Technology Stack

- **Backend:** PHP 8.2, Laravel 12, MySQL 8
- **Frontend:** React 18, Vite 5 (Single Page Application)
- **Backend testing:** PHPUnit (Laravel's built-in test tooling)
- **Frontend testing:** Vitest + React Testing Library

## Prerequisites

- PHP 8.2 or later, with Composer
- MySQL (e.g. via XAMPP, or a standalone install)
- Node.js 20 and npm

## Project Structure

InternAss/
├── backend/ Laravel REST API
└── frontend/ React (Vite) SPA



## Backend Setup

1. Navigate to the backend folder:

cd backend
2. Install PHP dependencies:
  
composer install
3. Copy the environment file and generate an app key:

cp .env.example .env
php artisan key:generate
4. Edit `.env` and set your database connection:

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo_app
DB_USERNAME=root
DB_PASSWORD=

   (Adjust `DB_PORT` to match your local MySQL setup — some XAMPP installs use `3307`.)
5. Create an empty MySQL database named `todo_app` (e.g. via phpMyAdmin).
6. Run the migrations to create the database schema:

php artisan migrate
7. Start the backend server:

php artisan serve
   The API will be available at `http://127.0.0.1:8000/api`.

## Frontend Setup

1. Navigate to the frontend folder:

cd frontend
2. Install dependencies:

npm install
3. Start the development server:

npm run dev
   The app will be available at `http://localhost:5173`.

**Note:** the backend server must be running at `http://127.0.0.1:8000` for the frontend to load or save tasks.

## Running Tests

**Backend (PHPUnit):**

cd backend
php artisan test
Covers: creating tasks, validation, listing only incomplete tasks, the 5-most-recent-tasks limit, updating, completing, deleting, and handling of non-existent tasks.

**Frontend (Vitest + React Testing Library):**


cd frontend
npm test
Covers: form rendering, validation, form submission, edit-mode pre-fill, task list rendering, the empty state, and the Edit/Done/Delete actions.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Returns the 5 most recent incomplete tasks |
| POST | `/api/tasks` | Creates a new task (`title`, `description`) |
| PUT | `/api/tasks/{id}` | Updates a task's title/description |
| PATCH | `/api/tasks/{id}/complete` | Marks a task as completed |
| DELETE | `/api/tasks/{id}` | Permanently deletes a task |

## Design Decisions

- **"5 most recent incomplete tasks"** is enforced in the database query itself (`WHERE is_completed = false ORDER BY created_at DESC LIMIT 5`), not by fetching all tasks and filtering on the frontend. A composite index on `(is_completed, created_at)` supports this query efficiently.
- **Completing a task** uses a dedicated `PATCH /api/tasks/{id}/complete` endpoint rather than overloading the general update endpoint, since it represents a distinct action with clear intent.
- **No authentication/login system** was implemented, as the assessment does not require one and adding it would be unnecessary complexity for this scope.
- **Docker was not implemented.** It was considered as a bonus item but intentionally left out to avoid risking the stability of a fully working, tested application this close to submission.

- git add README.md
git commit -m "Add README with setup and API documentation"
git push
