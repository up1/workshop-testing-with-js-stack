pipeline {
    agent {
        label 'node01'
    }

    stages {
        stage('Check new code in main branch') {
            steps {
                git branch: 'main', url: 'https://github.com/up1/workshop-testing-with-js-stack.git'
            }
        }
        stage('Scan code of api') {
            steps {
                sh 'docker compose up sonarscanner_api --abort-on-container-exit'
            }
        }
        stage('Build image of API') {
            steps {
                sh 'docker compose build api'
            }
        }
        stage('Intial database') {
            steps {
                sh '''docker compose down
                docker compose up -d initial_db'''
            }
        }
        stage('Deploy API with docker') {
            steps {
                sh '''export API_PORT=4004
                docker compose up -d api'''
            }
        }
        stage('Parallel testing') {
            parallel {
                stage('Test 01') {
                    steps {
                        sh '''rm -rf postman-test-report/
                        docker compose up api_test --abort-on-container-exit --build'''
                    }
                }
                stage('Test 02') {
                    steps {
                        echo 'TODO'
                    }
                }
                stage('Test 03') {
                    steps {
                        echo 'TODO'
                    }
                }
            }
        }
        stage('Build image of UI') {
            steps {
                sh 'docker compose build ui'
            }
        }
        stage('Deploy UI with docker') {
            steps {
                sh '''export UI_PORT=9999
                docker compose up -d ui'''
            }
        }
        stage('UI test with playwright') {
            steps {
                sh 'docker compose up ui_test --abort-on-container-exit --build'
            }
        }
    }
    post {
        always {
            junit stdioRetention: '', testResults: 'postman-test-report/*.xml'
            junit stdioRetention: '', testResults: 'playwright-report/*.xml'
        }
    }  
}