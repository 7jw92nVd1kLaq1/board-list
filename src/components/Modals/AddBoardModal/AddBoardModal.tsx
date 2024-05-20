import React from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

import { closeModal, setTitle, reset } from "../../../stores/slices/addBoardsModalSlice";
import { addBoard } from "../../../stores/slices/boardsSlice";
import { RootState, AppDispatch } from "../../../stores";


const AddBoardModal : React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const addBoardModalStatus = useSelector((state: RootState) => state.addBoardsModal.isOpen);
    const title = useSelector((state: RootState) => state.addBoardsModal.title);

    const parentStyle = clsx(
        'fixed', 'bg-black/50', 'w-screen', 'h-screen', 'items-center', 
        'justify-center', 'flex-col', 
        addBoardModalStatus ? 'flex': 'hidden'
    );

    const handleCloseModalClick = () => {
        dispatch(closeModal());
        dispatch(reset());
    };

    const handleSubmit = () => {
        dispatch(addBoard({title: title}));
        dispatch(reset());
        dispatch(closeModal());
    };

    return (
        <div className={parentStyle}>
            <div className="p-5 rounded-lg bg-white w-[500px]">
                <h1 className="text-2xl">Add Board</h1>
                <input 
                    type="text" 
                    placeholder="Type in the title of the board" 
                    className="my-10 border border-gray-300 p-2 rounded-lg w-full mt-3 block text-white"
                    onChange={(e) => dispatch(setTitle(e.target.value))}
                    value={title}
                />
                <button className="text-white" onClick={handleSubmit}>Submit</button>
                <button onClick={handleCloseModalClick}>Close</button>
            </div>
        </div>
    );
};

export default AddBoardModal;