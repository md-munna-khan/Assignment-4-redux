import { configureStore } from "@reduxjs/toolkit";
import { bookApi } from "./baseApi";
// import { borrowApi } from "./BorrowApi.";

export const store = configureStore({
    reducer:{
        [bookApi.reducerPath]:bookApi.reducer,
        //  [borrowApi.reducerPath]:borrowApi.reducer
    },
   
     middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(bookApi.middleware)
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch