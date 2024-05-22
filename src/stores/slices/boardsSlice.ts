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
                    },
                    {
                        id: v4(),
                        title: "Task 2",
                        description: "Description 2"
                    },
                    {
                        id: v4(),
                        title: "Task 3",
                        description: "Description 3"
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
        state.currentBoardId = state.boards.length ? state.boards[0].id : "";
    },
    addList: (state, action) => {
        const { boardId, title } = action.payload;
        const id : string = v4();

        for (const board of state.boards) {
            if (board.id === boardId) {
                board.lists.push({
                    id,
                    title,
                    tasks: []
                });
                return;
            }
        }
    },
    removeList: (state, action) => {
        const { listId } = action.payload;

        state.boards = state.boards.map(board => {
            board.lists = board.lists.filter(list => list.id !== listId);
            return board;
        });
    },
    setList: (state, action) => {
        const { boardId, listId, tasks } = action.payload;

        state.boards = state.boards.map(board => {
            if (board.id === boardId) {
                board.lists = board.lists.map(list => {
                    if (list.id === listId) {
                        list.tasks = tasks;
                    }
                    return list;
                });
            }
            return board;
        });
    },
    addTask: (state, action) => {
        const { boardId, listId, title, description } = action.payload;
        const id : string = v4();

        state.boards = state.boards.map(board => {
            if (board.id === boardId) {
                board.lists = board.lists.map(list => {
                    if (list.id === listId) {
                        list.tasks.push({
                            id,
                            title,
                            description
                        });
                    }
                    return list;
                });
            }
            return board;
        });
    },
    removeTask: (state, action) => {
        const { boardId, listId, taskId } = action.payload;
        
        state.boards = state.boards.map(board => {
            if (board.id === boardId) {
                board.lists = board.lists.map(list => {
                    if (list.id === listId) {
                        list.tasks = list.tasks.filter(task => task.id !== taskId);
                    }
                    return list;
                });
            }
            return board;
        });
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

export const { 
    addBoard, 
    removeBoard, 
    setCurrentBoard,  
    addList,
    removeList,
    setList,
    addTask,
    removeTask
} = boardsSlice.actions;
export const boardsReducer = boardsSlice.reducer;