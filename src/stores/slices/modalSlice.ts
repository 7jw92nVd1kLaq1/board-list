import { createSlice } from "@reduxjs/toolkit";

import { TModalState } from "../../types";


const initialState : TModalState = {
  isOpen: false,
  boardId: "",
  listId: "",
  taskId: ""
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.boardId = action.payload.boardId;
      state.listId = action.payload.listId;
      state.taskId = action.payload.taskId;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const modalReducer = modalSlice.reducer;