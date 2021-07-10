.PHONY: clean start logs stop

all: clean start

clean:
	docker compose down --rmi all --volumes --remove-orphans
	rm -vrf ./frontend/node_modules
	rm -vrf ./backend/.venv

start:
	docker compose up -d

logs:
	docker compose logs -f

stop:
	docker compose stop


