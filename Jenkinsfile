pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps { git 'https://github.com/gattisuresh/real-time-chat-app.git' }
    }
    stage('Build') {
      steps { sh 'docker-compose build' }
    }
    stage('Push to Docker Hub') {
      steps {
        withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
          sh 'echo $PASS | docker login -u $USER --password-stdin'
          sh 'docker push $USER/rt-chat-backend:latest'
          sh 'docker push $USER/rt-chat-frontend:latest'
        }
      }
    }
  }
}