## @flowblade/db-sqlserver

Example of a product database using SQL Server, Prisma and Kysely. 

> **Warning** See the [why Prisma and kysely](#why-prisma-and-kysely) FAQ.

### Quick start

```bash
yarn db-recreate-dev
yarn prisma-db-seed
```

DDL operations requires a SQL Server instance to be running.

```bash
docker compose -f ../../docker/sql-edge/compose.yml up
```

### Environment variables

Check the [.env](.env) file for the environment variables used in this example.

```
DB_FLOWBLADE_SQLSERVER_JDBC="sqlserver://localhost:1433;database=flowblade;user=sa;password=FlowbladeSADev123;trustServerCertificate=true;encrypt=false"
```

> Yon can create a './env.local' file to override the default values.

### FAQ

#### Why Prisma and Kysely?

While Prisma has official support for [Microsoft SQL Server](https://www.prisma.io/docs/orm/overview/databases/sql-server) 
it does not play well in many scenarios. See some context below:

- [ ] Incomplete azure authentication support: [Azure Ad](https://github.com/prisma/prisma/issues/12562), [Azure Managed identities](https://github.com/prisma/prisma/issues/13853),...
- [ ] Migration: Does not support NULL unique columns: See this [hack](https://github.com/belgattitude/workshop-node-sql-server/blob/06cc5c93b15971a4db3e95ac631a33f5c4da3a2e/libs/db-sqlserver/src/lib/hacks/fix-sql-server-null-unique-indexes.test.ts)
- [ ] By experience, Prisma has recurring issues with the connection pooler and they hard to track down.

Globally Prisma won't handle a few edges cases with SQL Server. On top of that the performance of the rust based engine
won't match the performance of pure-js [tedious](https://github.com/tediousjs/tedious) driver for large resultsets. This
is true for most prisma engines (see also the currently preview [driversAdapters](https://www.prisma.io/docs/orm/overview/databases/database-drivers) alternative). Or
[Drizzle benchmarks](https://orm.drizzle.team/benchmarks) to get an idea of the performance difference. But at the time of writing there
isn't yet a pure-js tedious based driver (only Pgsql, sqlite...).

Another set of features where Prisma lacks (as of 5.11):

- [ ] No query cancellation support: see [this](https://github.com/prisma/prisma/issues/15594). Same for [Kysely](https://github.com/kysely-org/kysely/issues/783) but
      it can be implemented by running some queries in tedious directly. 
- [ ] A query builder. While Prisma start to improve raw queries support for [TypedSql](https://www.prisma.io/docs/orm/prisma-client/using-raw-sql)
      having a query builder offers some advantages in term of composition (cte, parametrization...).

What Prisma has:

- [x] The `schema.prisma` dsl is a very nice way to design the database. Thanks to generators and/or scripts, it's relatively
      easy to generate [documentation](https://github.com/notiz-dev/prisma-dbml-generator),
     [kysely types](https://github.com/valtyr/prisma-kysely) and **output a DDL file** that can be
      used to by migration tools. It's often a good idea to apply migrations with the [SqlServer DacPac](https://learn.microsoft.com/en-us/sql/relational-databases/data-tier-applications/data-tier-applications?view=sql-server-ver16)
      from the generated DDL file rather than using prisma. 
- [x] A very interesting way to simplify N+1 issues is the [relationJoins](https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#when-to-use-which-load-strategy) preview feature.
      Something harder to write with an sql builder. Very nice when working with graphql (ie: pothos...) that by design allows to 
      retrieve nested structures. Unfortunately support for SQL server is not as tested as Postgres...

What Kysely has:

- [x] The query builder is very nice when having to deal with more complex queries. The fact that
      we can't mix and match queryRaw and QueryBuilder code is amazing in situations where there's no choice.

So The idea is 

- [x] In development: Use Prisma to maintain the schema, the seeds and kysely types generation.
- [x] In production: Use Kysely with tedious driver and tarn as a connection pooler.


- 

### Schema

![schema.png](docs%2Fimages%2Fschema.png)

### Local scripts

| Name                        | Description                                               |
|-----------------------------|-----------------------------------------------------------|
| `yarn codegen`              | Run codegen (prisma generate...)                          |
| `yarn db-recreate-dev`      | Reset the database and apply the latest schema with seeds |
| `yarn prisma-db-seed`       | Load seeds into database                                  |
| `yarn prisma-db-reset-push` | Drop and recreate database                                |
| `yarn prisma-db-push`       | Attempt to apply schema changes to database               |
| `yarn prisma-studio`        | Launch prisma studio (ui admin)                           |
| `yarn prisma-validate`      | Validate schema.prisma                                    |
| `yarn prisma-format`        | Format schema.prisma                                      |
| `yarn lint`                 | Check for lint errors                                     |
| `yarn lint --fix`           | Attempt to run linter auto-fix                            |
| `yarn test-unit`            | Run unit tests                                            |
| `yarn clean`                | Remove all caches                                         |
