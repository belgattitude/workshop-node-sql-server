import { ProductRepo } from '@/features/products/server/product.repo';
import { workshopDatasource } from '@/server/config/datasource.kysely-sqlserver.config';

export const productRepo = new ProductRepo({ ds: workshopDatasource });
