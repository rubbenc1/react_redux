import { configureStore } from "@reduxjs/toolkit";
import { picturesApi } from "./services/picturesApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import likedPicturesReducer from './likedPicturesSlice';

export const store = configureStore({
    reducer: {
        [picturesApi.reducerPath]: picturesApi.reducer,
        likedPictures: likedPicturesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(picturesApi.middleware),
})

setupListeners(store.dispatch);