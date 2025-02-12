import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
  email: string | null;
  firstname: string | null;
  lastname: string | null;
}

const initialState: UserState = {
  token: null,
  email: null,
  firstname: null,
  lastname: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.firstname = action.payload.firstname;
      state.lastname = action.payload.lastname;
    },
    logout: (state) => {
      state.token = null;
      state.email = null;
      state.firstname = null;
      state.lastname = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;