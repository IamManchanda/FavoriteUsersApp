import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SimplifiedUser } from "../../types/user";

type UserState = {
  favorites: SimplifiedUser[];
};

const initialState: UserState = {
  favorites: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<SimplifiedUser>) {
      state.favorites.push(action.payload);
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(
        (user) => user.login.uuid !== action.payload,
      );
    },
  },
});

export const { addToFavorites, removeFromFavorites } = userSlice.actions;

export default userSlice.reducer;
