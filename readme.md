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

## Create this template
### GHub Settings (template repo)

#### General

##### Features
- [x] Template Repository
- [ ] Wikis
- [ ] Issues
- [ ] Preserve this repository
- [ ] Projects

##### Pull Requests
- [ ] Allow merge commits
- [x] Allow squash merging Loading
  - Default commit message: Pull request title
- [ ] Allow rebase merging 
- [ ] Allow auto-merge 
- [ ] Automatically delete head branches

#### Collaborators
- Inviter les collaborateurs

#### Branches

##### Branch protection rule: "main", "staging", "dev"
- [x] Require a pull request before merging
  - [x] Require approvals (1)
  - [x] Dismiss stale pull request approvals when new commits are pushed
  - [x] Require review from Code Owners _(NB: cf `.github/CODEOWNERS`)_
  - [x] Require approval of the most recent reviewable push
- [x] Require status checks to pass before merging
  - [x] Require branches to be up to date before merging
- [ ] Require deployments to succeed before merging _(NB: pour l'instant !)
