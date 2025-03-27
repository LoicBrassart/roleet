# Campaign

- ✅ title: string
- ✅ bannerUrl: string
- ✅ storyteller: User
- ✅ contenu: Scenario[]
- ✅ players: User[]
  - personnages: Personnage[]
- messages: Message[]

## Startup

- `make stop && make clean`
- `sudo rm -rf persist/`
- `make run dev`
- `sudo cp backend/src/scripts/fixtures/img/* persist/files-dev/`
- `docker exec -it backend-dev sh`
  - `npm run db:fixtures`
