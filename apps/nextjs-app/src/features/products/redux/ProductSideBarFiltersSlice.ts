import {
  asyncThunkCreator,
  buildCreateSlice,
  createSelector,
  type PayloadAction,
} from '@reduxjs/toolkit';

export type Brand = {
  id: number;
  name: string;
};

export type ProductSideBarFiltersSelectedValues = {
  brands: Brand[];
};

export type ProductSideBarFiltersBaseState = {
  brands: Brand[];
};

export type ProductSideBarFiltersState = ProductSideBarFiltersBaseState & {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  selectedBrands: Brand[];
};

const initialState: ProductSideBarFiltersState = {
  status: 'idle',
  error: null,
  brands: [],
  selectedBrands: [],
};

type DataLoaderParams = {
  tenants?: string[];
};

export type ProductSideBarFiltersLoader = {
  fn: (params: DataLoaderParams) => Promise<ProductSideBarFiltersBaseState>;
  params: DataLoaderParams;
};

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const productSideBarFiltersSlice = createAppSlice({
  name: 'productSideBarFilters',
  initialState: initialState,
  reducers: (create) => ({
    loadSearchData: create.reducer(
      (state, action: PayloadAction<ProductSideBarFiltersBaseState>) => {
        const { brands } = action.payload;
        state.brands = brands;
        state.status = 'succeeded';
        state.error = null;
      }
    ),
    loadAsyncSearchData: create.asyncThunk(
      async (dataLoader: ProductSideBarFiltersLoader) => {
        const { fn, params } = dataLoader;
        return fn(params);
      },
      {
        rejected: (state, action) => {
          state.status = 'failed';
          state.error = action.error.message ?? 'Loading data failed';
        },
        pending: (state) => {
          state.status = 'pending';
          state.error = null;
        },
        fulfilled: (state, action) => {
          state.brands = action.payload.brands;
          state.status = 'succeeded';
          state.error = null;
        },
      }
    ),
    setSelectedBrands: create.reducer(
      (state, action: PayloadAction<Brand[]>) => {
        state.selectedBrands = action.payload;
      }
    ),
  }),
  selectors: {
    getSelectedBrands: createSelector(
      [(state: ProductSideBarFiltersState) => state.selectedBrands],
      (selectedBrands): ProductSideBarFiltersSelectedValues => {
        return {
          brands: selectedBrands,
        };
      }
    ),
  },
});
