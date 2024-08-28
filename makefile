.PHONY: stop clean enter dev

stop:
	docker stop $(shell docker ps -a -q)

clean:
	docker system prune -af --volumes

enter:
	docker exec -it $(target) sh

dev: 
	docker compose --env-file .env.dev -f compose.dev.yaml up --build -d
