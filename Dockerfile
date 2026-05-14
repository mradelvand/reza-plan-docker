# ─────────────────────────────────────────────────────────────────────────────
# Stage 1 — BUILD
# Install all dependencies and compile the React app into static files
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files first so Docker caches this layer
# (only re-runs npm install when package.json actually changes)
COPY package*.json ./

RUN npm install

# Copy all source files
COPY . .

# Build the React app — output goes to /app/dist
RUN npm run build


# ─────────────────────────────────────────────────────────────────────────────
# Stage 2 — PRODUCTION
# Lean image — only what's needed to run the server
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine

WORKDIR /app

# Copy package files and install ONLY production dependencies
# (no React dev tools, no Vite, no eslint — keeps image small)
COPY package*.json ./
RUN npm install --omit=dev

# Copy the built React app from the builder stage
COPY --from=builder /app/dist ./dist

# Copy the server
COPY server.js ./

# The data folder is a Docker volume (see docker-compose.yml)
# This just ensures the directory exists in the image
RUN mkdir -p /app/data

# Port the app listens on
EXPOSE 3000

# Start command — just the Express server
# It serves both the React app (from /dist) and the API
CMD ["node", "server.js"]
