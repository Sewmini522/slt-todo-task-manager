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

##Steps##

Step 1: Create the fresh Laravel backend project
What we're doing and why: We'll create a brand-new Laravel project inside a folder named backend. This will be our REST API. 

Command to run:-composer create-project laravel/laravel backend


Step 2: Create the MySQL database
What we're doing and why: Before Laravel can connect to MySQL, the actual database
needs to exist. We'll create an empty database called todo_app using phpMyAdmin (which comes with XAMPP). Steps:

1. Open your browser and go to: http://localhost/phpmyadmin
2. Click the "Databases" tab at the top. 3. Under "Create database", type: todo_app
4. Leave the collation as default (or pick utf8mb4_unicode_ci if asked). 5. Click Create.

<img width="315" height="808" alt="Picture1" src="https://github.com/user-attachments/assets/954bc68e-45b8-404e-897f-06d33424b4b5" />
![image](https://github.com/user/repo/assets/xxxx)

Step 3: Point Laravel at the MySQL database
What we're doing and why: Laravel reads its database connection settings from a file
called .env in the backend folder. Right now it's set to use SQLite; we need to change it to use MySQL and point it at todo_app.

Where: Open the file backend/.env in VS Code (it's in your file list, near .env.example). 

What to do:
1. Find these lines near the top

DB_CONNECTION=sqlite
# DB_HOST=127.0.0.1
# DB_PORT=3306
# DB_DATABASE=laravel
# DB_USERNAME=root
# DB_PASSWORD= 

Replace that whole block with this

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=todo_app
DB_USERNAME=root
DB_PASSWORD=

Save the file after editing. Then run this in the terminal
php artisan migrate:fresh

Step 4: Create the Task model and migration

What we're doing and why: We need two things:
1. A migration — a PHP file that describes the structure of our task table (columns, types) so Laravel can create it in the database.

2. A model — a PHP class called Task that lets our code talk to that table using normal
PHP instead of writing raw SQL.

Command to run : php artisan make:model Task -m

Output like:
INFO Model [app/Models/Task.php] created successfully. INFO Migration [database/migrations/2026_xx_xx_xxxxxx_create_tasks_table.php] created
successfully.

Step 5: Edit the migration file

Where: Open backend/database/migrations/2026_09_02_132331_create_tasks_table.php in
VS Code. 

Replace & Save the file, then run:

php artisan migrate:fresh

Step 6: Configure the Task model
What we're doing and why: Laravel's Task model needs to be told two things: (1) which fields are safe to fill in bulk from user input (a security feature called "mass assignment protection"), and (2) that is_completed should behave as a true/false value in PHP, not just a raw 0/1 from the database. 

Where: Open backend/app/Models/Task.php. 

After Replace the code And Save It

Run this:
php artisan tinker

Then, inside the Tinker prompt that appears, type:

Task::create(['title' => 'Test task', 'description' => 'Just checking it works'])

Step 7: Create the API controller

What we're doing and why: Now we build the actual REST API. In Laravel, a Controller is a class that receives an HTTP request (like "create a task") and decides what to do with it. We'll create one controller that handles all task operations (list, create, update, complete, delete). 

Command to run (in the backend folder terminal): php artisan make:controller
Api/TaskController --api

What to expect:

INFO Controller [app/Http/Controllers/Api/TaskController.php] created successfully.

Step 8: Create the validation rule for creating a task

What we're doing and why: Before saving a task, we need to make sure the incoming data is valid (e.g. title isn't empty). Laravel has a clean way to do this called a Form Request — a dedicated class just for validation rules, keeping the controller itself clean. Command to run: php artisan make:request StoreTaskRequest

What to expect:

INFO Request [app/Http/Requests/StoreTaskRequest.php] created successfully. 

Replace the code and Save It.

Step 9: Create the update validation rule (very similar to the last one)

What we're doing and why: Editing a task needs its own validation rule. It's almost
identical to creating one, so this will be quick. 

Command to run (in your normal terminal, not Tinker): php artisan make:request
UpdateTaskRequest

What to expect:

INFO Request [app/Http/Requests/UpdateTaskRequest.php] created successfully. 

Open UpdateTaskRequest.php file Edit And Save

Step 10: Create the API Resource

What we're doing and why: An API Resource controls exactly what JSON shape gets sent
back to the frontend for a task. Without it, Laravel would just dump every raw database
column; with it, we control the output in one place — cleaner and safer. 

Command to run: php artisan make:resource TaskResource

What to expect:

INFO Resource [app/Http/Resources/TaskResource.php] created successfully. 

Open TaskResource.php file Edit And Save.

Step 11: Fill in the TaskController

What we're doing and why: This is where the real behavior lives — listing tasks, creating, updating, marking complete, and deleting. We'll write all 5 methods now since they're
closely related and short, but I'll explain each one clearly. 

Where: Open backend/app/Http/Controllers/Api/TaskController.php. 

Open TaskController.php file Edit And Save.

Step 12: Wire up the routes

What we're doing and why: The controller methods exist, but nothing calls them yet. Routes map a URL + HTTP method (like GET /api/tasks) to a specific controller method. Where: Open backend/routes/api.php.

Open api.php file Edit And Save. api.php file if not available

Step 1: Enable API routing
php artisan install:api

Step 2: Answer the prompt
Yes

<img width="272" height="182" alt="Picture3" src="https://github.com/user-attachments/assets/cfb0faa4-21c8-41bf-88af-406fe7a133ac" />
<img width="272" height="182" alt="Picture3" src="https://github.com/user-attachments/assets/498b3688-351c-4ace-8921-3b8c74c22d78" />
Save the file. Let's test it
Start the Laravel server:
php artisan serve

Step 13: Test creating a task
Let's verify the store() (create) endpoint and its validation work too. 

Test 1 — create a valid task:
curl.exe -X POST http://127.0.0.1:8000/api/tasks -H "Content-Type: application/json" -d
"{\"title\":\"Buy books\",\"description\":\"Buy books for next school year\"}" 

Test 2 — check validation works (missing title):
curl.exe -X POST http://127.0.0.1:8000/api/tasks -H "Content-Type: application/json" -d
"{\"description\":\"No title here\"}

Step 14: Test update, complete, and delete

Test 1 — update task id 2's title:
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/tasks/2" -Method Put -ContentType
"application/json" -Body '{"title":"Buy books urgently","description":"Buy books for next
school year"}' 

Test 2 — mark task id 2 as complete:
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/tasks/2/complete" -Method Patch

Test 3 — confirm it disappeared from the active list:
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/tasks" 

Test 4 — delete task id 1 (our original "Test task"):
Invoke-RestMethod -Uri "http://127.0.0.1:8000/api/tasks/1" -Method Delete

Step 15: Set up the test database

What we're doing and why: Tests should run against their own database, separate from the
one you're manually testing in — so tests don't wipe out your real data, and your real data
doesn't interfere with test results. 

Step A — create a second MySQL database:
· Go to http://localhost/phpmyadmin
· Create a new database named exactly: todo_app_testing

![image](https://github.com/user/repo/assets/xxxx)

Step 16: Write our first backend test
What we're doing and why: We'll create one test file covering all the key API behaviors
from the assessment: creating tasks, validation, listing only incomplete tasks, the "5 most
recent" limit, updating, completing, deleting, and handling missing tasks. 

Command to run: php artisan make:test TaskApiTest
What to expect: INFO Tests\Feature\TaskApiTest created successfully

Step 17: Write the test file
Where: Open backend/tests/Feature/TaskApiTest.php. 
Open TaskApiTest.php file. Edit And Save it. 

Step 18: Create the Task factory
php artisan make:factory TaskFactory --model=Task

What to expect:INFO Factory [database/factories/TaskFactory.php] created successfully. 

Step 19: Fill in the factory
Where: Open backend/database/factories/TaskFactory.php. 
Open TaskFactory.php file. Edit And Save it.

Step 20: Run the tests
php artisan test

What to expect: Output listing each test we wrote, with a green checkmark (or "PASS")
next to each one, ending with something. 

Step 21: Remove the incorrect test
In backend/tests/Feature/TaskApiTest.php, delete this whole method:
public function test_it_returns_404_for_a_nonexistent_task(): void
{
$response = $this->getJson('/api/tasks/9999');
$response->assertStatus(404);
}

Save the file, then run the tests again:
php artisan test


Step 22: Create the React (Vite) project
What we're doing and why: We'll create the React SPA in a frontend folder, separate from
backend, as planned. 

Command to run:
First, make sure you're back in the InternAss folder, not backend:
cd C:\xampp\htdocs\InternAss

Then:
npm create vite@latest frontend -- --template react

What to expect: It may ask you to confirm installing a package (Ok to proceed? (y)), just type y and press Enter. What to expect this time: After scaffolding finishes, run:
cd frontend
npm install
npm run dev

And you should see:
VITE v5.x.x ready in xxx ms
➜ Local: http://localhost:5173/

The React + Vite frontend is up and running successfully.

![image](https://github.com/user/repo/assets/xxxx)


## Frontend Setup

1. Navigate to the frontend folder:

cd frontend
2. Install dependencies:

npm install
3. Start the development server:

npm run dev
   The app will be available at `http://localhost:5173`.

**Note:** the backend server must be running at `http://127.0.0.1:8000` for the frontend to load or save tasks.

##Steps##

Step 1: Clean up the default Vite starter files

What we're doing and why: The default App.jsx has a demo counter we don't need. Let's
clear it out so we start from a blank, working slate. 

Where: Open frontend/src/App.jsx. 

Open file and Edit. 
Save the file. Since Vite has hot-reloading, your browser (still open at localhost:5173) should
update automatically — you should see a plain page with just the heading "To-Do Task
Manager" and no more spinning logos or counter button. 

Step 2: Create the API service layer
What we're doing and why: Instead of scattering fetch() calls throughout our components, we'll centralize all API calls in one file. This keeps components focused on UI, and if the
API URL or request format ever changes, we only update it in one place. 

Where: Create a new file: frontend/src/api/taskApi.js


Step 3: Build the TaskCard component

What we're doing and why: Let's build the components from the smallest piece up. TaskCard displays one single task with its Edit/Done/Delete buttons. 

Where: Create a new folder frontend/src/components, then inside it a new file TaskCard.jsx

Step 4: Build the TaskList component

What we're doing and why: TaskList takes an array of tasks and renders one TaskCard per
task. It also handles the empty state (when there are no tasks) — a required part of the
assessment's UI expectations. 

Where: Create a new file frontend/src/components/TaskList.jsx. 

Step 5: Build the TaskForm component

What we're doing and why: This is the Add/Edit form. It handles both creating a new task
and editing an existing one, using the same form — controlled by whether an editingTask
was passed in. 

Where: Create frontend/src/components/TaskForm.jsx. 

Step 6: Wire everything together in App.jsx

What we're doing and why: This is where it all comes together — App.jsx will fetch tasks
from the backend, hold them in state, and pass the right data and functions down to
TaskForm and TaskList. It also handles loading and error states.

Where: Open frontend/src/App.jsx
cd C:\xampp\htdocs\InternAss\backend
php artisan serve

What to expect: INFO Server running on [http://127.0.0.1:8000]

![image](https://github.com/user/repo/assets/xxxx)

Step 7: Start the frontend (React)

Open a second, separate terminal tab
cd C:\xampp\htdocs\InternAss\frontend
npm run dev

What to expect:
VITE v5.x.x ready in xxx ms
➜ Local: http://localhost:5173/

![image](https://github.com/user/repo/assets/xxxx)

Interfece Design Output
![image](https://github.com/user/repo/assets/xxxx)

Edit and update
![image](https://github.com/user/repo/assets/xxxx)

![image](https://github.com/user/repo/assets/xxxx)

Can edit also phpmyadmin
![image](https://github.com/user/repo/assets/xxxx)

After edit
![image](https://github.com/user/repo/assets/xxxx)

Then after refresh react browser
![image](https://github.com/user/repo/assets/xxxx)

Only the most recent 5 incomplete To-Do tasks are displayed in the UI at any time
![image](https://github.com/user/repo/assets/xxxx)

## Running Tests

**Backend (PHPUnit):**

cd backend
php artisan test
Covers: creating tasks, validation, listing only incomplete tasks, the 5-most-recent-tasks limit, updating, completing, deleting, and handling of non-existent tasks.

**Frontend (Vitest + React Testing Library):**


cd frontend
npm test
Covers: form rendering, validation, form submission, edit-mode pre-fill, task list rendering, the empty state, and the Edit/Done/Delete actions.

After frontend testing

Step 1: Install the testing tools

Make sure your terminal is in the frontend folder, then run:

npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user- event jsdom

Step 2: Configure Vitest

What we're doing and why: Vitest needs to know it should use a browser-like environment
(jsdom) and where to find a small setup file that adds the extra test matchers. 

Where: Open frontend/vite.config.js. 

Step 3: Create the setup file

Where: Create a new file frontend/src/setupTests.js. Contents: import '@testing-library/jest-dom'

Step 4: Add a test script

Where: Open frontend/package.json. Find the "scripts" section

Step 5: Write the TaskForm test

What we're doing and why: We'll test TaskForm first since it's self-contained — no API
calls, just rendering and user interaction. This proves our testing setup itself works before we
build on it. 

Where: Create a new file frontend/src/components/TaskForm.test.jsx
Create the file, save it, then run: npm test

What to expect:
✓ TaskForm > renders title and description fields with an Add button
✓ TaskForm > shows an error and does not submit when title is empty
✓ TaskForm > submits the entered title and description
✓ TaskForm > pre-fills the form and shows Update/Cancel when editing

Test Files 1 passed (1)
Tests 4 passed (4)

![image](https://github.com/user/repo/assets/xxxx)

Step 6: Test TaskCard and TaskList
 
 What we're doing and why: Now let's test the simpler display components — TaskCard
(renders one task, calls the right callback per button) and TaskList (renders many cards, or
the empty state). 

Where: Create frontend/src/components/TaskCard.test.jsx. 

Then Where: Create frontend/src/components/TaskList.test.jsx. 

Create both files, save them, then run: npm test

What to expect:
Test Files 3 passed (3)
Tests 10 passed (10)

![image](https://github.com/user/repo/assets/xxxx)<img width="315" height="808" alt="Picture1" src="https://github.com/user-attachments/assets/420d7380-f5be-46bf-acaf-3dccea1e75c4" />
<img width="315" height="808" alt="Picture1" src="https://github.com/user-attachments/assets/132141f8-2d3e-468e-a775-7f6a5b3f4473" />



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
