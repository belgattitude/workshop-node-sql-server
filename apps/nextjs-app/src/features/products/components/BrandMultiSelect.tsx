'use client';

import { MultiSelect } from 'primereact/multiselect';
import { type FC, useState } from 'react';

import { cn } from '@/components/utils';
import type { BrandRepoSearchData } from '@/features/products/server/brand.repo';

type Props = {
  className?: string | undefined;
};

type Brands = BrandRepoSearchData;

export const BrandMultiSelect: FC<Props> = (props) => {
  const { className } = props;
  const [selectedBrands, setSelectedBrands] = useState<Brands>();
  const brands: Brands = [];

  return (
    <div className={cn('', className)}>
      <MultiSelect
        value={selectedBrands}
        onChange={(e) => setSelectedBrands(e.value as Brands)}
        options={brands}
        optionLabel="name"
        display="chip"
        placeholder="Select brands"
        maxSelectedLabels={3}
        filter={true}
        className=""
      />
    </div>
  );
};
