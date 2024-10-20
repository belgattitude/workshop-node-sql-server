'use client';

import { DynamicShikiCodeEditor } from '@/components/code/DynamicShikiCodeEditor';
import { $api } from '@/config/openapi-react-query.config';

export const ProductSearchPage = () => {
  const { data, isPending, error } = $api.useQuery(
    'get',
    '/api/products/search',
    {
      query: {
        limit: 10,
        searchName: 'bio',
      },
    }
  );

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="border-1 flex flex-col items-center gap-5 rounded-md p-5 shadow-lg">
          {data && (
            <DynamicShikiCodeEditor
              filename={'data'}
              code={JSON.stringify(data, null, 2)}
              lang={'json'}
            />
          )}
        </div>
      </div>
    </>
  );
};
