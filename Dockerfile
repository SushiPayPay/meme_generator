# Stage 1: Build the Next.js client
FROM node:lts-alpine as client-builder
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm ci
COPY client ./

# Stage 2: Build the Express.js server
FROM node:lts-alpine as server-builder
WORKDIR /app/server
COPY server/package.json server/package-lock.json ./
RUN npm ci
COPY server ./
