.PHONY: run
run:
	@npm run dev

.PHONY: docker
docker:
	@docker build -t vite-react .
	@docker run --rm -it -p 3000:80 vite-react
