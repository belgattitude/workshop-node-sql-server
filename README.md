# Workshop Node SQL Server

A boilerplate project to play with sql server from nodejs. Don't use in production,
it basically allows workshop participants to try out different scenarios with sql server
(prisma or kysely or tedious ?). Exercises will be provided during the session.

## Getting started

> <details>
> <summary>Requirements: node 18+, yarn, docker. For Windows users WSL2 unbuntu recommended.</summary>
>
> ```bash
> nvm install v20  # if you don't have nodejs installed
> npm i -g yarn 
> ```
> </details> 

### Clone the repository

```bash
git clone https://github.com/belgattitude/workshop-node-sql-server.git
cd workshop-node-sql-server
```
### Run the local database

In a new terminal:

```bash
docker compose -f ./docker/sql-edge/compose.yml up
# Alternatively if you want to run in detached mode
docker compose -f ./docker/sql-edge/compose.yml up -d --wait
```

### Create the database

```bash
yarn workspace @workshop/db-sqlserver run db-recreate
yarn workspace @workshop/db-sqlserver run prisma-db-seed  
```
### Open the database studio

```bash
yarn workspace @workshop/db-sqlserver run prisma-studio  
```

![prisma-studio.png](docs/images/prisma-studio.png)

**tip** Install a database ui tool like [Jetbrains datagrip](https://www.jetbrains.com/datagrip/),
[Jetbrains westorm database plugin](https://plugins.jetbrains.com/plugin/10925-database-tools-and-sql-for-webstorm),
[dbbeaver](https://dbeaver.io/) (free), [vscode extension](https://marketplace.visualstudio.com/items?itemName=ms-mssql.mssql)
or [azure data studio](https://learn.microsoft.com/en-us/azure-data-studio/download-azure-data-studio?tabs=win-install%2Cwin-user-install%2Credhat-install%2Cwindows-uninstall%2Credhat-uninstall) (free).

## Documentation

### Repo structure

The monorepo is organized as follows:

```
.
├── apps
│   │── fastify-app
│   └── next-app       ✅ Nextjs 14+ / hono api / kysely.
├── docker
│   └── sql-edge       ✅ compose.yaml
└── packages
    └── db-sqlserver   ✅ Manages database creation, types and seeds
```

### Launch Nextjs

> The app we'll use during the workshop

```bash
cd apps/nextjs-app
yarn dev
```

Check out the [Next.js app](apps/nextjs-app/README.md) for more details.

### @workshop/db-sqlserver

> The package responsible for database creation / ddl / seeds and types generation.

Check out the [@workshop/db-sqlserver](packages/db-sqlserver/README.md) for more details.

![schema.png](packages/db-sqlserver/docs/images/schema.png)

## License

MIT © [Sébastien Vanvelthem](https://github.com/belgattitude).
