.PHONY: run
run:
	@npm run dev

.PHONY: format
format:
	@npm run format

.PHONY: lint
lint:
	@npm run lint

.PHONY: docker
docker:
	@docker build -t vite-react .
	@docker run --rm -it -p 3000:80 vite-react
