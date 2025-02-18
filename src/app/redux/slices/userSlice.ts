import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserValue {
  fullName: string | null;
  email: string | null;
  token: string | null;
  username: string | null;
  aboutDescription: string | null;
  profilePicture: string | null;
  country: string | null;
  city: string | null;
  gender: string | null;
  birthDate: string | null;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    zipCode: string;
  } | null;
  likedProducts: string[] | null;
  postedProducts: string[] | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}

interface UserState {
  value: UserValue;
}

const initialState: UserState = {
  value: {
    fullName: null,
    email: null,
    token: null,
    username: null,
    aboutDescription: null,
    profilePicture: null,
    country: null,
    city: null,
    gender: null,
    birthDate: null,
    shippingAddress: null,
    likedProducts: null,
    postedProducts: null,
    createdAt: null,
    updatedAt: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserValue>) => {
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = initialState.value;
    },
  },
});

export const { updateUser, logout } = userSlice.actions;
export default userSlice.reducer;
