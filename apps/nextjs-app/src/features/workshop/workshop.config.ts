import { WorkshopRepo } from '@/features/workshop/workshop.repo';
import { workshopDatasource } from '@/server/config/datasource.kysely-sqlserver.config';

export const workshopRepo = new WorkshopRepo({
  ds: workshopDatasource,
});
