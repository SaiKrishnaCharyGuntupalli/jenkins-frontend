pipeline {
    agent any
    
    tools {
        nodejs "NodeJS-18"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out code on local machine...'
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                echo '📦 Installing npm packages...'
                sh 'npm install'
            }
        }
        
        stage('Build React App') {
            steps {
                echo '🔨 Building React application...'
                sh 'npm run build'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh 'docker build -t react-frontend .'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Deploying React container...'
                sh '''
                    # Stop and remove old container
                    docker stop react-app || true
                    docker rm react-app || true
                    
                    # Run new container
                    docker run -d -p 3000:3000 --name react-app react-frontend
                    
                    # Wait and verify
                    sleep 5
                    docker ps | grep react-app
                    
                    # Test the app from within the container network
                    docker exec react-app curl -f http://localhost:3000 || exit 1
                '''
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline completed successfully!'
            echo '🚀 React app running: http://localhost:3000'
            echo '🔗 Backend API: http://localhost:8000'
        }
        failure {
            echo '❌ Pipeline failed!'
            sh 'docker logs react-app || true'
        }
    }
}
