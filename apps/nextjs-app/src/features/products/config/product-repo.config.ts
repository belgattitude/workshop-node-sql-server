import { BrandRepo } from '@/features/products/server/brand.repo';
import { ProductRepo } from '@/features/products/server/product.repo';
import { workshopDatasource } from '@/server/config/datasource.kysely-sqlserver.config';

export const productRepo = new ProductRepo({ ds: workshopDatasource });
export const brandRepo = new BrandRepo({ ds: workshopDatasource });
