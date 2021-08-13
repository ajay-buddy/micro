# create secret
kubectl create secret generic jwt-secret-key --from-literal=JWT_KEY=<JWT_KEY>

# View secrets
kubectl get secrets
