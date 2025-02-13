# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY spa/package*.json ./
RUN npm ci
COPY spa/. .
RUN npm run build

# Stage 2: Host
FROM nginx:alpine AS runtime
COPY --from=build /app/build ./app/spa
COPY nginx.conf /etc/nginx/conf.d/default.conf