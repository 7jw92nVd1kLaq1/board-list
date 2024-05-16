import { createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";

import { TBoardsState } from "../../types";


const firstBoardId = v4();

const initialState : TBoardsState = {
  boards: [
    {
        id: firstBoardId,
        title: "Board 1",
        lists: [
            {
                id: v4(),
                title: "List 1",
                tasks: [
                    {
                        id: v4(),
                        title: "Task 1",
                        description: "Description 1"
                    }
                ]
            },
            {
                id: v4(),
                title: "List 2",
                tasks: [
                    {
                        id: v4(),
                        title: "Task 2",
                        description: "Description 2"
                    }
                ]
            }
        ]
    },
    {
        id: v4(),
        title: "Board 2",
        lists: [
            {
                id: v4(),
                title: "List 1",
                tasks: [
                    {
                        id: v4(),
                        title: "Task 1",
                        description: "Description 1"
                    }
                ]
            },
            {
                id: v4(),
                title: "List 2",
                tasks: [
                    {
                        id: v4(),
                        title: "Task 2",
                        description: "Description 2"
                    }
                ]
            }
        ]
    }
  ],
  currentBoardId: firstBoardId
};

const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state, action) => {
        const { title } = action.payload;
        const id : string = v4();

        state.boards.push({
            id,
            title,
            lists: []
        });
    },
    removeBoard: (state, action) => {
        const { id } = action.payload;
        state.boards = state.boards.filter(board => board.id !== id);
    },
    setCurrentBoard: (state, action) => {
        const { id } = action.payload;
        for (const board of state.boards) {
            if (board.id === id) {
                state.currentBoardId = id;
                return;
            }
        }
    },
  },
});

export const boardsReducer = boardsSlice.reducer;