import { configureStore } from "@reduxjs/toolkit";
import contractsReducer from "../features/contracts/contractSlice";

export const store = configureStore ({
    reducer: {
        contracts : contractsReducer
    }
})