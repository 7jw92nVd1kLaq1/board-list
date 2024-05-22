import { createSlice } from "@reduxjs/toolkit";


type TUser = {
    email: string;
    id: string;
    accessToken?: string;
};

const initialState : TUser = {
    email: "",
    id: "",
    accessToken: ""
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.accessToken = action.payload.accessToken;
        },
    },
});

export const { setUser } = userSlice.actions;
export const userReducer =  userSlice.reducer;