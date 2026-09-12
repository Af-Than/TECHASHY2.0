# Docker Setup for Techashy Frontend

This Next.js application is dockerized with support for both development and production environments.

## Files Created

- `Dockerfile` - Multi-stage production build
- `Dockerfile.dev` - Development environment
- `docker-compose.yml` - Development orchestration
- `docker-compose.prod.yml` - Production orchestration
- `.dockerignore` - Excludes unnecessary files from Docker builds

## Usage

### Development Mode

```bash
# Build and run with hot-reload
docker-compose up

# Run in detached mode
docker-compose up -d

# Stop containers
docker-compose down
```

The development server will be available at `http://localhost:3001`

### Production Mode

```bash
# Build and run production container
docker-compose -f docker-compose.prod.yml up --build

# Run in detached mode
docker-compose -f docker-compose.prod.yml up -d

# Stop containers
docker-compose -f docker-compose.prod.yml down
```

### Using Dockerfile Directly

**Development:**
```bash
docker build -f Dockerfile.dev -t techashy-frontend-dev .
docker run -p 3001:3001 -v $(pwd):/app -v /app/node_modules techashy-frontend-dev
```

**Production:**
```bash
docker build -t techashy-frontend-prod .
docker run -p 3001:3001 techashy-frontend-prod
```

## Environment Variables

Add any required environment variables to the `docker-compose.yml` or `docker-compose.prod.yml` files under the `environment` section.

## Notes

- The production build uses Next.js standalone output for optimized Docker images
- Development mode includes hot-reload support with Docker watch mode
- Port 3001 is exposed by default (matching package.json scripts)
