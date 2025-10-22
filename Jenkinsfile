pipeline {
    agent any
    
    tools {
        nodejs "NodeJS-18"
    }
    
    environment {
        DOCKER_IMAGE = "react-frontend"
        CONTAINER_NAME = "react-app"
        #REACT_APP_API_URL = "http://host.docker.internal:8000"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '📥 Pulling code from GitHub...'
                git branch: 'main',
                    url: 'https://github.com/yourusername/your-react-repo.git'
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
        
        stage('Create Dockerfile') {
            steps {
                echo '🐳 Creating Dockerfile...'
                sh '''
                    cat > Dockerfile << 'EOF'
FROM nginx:alpine
COPY build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
EOF
                '''
                
                sh '''
                    cat > nginx.conf << 'EOF'
server {
    listen 3000;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
EOF
                '''
            }
        }
        
        stage('Build Docker Image') {
            steps {
                echo '🐳 Building Docker image...'
                sh 'docker build -t ${DOCKER_IMAGE}:latest .'
            }
        }
        
        stage('Deploy Container') {
            steps {
                echo '🚀 Deploying React container...'
                sh '''
                    # Stop and remove existing container if exists
                    docker stop ${CONTAINER_NAME} || true
                    docker rm ${CONTAINER_NAME} || true
                    
                    # Run new container
                    docker run -d \
                        --name ${CONTAINER_NAME} \
                        -p 3000:3000 \
                        --network bridge \
                        ${DOCKER_IMAGE}:latest
                    
                    echo "✅ React app deployed successfully!"
                    echo "🌐 Access at: http://localhost:3000"
                '''
            }
        }
    }
    
    post {
        success {
            echo '✅ Pipeline completed successfully!'
            echo '🌐 Frontend: http://localhost:3000'
            echo '🔗 Backend: http://localhost:8000'
        }
        failure {
            echo '❌ Pipeline failed! Check logs above.'
        }
    }
}
