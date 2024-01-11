import { configureStore } from "@reduxjs/toolkit";
import { FetchApi } from "./FetchApi";

export const store = configureStore({
	reducer: {
		[FetchApi.reducerPath]: FetchApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			FetchApi.middleware
		),
});
