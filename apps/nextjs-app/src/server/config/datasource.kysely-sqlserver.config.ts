import { KyselyDatasource } from '@flowblade/source-kysely';

import { dbKyselySqlServer } from '@/server/config/db.kysely-sqlserver.config';

export const workshopDatasource = new KyselyDatasource({
  connection: dbKyselySqlServer,
});
