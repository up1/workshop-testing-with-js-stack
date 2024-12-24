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

Access to frontend
* http://localhost:5173/

## Setup database
* https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver16&tabs=cli&pivots=cs1-bash
```
$docker compose up -d 
$docker compose ps
```

## Backend with NodeJS
Create project and run
* Jest for unit testing
* SuperTest for API testing
```
$npm init -y
$npm install
$npm run dev
```

Access to backend
* http://localhost:3000/
* http://localhost:3000/api-docs/