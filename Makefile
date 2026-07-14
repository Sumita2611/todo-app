.PHONY: help install dev build test lint preview clean docker-build docker-run docker-stop

# Variables
DOCKER_IMAGE_NAME ?= todo-app
DOCKER_CONTAINER_NAME ?= todo-app-container
DOCKER_PORT ?= 8080
NODE_ENV ?= development

# Default target
help:
	@echo "Available targets:"
	@echo "  make install       - Install dependencies"
	@echo "  make dev           - Start development server"
	@echo "  make build         - Build for production"
	@echo "  make test          - Run tests"
	@echo "  make lint          - Run ESLint"
	@echo "  make preview       - Preview production build"
	@echo "  make clean         - Remove build artifacts and node_modules"
	@echo "  make docker-build  - Build Docker image"
	@echo "  make docker-run    - Run Docker container"
	@echo "  make docker-stop   - Stop running Docker container"

# Install dependencies
install:
	@echo "Installing dependencies..."
	npm install

# Start development server
dev: install
	@echo "Starting development server..."
	npm run dev

# Build for production
build: install
	@echo "Building for production..."
	npm run build

# Run tests
test: install
	@echo "Running tests..."
	npm run test

# Run linter
lint: install
	@echo "Linting code..."
	npm run lint

# Preview production build
preview: build
	@echo "Previewing production build..."
	npm run preview

# Clean up
clean:
	@echo "Cleaning up..."
	@if exist dist rmdir /s /q dist
	@if exist node_modules rmdir /s /q node_modules
	@echo "Clean complete"

# Build Docker image
docker-build:
	@echo "Building Docker image: $(DOCKER_IMAGE_NAME)..."
	docker build -t $(DOCKER_IMAGE_NAME):latest .
	@echo "Docker image built successfully"

# Run Docker container
docker-run: docker-build
	@echo "Running Docker container: $(DOCKER_CONTAINER_NAME)..."
	docker run -d -p $(DOCKER_PORT):80 --name $(DOCKER_CONTAINER_NAME) $(DOCKER_IMAGE_NAME):latest
	@echo "Container running at http://localhost:$(DOCKER_PORT)"

# Stop Docker container
docker-stop:
	@echo "Stopping Docker container: $(DOCKER_CONTAINER_NAME)..."
	docker stop $(DOCKER_CONTAINER_NAME) 2>/dev/null || true
	docker rm $(DOCKER_CONTAINER_NAME) 2>/dev/null || true
	@echo "Container stopped"
