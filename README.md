# Employee Management System

A full-stack Employee Management System built using Node.js, Express, and MySQL. It provides complete CRUD REST APIs for managing employee records along with structured route handling and environment configurations.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Environment & Utilities:** dotenv, cors

## Setup & Installation

1. Clone the repository:
   - `git clone https://github.com/darshsolanki-dev/employee-management-system.git`
   - `cd employee-management-system`

2. Install dependencies:
   - `npm install`

3. Configure Database:
   - Run `database.sql` inside MySQL Workbench or MySQL terminal.
   - Copy `.env.example` to `.env` and fill in your MySQL credentials:
     - `DB_HOST=localhost`
     - `DB_USER=root`
     - `DB_PASSWORD=YOUR_PASSWORD`
     - `DB_NAME=employee_db`
     - `PORT=3000`

4. Start the server:
   - `npm start`
