import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { productID: string } = {
  productID: ""
};

const messageInformationSlice = createSlice({
  name: "messageInformation",
  initialState,
  reducers: {
    addProductID: (state, action: PayloadAction<string>) => {
      state.productID = action.payload;
    },
    removeProductID: (state) => {
      state.productID = "";
    },
  },
});

export const { addProductID, removeProductID } = messageInformationSlice.actions;
export default messageInformationSlice.reducer;