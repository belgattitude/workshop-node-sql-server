import { createSlice } from '@reduxjs/toolkit';

type CounterState = {
  value: number;
};

export const productSearchSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 } as CounterState,
  reducers: {
    increment: (state) => void state.value++,
  },
  selectors: {
    selectValue: (state) => state.value,
  },
});
