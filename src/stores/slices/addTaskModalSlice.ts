import { createSlice } from "@reduxjs/toolkit";


type TAddTaskModalState = {
    isOpen: boolean;
    listId: string;
    title: string;
    description: string;
};

const initialState : TAddTaskModalState = {
    isOpen: false,
    listId: "",
    title: "",
    description: "",
}

const addTaskModalSlice = createSlice({
    name: "addTaskModal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
        setListId: (state, action) => {
            if (typeof action.payload !== "string") {
                throw new Error("List ID must be a string");
            }
            state.listId = action.payload;
        },
        setTitle: (state, action) => {
            if (typeof action.payload !== "string") {
                throw new Error("Title must be a string");
            }
            state.title = action.payload;
        },
        setDescription: (state, action) => {
            if (typeof action.payload !== "string") {
                throw new Error("Description must be a string");
            }
            state.description = action.payload;
        },
        reset: (state) => {
            state.isOpen = false;
            state.listId = "";
            state.title = "";
            state.description = "";
        },
    },
});

export const { 
    openModal, 
    closeModal, 
    setListId,
    setTitle, 
    setDescription, 
    reset 
} = addTaskModalSlice.actions;
export const addTaskModalReducer =  addTaskModalSlice.reducer;