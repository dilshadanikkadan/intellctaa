#!/bin/bash

# Run api-gateway
cd api-gateway/
npm start &

# Run auth-service
cd ../auth/
npm run dev &

# Run notification-service
cd ../notification/
npm run dev &

# Run payment-service
cd ../client/
npm run dev &

wait