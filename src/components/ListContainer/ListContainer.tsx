import React from "react";
import { useTypedSelector, useTypedDispatch } from "../../hooks/redux";
import { openModal } from "../../stores/slices/addListModalSlice";
import List from "../List/List";


const ListContainer : React.FC = () => {
    const dispatch = useTypedDispatch();

    const boardsState = useTypedSelector(state => state.boards);
    const currentBoard = boardsState.boards.find(board => board.id === boardsState.currentBoardId);

    if (!currentBoard) {
        return (
            <div className="grow w-full text-left px-10">
                Select a board
            </div>
        );
    }

    return (
        <div className="grow w-full text-left p-10 flex-col md:flex-row flex flex-wrap items-start gap-5">
            {currentBoard.lists.map(list => (
                <List 
                    key={list.id} 
                    list={list} 
                    id={list.id} 
                />
            ))}
            <button 
                className="w-[300px] p-5 bg-blue-600 text-white"
                onClick={() => dispatch(openModal())}
            >
                Add List
            </button>
        </div>
    );
};

export default ListContainer;