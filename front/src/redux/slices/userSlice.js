import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  favorites: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userData = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const { setUser, setFavorites } = userSlice.actions;
export default userSlice.reducer;
