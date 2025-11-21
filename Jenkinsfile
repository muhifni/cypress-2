pipeline {
  agent {
    docker {
      image 'cypress/included:12.17.3'
    }
  }

  options {
    ansiColor('xterm')
  }

  environment {
    NODE_ENV = 'test'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Run Cypress Tests') {
      steps {
        sh 'npx cypress run --headless --browser chrome'
      }
    }

    stage('Archive Artifacts') {
      steps {
        archiveArtifacts artifacts: 'cypress/videos/**, cypress/screenshots/**', allowEmptyArchive: true
      }
    }
  }

  post {
    always {
      cleanWs()
    }
    failure {
      echo '❌ Cypress tests failed!'
    }
    success {
      echo '✅ Cypress tests passed!'
    }
  }
}
