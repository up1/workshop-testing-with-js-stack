# Testing workshop 2025/01/09
* Frontend with Vue
  * Testing with Playwright 
* Backend with NodeJS
  * Testing with Postman  
* Database with MSSQL server
* Scan code with SonarQube

## 1. Setup database
* [MS SQL Server](https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver16&tabs=cli&pivots=cs1-bash)
```
// Create database server
$docker compose up -d db
$docker compose ps
NAME      IMAGE                                        COMMAND                  SERVICE   CREATED        STATUS                  PORTS
db        mcr.microsoft.com/mssql/server:2022-latest   "/opt/mssql/bin/perm…"   db        24 hours ago   Up 24 hours (healthy)   0.0.0.0:1433->1433/tcp

// Initial data for test
$docker compose up -d initial_db
```

## 2. Backend with NodeJS
Create project and run
* Jest for unit testing
* SuperTest for API testing
```
$npm init -y
$npm install
$npm run dev
```

Run with Docker
```
$export API_PORT=3001
$docker compose up -d api --build
$docker compose ps
```

Access to backend
* http://localhost:3000/
* http://localhost:3000/api-docs/

## 3. API testing with postman and newman
```
$docker compose up api_test --abort-on-container-exit --build
```

## 4. Frontend with VueJS
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

Access to frontend
* http://localhost:5173/

Build for production mode
```
$npm run build
```

Run with Docker
```
$export API_PORT=8889
$docker compose up -d ui --build
$docker compose ps
```

Access to frontend
* http://localhost:8888/

## 6. UI testing with playwright
```
$docker compose up ui_test --abort-on-container-exit --build
```

## 7. Scan code with SonarqQube

Backend
```
$export SONAR_HOST_URL=http://157.230.240.135:9000
$export SONAR_TOKEN=token
$export SONAR_PROJECT_NAME=somkiat-backend
$export SONAR_PROJECT_KEY=somkiat-backend
$docker compose up sonarscanner_api --abort-on-container-exit --build
```

Frontend
```
$export SONAR_HOST_URL=http://157.230.240.135:9000
$export SONAR_TOKEN=token
$export SONAR_PROJECT_NAME=somkiat-frontend
$export SONAR_PROJECT_KEY=somkiat-frontend
$docker compose up sonarscanner_ui --abort-on-container-exit --build
```
