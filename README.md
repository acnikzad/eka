# EKA School App

### Features

- Display teachers, classes, and students.
- Highlight selected teacher's classes and students.
- Toggle functionality to show/hide non-matched classes and students.
- Seed data for teachers, classes, and students on DB setup.

---

## Directory Structure

- `eka-school-be`: Backend folder (Express.js app).
- `eka-school-fe`: Frontend folder (React app).
- `db-data`: Docker volume for the database.
- `docker-compose.yml`: Docker compose file to orchestrate the services.

---

## Prerequisites

- **Docker**: Install [Docker](https://www.docker.com/get-started).
- **Node.js & npm**: If you want to run the frontend/backend outside of Docker.

---

## Getting Started

### Step 1: Clone the Repository

git clone https://github.com/your-repo/eka-school-app.git
cd eka

## Step 2: Setup .env File

in eka-school-be:
LOCAL_URL=http://localhost:3000
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=db
DB_PORT=5432
DB_NAME=eka_school

in eka-school-fe:
LOCAL_URL= http://localhost:3000

## Step 3: Fire up Docker

In the root of the eka directory run the following:
docker-compose up --build

This will:

1. Build and run the React front-end (eka-school-fe) on http://localhost:8080.
2. Build and run the Express back-end (eka-school-be) on http://localhost:3000.
3. Set up a PostgreSQL database (db) on localhost:5432.
4. When Docker runs the backend for the first time, it seeds the database with teachers, classes, and students. This seed is defined in eka-school-be/seed.js.

Database Configuration

The PostgreSQL database is configured and initialized via Docker. When you spin up Docker for the first time, the database is seeded with 10 teachers, 20 classes, and 300 students. The associations between teachers, classes, and students are created programmatically in the seed file.

- Teachers are assigned random names.
- Classes are linked to a random teacher.
- Students are randomly assigned to classes.

You can find the SQL tables and relationships in eka-school-be/db.js. The tables include:

    •	teachers
    •	classes
    •	students
    •	class_students

## Running the App Locally (Without Docker)

Backend (Express.js)

- cd eka-school-be
- npm install
- npm start
- This will start the Express server on http://localhost:3000.
- Open a new terminal to seed
- node seed.js

Frontend (React.js)

- cd eka-school-fe
- npm install
- npm start
- This will start the React app on http://localhost:8080.
