export const dynamic = 'force-dynamic';

import { format } from 'sql-formatter';

import { ShikiSSRCode } from '@/components/code/ShikiSSRCode';
import { productRepo } from '@/features/products/config/product-repo.config';
import { workshopRepo } from '@/features/workshop/workshop.config';

const workshopExamples = {
  product: productRepo.search({ searchName: 'bio', limit: 10 }),
  query1: workshopRepo.query1({ searchName: 'test', limit: 10 }),
};

export default async function WorkshopRoute() {
  const { data, meta = null } = await workshopExamples.product;

  let formattedSql: string | undefined;
  if (meta?.query?.sql !== undefined) {
    try {
      formattedSql = format(meta.query.sql, { language: 'tsql' });
    } catch (e) {
      formattedSql = `Failed to format SQL ${(e as Error).message}`;
    }
  }

  return (
    <div className={'m-5 p-5'}>
      <div
        className={
          'rounded-lg bg-gradient-to-r from-sky-200 to-sky-400 p-3 !pr-0 md:p-8 lg:p-12'
        }
      >
        <div className={'grid grid-cols-2 gap-5 w-full'}>
          <div className={'flex flex-col gap-5'}>
            <ShikiSSRCode
              filename={'meta'}
              code={JSON.stringify(meta, null, 2)}
              lang={'json'}
            />
            {formattedSql !== undefined && (
              <ShikiSSRCode filename={'sql'} code={formattedSql} lang={'sql'} />
            )}
          </div>
          <ShikiSSRCode
            filename={'data'}
            code={JSON.stringify(data, null, 2)}
            lang={'json'}
          />
        </div>
      </div>
    </div>
  );
}
