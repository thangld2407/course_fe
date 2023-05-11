import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    blogData: [],
    loading: false,
  },

  reducers: {
    setBlogData: (state, action) => {
      state.blogData = action.payload;
    },
    setLoading: (state) => {
      state.loading = !state.loading;
    },
  },
});

const { reducer, actions } = loadingSlice;

export const { setBlogData, setLoading } = actions;

export default reducer;
