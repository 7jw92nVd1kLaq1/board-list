import React from "react";
import clsx from "clsx";

import { 
    closeModal, 
    setTitle, 
    setDescription, 
    reset
} from "../../../stores/slices/addTaskModalSlice";
import { addTask } from "../../../stores/slices/boardsSlice";
import { 
    useTypedDispatch, 
    useTypedSelector 
} from "../../../hooks/redux";
import { addLog } from "../../../stores/slices/loggerSlice";


const AddTaskModal : React.FC = () => {
    const dispatch = useTypedDispatch();

    const boardId = useTypedSelector(state => state.boards.currentBoardId);
    const boardTitle = useTypedSelector(
        state => state.boards.boards.find(board => board.id === boardId)?.title
    );
    const listId = useTypedSelector(state => state.addTaskModal.listId);
    const listTitle = useTypedSelector(
        state => state.boards.boards
            .find(board => board.id === boardId)
            ?.lists.find(list => list.id === listId)?.title
    );
    const addTaskModalStatus = useTypedSelector(state => state.addTaskModal.isOpen);
    const title = useTypedSelector(state => state.addTaskModal.title);
    const description = useTypedSelector(state => state.addTaskModal.description);

    const parentStyle = clsx(
        'fixed', 'bg-black/50', 'w-screen', 'h-screen', 'items-center', 
        'justify-center', 'flex-col', 'z-30',
        addTaskModalStatus ? 'flex': 'hidden'
    );

    const handleSubmit = () => {
        dispatch(addTask({
            boardId: boardId,
            listId: listId,
            title: title,
            description: description,
        }));
        dispatch(addLog({message: `Task '${title}' added to List '${listTitle}' of Board '${boardTitle}'`}));
        dispatch(reset());
        dispatch(closeModal());
    };

    return (
        <div className={parentStyle}>
            <div className="p-5 rounded-lg bg-[#FFD0EC] text-[#1F2544] w-[90%] md:w-[500px]">
                <h1 className="text-2xl">Add Task</h1>
                <input 
                    type="text" 
                    placeholder="Type in the title of the task" 
                    className="border border-gray-300 p-4 rounded-lg w-full mt-10 block text-white bg-[#1F2544]"
                    onChange={(e) => dispatch(setTitle(e.target.value))}
                    value={title}
                />
                <textarea 
                    placeholder="Type in the description of the task" 
                    className="mb-10 border border-gray-300 p-4 rounded-lg w-full mt-4 block text-white bg-[#1F2544] resize-none h-[100px]"
                    onChange={(e) => dispatch(setDescription(e.target.value))}
                    value={description}
                />
                <button onClick={handleSubmit} className="text-white mx-2">
                    Submit
                </button>
                <button 
                    onClick={() => {dispatch(closeModal())}}
                    className="text-white mx-2"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default AddTaskModal;