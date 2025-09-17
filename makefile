.PHONY: stop clean run

stop:
	docker stop $(shell docker ps -a -q)

clean:
	docker system prune -af --volumes; \
	sudo rm -rf persist/

# ie. `make run dev`
run:
	ENV=$(word 2,$(MAKECMDGOALS));\
	ENV_FILE=.env.$$ENV; \
	COMPOSE_FILE=compose.$$ENV.yaml; \
	if [ -f "$$ENV_FILE" ] && [ -f "$$COMPOSE_FILE" ]; then \
		docker compose --env-file $$ENV_FILE -f $$COMPOSE_FILE up --build -d; \
		if [ $$ENV = "dev" ]; then \
			npm install; \
			npm run cp:images;\
		fi \
	else \
		echo "Fichier $$ENV_FILE ou $$COMPOSE_FILE non trouvé."; \
	fi
