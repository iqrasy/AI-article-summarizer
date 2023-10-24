import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./Article";

export const store = configureStore({
	reducer: {
		[articleApi.reducerPath]: articleApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }).concat(
			articleApi.middleware
		),
});
