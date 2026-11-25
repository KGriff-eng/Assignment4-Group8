# Assignment4-Group8

src/ - for all web application & SQL/backend/frontend source code
dump/ - for all SQL dump file(s) here (as in Assignment 3)

git checkout -b your-workng-branch
git push -u origin your-working branch


**5. Development and Integration Rules**
To minimize merge conflicts and ensure stable integration, the team will follow these rules:

**Repository Management**
The main branch will contain only stable, tested code.
An integration branch will be used to combine and test completed functionalities before final submission.
Each team member will work on their own feature branch.
All feature branches must be merged through pull requests targeting integration.
No direct commits to main or integration are permitted.

**File Ownership**
Kierstin owns the database schema, connection module, seed data, and final database dump.
Emma owns the main application entry point, navigation, shared templates, and application-wide styling.
Piper owns the implementation of options 1 and 2.
Mel owns the implementation of options 3 and 4.
Rachel owns the implementation of options 5, 6, and 7.
Changes to shared files must be coordinated with their designated owner.

**Development Standards**
Every functionality must have its own route/module and corresponding template where appropriate.
All members must use the shared database connection module.
SQL queries must use parameterized inputs.
Each functionality must handle invalid inputs and SQL errors without crashing the application.
Database schema changes must be communicated to Kierstin before implementation.
Each member must test their functionality independently before requesting a merge.

**Integration Standards**
Completed functionalities must be merged into integration as soon as they are independently testable.
Pull requests must be reviewed by at least one other team member.
The application must be tested after each integration.
All seven functionalities must be tested together before the code freeze.
Only tested and stable code may be merged into main.
