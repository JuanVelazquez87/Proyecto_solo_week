import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contentDetails: null,
  allContent: [],
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setContentDetails: (state, action) => {
      state.contentDetails = action.payload;
    },
    setAllContent: (state, action) => {
      state.allContent = action.payload;
    },
  },
});
export const { setAllContent, setContentDetails } = contentSlice.actions;
export default contentSlice.reducer;
