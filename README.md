# Testing wrkshop
* Frontend with Vue
* Backend with NodeJS
* Database with MSSQL server

## Frontend with VueJS
Create project and run in development mode
* Vitest for Unit Testing
* Playwright for End-to-End Testing
* ESLint for code quality
* Prettier for code formatting

```
$npm create vue@latest
$npm install
$npm run dev
```

Build fpr production mode
```
$npm run build
```

## Setup database
* https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver16&tabs=cli&pivots=cs1-bash
```
$docker compose up -d 
$docker compose ps

$docker exec -it db sh
$cd /works
$ls

// Create database name = myusers
$/opt/mssql-tools18/bin/sqlcmd -S localhost -Usa -PxitgmLwmp123 -C -Q 'CREATE DATABASE myusers'

// Create tables and data for test
$/opt/mssql-tools18/bin/sqlcmd -S localhost -Usa -PxitgmLwmp123 -C -d myusers -i setup.sql

// Connect to database instance
$/opt/mssql-tools18/bin/sqlcmd -S localhost -Usa -PxitgmLwmp123 -C
$use myusers;
$GO

$select * from users;
$Go

$exit
```

## Backend with NodeJS
Create project and run
* Jest for unit testing
* SuperTest for API testing
```
$npm init -y
$npm install
$npm start
```