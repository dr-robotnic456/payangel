import { configureStore } from "@reduxjs/toolkit";
import { api } from "../ApiSlice/baseConfig";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
} from "redux-persist";
import userSlice from "../Slicies/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import thunk from "redux-thunk";
import homeSlice from "../Slicies/homeSlice";
import { useDispatch, useSelector } from "react-redux";
import { combineReducers } from "@reduxjs/toolkit";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistMyReducer = persistReducer(persistConfig, userSlice);
export const store = configureStore({
  reducer: {
    //put slicies here,
    home: homeSlice,
    user: persistMyReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE],
      },
    }).concat(thunk, api.middleware),
});

setupListeners(store.dispatch);
export const persistor = persistStore(store);

//for test writing
// Create the root reducer independently to obtain the RootState type
const rootReducer = combineReducers({
  home: homeSlice,
  user: persistMyReducer,
  [api.reducerPath]: api.reducer,
});
export function setupStore(preloadedState) {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE],
        },
      }).concat(thunk, api.middleware),
  });
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
