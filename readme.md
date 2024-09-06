## Use this template
### Initialize
- click "Use this template"
- create your GHub repository
- clone it to your machine, enter the folder
- `cp .env.sample .env.dev` and fill it with relevant values
- `make dev` should build your first environment

### Add a service
- create folder at project root
- add ownerships in .github/CODEOWNERS
- add service name in workflow files (search "Add services here")
- add mandatory commands to new service's `package.json`
    - "unit-tests"
    - "integration-tests"
- update `.env.dev`, `compose.dev.yaml` and `nginx.dev.conf` if relevant

### Deploy application on a new server
_NB: Commands and instructions that should be run on the dev machine will be prefixed with "💻" ; those to run on your deployment machine by "🏭"_

#### Security & initial setup [TODO]
- Change SSH port
- Install fail2ban, docker, caddy, webhook

#### Set up target environments (dev/staging/prod)
To install an app named APPNAME:
- 💻`cp compose.dev.yaml nginx.dev.conf .env.dev deploy/acme/dev/`
- 💻 Change `.env.dev` contents to something somewhat secure
- 💻`mv deploy/acme deploy/APPNAME`
- 💻`scp deploy/APPNAME myUser@myHost:~/apps`
- 🏭 Create an SSH key and link it to your GHub repository
- 🏭 Edit `/etc/caddy/Caddyfile` to match your server's ports' mapping (sample available in this repo: deploy/Caddyfile)
- 🏭`systemctl reload caddy`
- 🏭`cd ~/apps/APPNAME/dev && GATEWAY_PORT=8001 docker compose up --build -d` (Change "8001" for whatever port you chose in Caddyfile)

## GHub Settings (template repo)

### General

#### Features
- [ ] Template Repository
- [ ] Wikis
- [ ] Issues
- [ ] Preserve this repository
- [ ] Projects

#### Pull Requests
- [ ] Allow merge commits
- [x] Allow squash merging Loading
  - Default commit message: Pull request title
- [ ] Allow rebase merging 
- [ ] Allow auto-merge 
- [ ] Automatically delete head branches

### Collaborators
- Inviter les collaborateurs

### Branches

#### Branch protection rule: "main", "staging", "dev"
- [x] Require a pull request before merging
  - [x] Require approvals (1)
  - [x] Dismiss stale pull request approvals when new commits are pushed
  - [x] Require review from Code Owners _(NB: cf `.github/CODEOWNERS`)_
  - [x] Require approval of the most recent reviewable push
- [x] Require status checks to pass before merging
  - [x] Require branches to be up to date before merging
- [ ] Require deployments to succeed before merging _(NB: pour l'instant !)

### WebHooks
- Add WebHook
  - Payload URL: specific url you declared on your vps
  - [x] Enable SSL
  - [x] Just the Push event (unless our project needs something else, obviously)
  - [x] Active
