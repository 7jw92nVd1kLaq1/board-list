import { createSlice } from "@reduxjs/toolkit";

import { TAddBoardsModalState } from "../../types";

const initialState : TAddBoardsModalState = {
    isOpen: false,
    title: "",
}

const addBoardsModalSlice = createSlice({
    name: "addBoardsModal",
    initialState,
    reducers: {
        openModal: (state) => {
            console.log("Invoked openModal");
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

export const addBoardsModalReducer = addBoardsModalSlice.reducer;
export const { openModal, closeModal, setTitle, reset } = addBoardsModalSlice.actions;