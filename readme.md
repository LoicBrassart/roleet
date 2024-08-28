## Add a service
- create folder at project root
- add ownerships in .github/CODEOWNERS
- add service name in workflow files (search "Add services here")
- add mandatory commands to new service's `package.json`
    - "unit-tests"
    - "integration-tests"
- update `.env.dev`, `compose.dev.yaml` and `nginx.dev.conf` if relevant