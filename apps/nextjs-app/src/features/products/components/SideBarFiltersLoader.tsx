import { useQuery } from '@tanstack/react-query';
import { type FC, type PropsWithChildren, useEffect } from 'react';

import { fetchAllBrands } from '@/features/products/api/fetch-all-brands';
import { productSideBarFiltersSlice } from '@/features/products/redux/ProductSideBarFiltersSlice';
import { useAppDispatch } from '@/redux/redux-hooks';

type Props = PropsWithChildren;

export const SideBarFiltersLoader: FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const { isPending, error, data } = useQuery({
    queryKey: ['fetch-all-brands'],
    queryFn: () => {
      return fetchAllBrands();
    },
  });

  useEffect(() => {
    if (!data) return;
    dispatch(
      productSideBarFiltersSlice.actions.loadSearchData({
        brands: data,
      })
    );
  }, [dispatch, data, isPending]);

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return <>{props.children}</>;
};
