import { createSlice } from "@reduxjs/toolkit";

import { TLoggerState } from "../../types";


const initialState : TLoggerState = {
  logs: []
};

const loggerSlice = createSlice({
  name: "logger",
  initialState,
  reducers: {
    addLog: (state, action) => {
      state.logs.push(action.payload);
    },
    removeLog: (state, action) => {
      state.logs = state.logs.filter(log => log.id !== action.payload);
    },
  },
});

export const loggerReducer = loggerSlice.reducer;