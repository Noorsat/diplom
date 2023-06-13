import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {initialState} from "./state";
import {IUser} from "../../utils/types/user.types";

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<IUser>) {
            state.user = action.payload
        },
    }
})

export const {setUser} = userSlice.actions
