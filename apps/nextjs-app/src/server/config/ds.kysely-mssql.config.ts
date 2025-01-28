import { KyselyDatasource } from '@flowblade/source-kysely';

import { dbKyselyMssql } from '@/server/config/db.kysely-mssql.config';

export const workshopDatasource = new KyselyDatasource({
  connection: dbKyselyMssql,
});
