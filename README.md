# Real-Time Chat App

## Run locally
```bash
docker-compose up --build
```

## Access
Frontend: http://localhost:5173  
Backend: http://localhost:3000/health

## CI/CD
- GitHub Actions builds & pushes Docker images
- Jenkinsfile included for Jenkins pipeline
- Kubernetes manifests in /k8s
