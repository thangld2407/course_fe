import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer/loadingReducer";

export const store = configureStore({
  reducer: {
    loading: reducer,
  },
});
