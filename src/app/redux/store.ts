import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "./slices/userSlice";
import messageInformationReducer from "./slices/messageInformation";

//Création du store
export const store = configureStore({
  reducer: {
    user: userReducer,
    messageInformation: messageInformationReducer,
  },
});

//Définition  ds types pour typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//Hooks personnalisés
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;