# =============================================================================
# Stage 1 — BUILD
# This stage installs everything and compiles the React app.
# It will be thrown away after building — nothing from here
# except the compiled output reaches the final image.
# =============================================================================
FROM node:20-alpine AS builder

# Set the working directory inside this stage's container.
# All commands from here run inside /app.
WORKDIR /app

# --- Layer caching trick ---
# Copy ONLY the package files first, before the source code.
# Docker caches each layer. If package.json hasn't changed,
# Docker skips the npm install step on the next build.
# This saves minutes on every build after the first.
COPY package*.json ./

# Install ALL dependencies (dev + production).
# We need dev tools like Vite to compile the React app.
RUN npm install

# Now copy the rest of the source code.
# This is copied AFTER npm install so editing a React file
# does not invalidate the npm install cache.
COPY . .

# Compile the React app with Vite.
# Output goes to /app/dist as static HTML, CSS, and JS files.
RUN npm run build


# =============================================================================
# Stage 2 — PRODUCTION
# This is the image that actually ships and runs.
# It starts completely fresh — none of Stage 1's files are here
# except what we explicitly copy over.
# =============================================================================
FROM node:20-alpine

WORKDIR /app

# Install ONLY production dependencies.
# No Vite, no ESLint, no dev tools — keeps the image small and safe.
COPY package*.json ./
RUN npm install --omit=dev

# Copy the compiled React app from Stage 1.
# The build tools that produced it are left behind and discarded.
COPY --from=builder /app/dist ./dist

# Copy the Express server — this is what actually runs.
COPY server.js ./

# Create the data directory.
# The real data (progress.json) is stored on the HOST machine
# and mounted into this directory at runtime via a Docker volume.
# This mkdir just ensures the mount point exists in the image.
RUN mkdir -p /app/data

# Document which port the app listens on.
# This does NOT publish the port — that happens at runtime.
EXPOSE 3000

# The command that runs when the container starts.
# Using array format (exec form) is important — it means Node.js
# receives shutdown signals directly so it can save data gracefully.
CMD ["node", "server.js"]
