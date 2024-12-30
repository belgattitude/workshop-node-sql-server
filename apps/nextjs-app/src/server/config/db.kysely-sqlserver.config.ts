import {
  createKyselySqlServerDialect,
  TediousConnUtils,
} from '@flowblade/source-kysely';
import type { DBKyselySqlServer } from '@workshop/db-sqlserver/kysely-types';
import { Kysely } from 'kysely';

import { serverEnv } from '../../env/server.env.mjs';

const config = TediousConnUtils.fromJdbcDsn(
  serverEnv.DB_FLOWBLADE_SQLSERVER_JDBC ?? ''
);

const logPooler = (msg: string) => {
  console.log(`[pooler] ${msg}`);
};

const dialect = createKyselySqlServerDialect({
  tediousConfig: config,
  poolOptions: {
    min: 0,
    max: 10,
    // 👇 disable connection validation (avoid a round trip to the database)
    validateConnections: false,
    // 👇 if the database connection fails, propagate the error to the caller
    //
    propagateCreateError: true,
    log: process.env.NODE_ENV === 'development' ? logPooler : undefined,
  },
  dialectConfig: {
    // 👇 disable connection reset (avoid a round trip to the database)
    resetConnectionOnRelease: false,
  },
});

const maskPII = (param: unknown) => {
  // @todo filter out personal identifiable information
  return param;
};

export const dbKyselySqlServer = new Kysely<DBKyselySqlServer>({
  dialect: dialect,
  /*
  log: (event) => {
    if (event.level === 'error') {
      console.error('Query failed :', {
        durationMs: event.queryDurationMillis,
        error: event.error,
        sql: event.query.sql,
        params: event.query.parameters.map((param) => maskPII(param)),
      });
    } else {
      console.log('Query executed :', {
        durationMs: event.queryDurationMillis,
        sql: event.query.sql,
        params: event.query.parameters.map((param) => maskPII(param)),
      });
    }
  }, */
});
