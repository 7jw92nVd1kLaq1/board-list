import React from "react";
import clsx from "clsx";

import { closeModal, setTitle, reset } from "../../../stores/slices/addBoardsModalSlice";
import { addBoard } from "../../../stores/slices/boardsSlice";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux";
import { addLog } from "../../../stores/slices/loggerSlice";


const AddBoardModal : React.FC = () => {
    const dispatch = useTypedDispatch();
    const addBoardModalStatus = useTypedSelector(state => state.addBoardsModal.isOpen);
    const title = useTypedSelector(state => state.addBoardsModal.title);

    const parentStyle = clsx(
        'fixed', 'bg-black/50', 'w-screen', 'h-screen', 'items-center', 
        'justify-center', 'flex-col', 'z-30',
        addBoardModalStatus ? 'flex': 'hidden'
    );

    const handleCloseModalClick = () => {
        dispatch(closeModal());
        dispatch(reset());
    };

    const handleSubmit = () => {
        const logMessage = `Board '${title}' added`;
        dispatch(addBoard({title: title}));
        dispatch(addLog({message: logMessage}));
        dispatch(reset());
        dispatch(closeModal());
    };

    return (
        <div className={parentStyle}>
            <div className="p-5 rounded-lg bg-[#FFD0EC] w-[90%] md:w-[500px]">
                <h1 className="text-2xl">Add Board</h1>
                <input 
                    type="text" 
                    placeholder="Type in the title of the board" 
                    className="my-10 border border-gray-300 p-4 rounded-lg w-full block text-white"
                    onChange={(e) => dispatch(setTitle(e.target.value))}
                    value={title}
                />
                <div className="flex gap-2 justify-center">
                    <button 
                        className="text-white" 
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    <button 
                        className="text-white" 
                        onClick={handleCloseModalClick}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddBoardModal;