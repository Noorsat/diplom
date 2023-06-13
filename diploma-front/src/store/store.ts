import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {userSlice} from "./user/slice";

const rootReducer = combineReducers({
    user: userSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
