'use client';

import { dequal as dequalLite } from 'dequal/lite';
import { MultiSelect } from 'primereact/multiselect';
import type { FC } from 'react';

import { cn } from '@/components/utils';
import {
  type Brand,
  productSideBarFiltersSlice,
} from '@/features/products/redux/ProductSideBarFiltersSlice';
import type { BrandRepoSearchData } from '@/features/products/server/brand.repo';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';

type Props = {
  className?: string | undefined;
};

type Brands = BrandRepoSearchData;

export const BrandMultiSelect: FC<Props> = (props) => {
  const { className } = props;

  const dispatch = useAppDispatch();
  const selectedBrands = useAppSelector(
    (state) => state.productSideBarFilters.selectedBrands,
    dequalLite
  );

  const brands = useAppSelector(
    (state) => state.productSideBarFilters.brands,
    dequalLite
  );

  return (
    <div className={cn('', className)}>
      <MultiSelect
        value={selectedBrands}
        onChange={(e) => {
          dispatch(
            productSideBarFiltersSlice.actions.setSelectedBrands(
              e.value as Brand[]
            )
          );
        }}
        options={brands}
        optionLabel="name"
        display="chip"
        placeholder="Select brands"
        maxSelectedLabels={3}
        filter={true}
        // className=""
      />
    </div>
  );
};
