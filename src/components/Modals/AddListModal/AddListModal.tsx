import React from "react";
import clsx from "clsx";

import { closeModal, setTitle, reset } from "../../../stores/slices/addListModalSlice";
import { addList } from "../../../stores/slices/boardsSlice";

import { 
    useTypedDispatch, 
    useTypedSelector 
} from "../../../hooks/redux";


const AddListModal : React.FC = () => {
    const dispatch = useTypedDispatch();

    const currentBoardId = useTypedSelector(state => state.boards.currentBoardId);
    const addListModalStatus = useTypedSelector(state => state.addListModal.isOpen);
    const title = useTypedSelector(state => state.addListModal.title);

    const parentStyle = clsx(
        'fixed', 'bg-black/50', 'w-screen', 'h-screen', 'items-center', 
        'justify-center', 'flex-col', 
        addListModalStatus ? 'flex': 'hidden'
    );

    return (
        <div className={parentStyle}>
            <div className="p-5 rounded-lg bg-[#FFD0EC] text-[#1F2544] w-[90%] md:w-[500px]">
                <h1 className="text-2xl">Add List</h1>
                <input 
                    type="text" 
                    placeholder="Type in the title of the list" 
                    className="border border-gray-300 p-4 rounded-lg w-full my-10 block text-white bg-[#1F2544]"
                    value={title}
                    onChange={(e) => dispatch(setTitle(e.target.value))}
                />
                <button 
                    onClick={() => {
                        dispatch(addList({title: title, boardId: currentBoardId}));
                        dispatch(reset());
                    }} 
                    className="text-white mx-2"
                >
                    Add List
                </button>
                <button 
                    onClick={() => {
                        dispatch(closeModal());
                        dispatch(reset());
                    }} 
                    className="text-white mx-2"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AddListModal;