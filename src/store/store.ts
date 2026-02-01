import { configureStore } from "@reduxjs/toolkit";
import boardreducer from "./Boards"

export const store = configureStore({
    reducer: {
        board: boardreducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch