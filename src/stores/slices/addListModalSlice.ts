import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    isOpen: false,
    title: "",
};

const addListModalSlice = createSlice({
    name: "addListModal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
        setTitle: (state, action) => {
            if (typeof action.payload !== "string") {
                throw new Error("Title must be a string");
            }
            state.title = action.payload;
        },
        reset: (state) => {
            state.isOpen = false;
            state.title = "";
        },
    },
});

export const { openModal, closeModal, setTitle, reset } = addListModalSlice.actions;
export const addListModalReducer = addListModalSlice.reducer;