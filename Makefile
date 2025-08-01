# ==============================================================================
#  Development Tasks
# ==============================================================================
.PHONY: run lint format

run:
	@echo "🚀 Starting development server..."
	@bun run dev

lint:
	@echo "🔎 Linting code..."
	@bun run lint

format:
	@echo "💅 Formatting code..."
	@bun run format

# ==============================================================================
#  Production Tasks
# ==============================================================================
.PHONY: build preview

build:
	@echo "🚀 Starting build production app..."
	@bun run build

preview:
	@echo "🚀 Starting preview production app..."
	@bun run preview

# ==============================================================================
#  Docker Tasks
# ==============================================================================
.PHONY: docker-build docker-run

# Builds the Docker image.
docker-build:
	@echo "🐳 Building Docker image..."
	@docker build -t react-app .

# Runs the Docker container. This depends on the image being built first.
# --rm: Automatically removes the container when it exits.
# -p 3000:80: Maps port 3000 on the host to port 80 in the container.
docker-run: docker-build
	@echo "🚢 Running Docker container..."
	@docker run --rm -it -p 3000:80 react-app