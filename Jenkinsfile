pipeline {
    agent any

    environment {
        IMAGE_NAME = "task-volume"
        CONTAINER_NAME = "task-manager"
    }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/ADiTY0102/Task-Manager.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME% .'
            }
        }

        stage('Stop Old Container') {
            steps {
                bat 'docker stop %CONTAINER_NAME% || exit 0'
                bat 'docker rm %CONTAINER_NAME% || exit 0'
            }
        }

        stage('Run New Container') {
            steps {
                bat '''
                docker run -d -p 3000:3000 ^
                --name %CONTAINER_NAME% ^
                -v taskdata:/app/files ^
                %IMAGE_NAME%
                '''
            }
        }
    }
}
