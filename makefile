.PHONY: stop clean enter run

stop:
	docker stop $(shell docker ps -a -q)

clean:
	docker system prune -af --volumes

# ie. `make run dev`
run:
	@ENV_FILE=.env.$(word 2,$(MAKECMDGOALS)); \
	COMPOSE_FILE=compose.$(word 2,$(MAKECMDGOALS)).yaml; \
	if [ -f "$$ENV_FILE" ] && [ -f "$$COMPOSE_FILE" ]; then \
		docker compose --env-file $$ENV_FILE -f $$COMPOSE_FILE up --build -d; \
	else \
		echo "Fichier $$ENV_FILE ou $$COMPOSE_FILE non trouvé."; \
	fi

# ie. `make enter dev adminer`
enter:
	@ENV=$(word 2,$(MAKECMDGOALS)); \
	COMPOSE_FILE=compose.$${ENV}.yaml; \
	CONTAINER_NAME=$(word 3,$(MAKECMDGOALS))-$${ENV}; \
	if [ -f "$$COMPOSE_FILE" ]; then \
		docker compose -f $$COMPOSE_FILE exec $$CONTAINER_NAME sh; \
	else \
		echo "Fichier $$COMPOSE_FILE non trouvé."; \
	fi
