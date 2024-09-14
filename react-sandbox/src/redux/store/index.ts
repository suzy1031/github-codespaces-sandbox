import { configureStore, createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { count: 0 },
  reducers: {
    increment: (state, action) => {
      state.count += action.payload.value;
    },
    decrement: (state, action) => {
      state.count -= action.payload.value;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

const store = configureStore({
  reducer: counterSlice.reducer,
});

export default store;
