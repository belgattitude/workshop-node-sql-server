import {
  asyncThunkCreator,
  buildCreateSlice,
  createSelector,
  type PayloadAction,
} from '@reduxjs/toolkit';

export type ProductSearchResult = {
  id: number;
  reference: string;
};

export type ProductMultiSearchSelectedValues = {
  products: string[];
};

export type BaseProductMultiSearchState = {
  products: ProductSearchResult[];
};

export type ProductMultiSearchState = BaseProductMultiSearchState & {
  status: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
  selectedProducts: ProductSearchResult[];
};

const initialState: ProductMultiSearchState = {
  status: 'idle',
  error: null,
  products: [],
  selectedProducts: [],
};

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type DataLoaderParams = {
  brands?: number[];
};

export type ProductMultiSearchDataLoader = {
  fn: (params: DataLoaderParams) => Promise<BaseProductMultiSearchState>;
  params: DataLoaderParams;
};

export const productSearchSlice = createAppSlice({
  name: 'productSearch',
  initialState: initialState,
  reducers: (create) => ({
    loadInitialData: create.reducer(
      (state, action: PayloadAction<BaseProductMultiSearchState>) => {
        const { products } = action.payload;
        state.products = products;
        state.status = 'succeeded';
        state.error = null;
      }
    ),
    loadInitialDataFromAsync: create.asyncThunk(
      async (dataLoader: ProductMultiSearchDataLoader) => {
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
          state.products = action.payload.products;
          state.status = 'succeeded';
          state.error = null;
        },
      }
    ),
    setSelectedProducts: create.reducer(
      (state, action: PayloadAction<ProductSearchResult[]>) => {
        state.selectedProducts = action.payload;
      }
    ),
  }),
  selectors: {
    getSelectedProductsReferences: createSelector(
      [(state: ProductMultiSearchState) => state.selectedProducts],
      (selectedProducts): ProductMultiSearchSelectedValues => {
        return {
          products: selectedProducts.map((product) => product.reference),
        };
      }
    ),
  },
});
