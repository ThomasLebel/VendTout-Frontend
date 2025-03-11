import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "./slices/userSlice";
import messageInformationReducer from "./slices/messageInformation";
import {
  persistStore,
  persistReducer,
  PERSIST,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// Configuration de redux-persist
const persistConfig = {
  key: "root",
  storage,
  blacklist: ["nonSerializableReducer"],
};

const rootReducer = combineReducers({
  user: userReducer,
  messageInformation: messageInformationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

//Création du store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Persistance du store
export const persistor = persistStore(store);

//Définition  ds types pour typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//Hooks personnalisés
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
