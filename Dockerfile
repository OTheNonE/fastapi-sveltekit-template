# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/. .
RUN npm run build

# Stage 2: Runtime
FROM python:3.9 AS runtime
WORKDIR /app

COPY ./backend/requirements.txt /app/
RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

COPY backend/src/. ./src/

COPY --from=build /app/build ./build

EXPOSE 8000
CMD ["fastapi", "run", "src/main.py"]