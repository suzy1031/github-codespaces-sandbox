import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk("data/fetchData", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
});

const dataSlice = createSlice({
  name: "data",
  initialState: { value: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.value = action.payload;
        state.status = "success";
      })
      .addCase(fetchData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

const store = configureStore({
  reducer: dataSlice.reducer,
});

store.dispatch(fetchData());
