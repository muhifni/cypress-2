pipeline {
  agent any

  options {
    ansiColor('xterm')
  }

  tools {
    nodejs "NodeJS_24.0.0"
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
        sh 'npm ci || npm install'
      }
    }

    stage('Run Cypress Tests') {
      steps {
        sh 'npx cypress run --headless --browser chromium --spec "cypress/e2e/1-getting-started/*.cy.js"'
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
