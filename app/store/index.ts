import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./data";

export const store = configureStore({
    reducer: {
        data : dataReducer
    }
});