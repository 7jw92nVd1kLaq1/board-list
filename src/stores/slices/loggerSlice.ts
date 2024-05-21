import { createSlice } from "@reduxjs/toolkit";
import { TLoggerState } from "../../types";

import { v4 } from "uuid";


const initialState : TLoggerState = {
  isOpen: false, 
  logs: []
};

const loggerSlice = createSlice({
  name: "logger",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
    addLog: (state, action) => {
      const { message } = action.payload;
      const id : string = v4();
      const timestamp : string = String(Date.now());

      if (!message) {
        throw new Error("Board ID and message are required to add a log");
      }

      state.logs.push({
        id,
        message,
        timestamp
      });
    },
    removeLog: (state, action) => {
      state.logs = state.logs.filter(log => log.id !== action.payload);
    },
    clearLogs: (state) => {
      state.logs = [];
    }
  },
});

export const { openModal, closeModal, addLog, removeLog, clearLogs } = loggerSlice.actions;
export const loggerReducer = loggerSlice.reducer;