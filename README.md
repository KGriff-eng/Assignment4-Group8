# Automotive Shop Management System

SE 3309 — Database Management Systems
Assignment 4 — Group 8

## Technology Stack

- Node.js
- Express.js
- MySQL 8.0
- EJS
- HTML, CSS and JavaScript
- GitHub Desktop

## Required Software

- Node.js (LTS)
- MySQL Server
- MySQL Workbench
- Visual Studio Code
- GitHub Desktop

## First-Time Setup

1. Clone Assignment4-Group8 using GitHub Desktop.
2. Switch to the integration branch.
3. Pull the latest changes.
4. Create your personal feature branch from integration.
5. Open the repository in VS Code.
6. Open a terminal in the project root.
7. Run:

   npm ci

## Database Setup

The database is named assignment3.

If you already have the correct Assignment 3 database
installed, you do not need to import it again.

Otherwise:

1. Open MySQL Workbench.
2. Connect to your local MySQL server.
3. Click Server > Data Import.
4. Select Import from Self-Contained File.
5. Select dump/assignment3_dump.sql.
6. Click Start Import.
7. Refresh the Schemas panel.

WARNING: The dump creates and selects assignment3
and drops existing tables before recreating them.
Do not import over an existing database containing
work you want to keep.

## Environment Configuration

1. Make a copy of .env.example.
2. Rename the copy to .env.
3. Enter your local MySQL username and password.
4. Keep DB_NAME set to assignment3.
5. Never commit or share your .env file.

## Test the Database

Run:

    npm run test:db

Confirm that the connection succeeds and that the
database tables and customer count are displayed.

## Run the Website

Once the core web framework is implemented, run:

    npm run dev

Open your browser and visit:

    http://localhost:3000

## Project Structure

- src/config/ — Shared database configuration
- src/routes/ — Express feature routes
- src/views/ — EJS website pages
- src/views/partials/ — Shared website components
- src/public/css/ — Stylesheets
- src/public/js/ — Client-side JavaScript
- dump/ — Database export
- docs/ — Project documentation

## Shared Database Connection

All feature routes must import the existing pool:

    const { pool } = require('../config/db');

Example parameterized query:

    const [rows] = await pool.execute(
        'SELECT * FROM vehicle WHERE VIN = ?',
        [vin]
    );

Do not create separate database connection pools.

## Branches

- main — Stable final submission
- integration — Combined development work
- feature/database-setup — Database setup
- feature/ui-framework — Emma
- feature/piper — Piper
- feature/mel — Mel
- feature/rachel — Rachel

## Development Workflow

1. Pull the latest integration changes.
2. Switch to your feature branch.
3. Merge integration into your feature branch.
4. Implement your assigned functionality.
5. Test your changes locally.
6. Commit and push using GitHub Desktop.
7. Create a pull request targeting integration.
8. Review and test before merging.

Do not commit directly to main or integration.

## Development Requirements

- Each user option must interact with MySQL.
- Each option must include a validation mechanism.
- Use parameterized SQL queries.
- Handle invalid input and database errors.
- Do not edit another member's assigned files
  without coordinating first.

## Database Documentation

See docs/database_schema.md for the database
tables, columns, keys and relationships.
