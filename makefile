.PHONY: stop clean enter dev loc e2e

stop:
	docker stop $(shell docker ps -a -q)

clean:
	docker system prune -af --volumes

enter:
	docker exec -it $(target) sh

loc: 
	docker compose --env-file .env.loc -f compose.loc.yaml up --build -d

dev: 
	docker compose --env-file .env.dev -f compose.dev.yaml up --build -d

e2e: 
	docker compose --env-file .env.e2e -f compose.e2e.yaml run e2e-tests
