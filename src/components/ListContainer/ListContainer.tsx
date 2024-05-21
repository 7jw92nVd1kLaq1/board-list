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
            <div className="grow w-full text-left px-10 flex flex-col justify-center items-center text-white text-xl gap-5">
                <h1>Select a board :(</h1>
                <h1>Or create one!</h1>
            </div>
        );
    }

    return (
        <div className="grow w-full text-left p-10 flex-col md:flex-row flex flex-wrap items-start gap-5 content-start">
            {currentBoard.lists.map(list => (
                <List 
                    key={list.id} 
                    list={list} 
                    id={list.id} 
                />
            ))}
            <button 
                className="w-full md:w-[300px] p-5 bg-[#81689D] text-white text-lg hover:bg-[#FFD0EC] hover:text-[#1F2544] rounded-md"
                onClick={() => dispatch(openModal())}
            >
                Add List
            </button>
        </div>
    );
};

export default ListContainer;