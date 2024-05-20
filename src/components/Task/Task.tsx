import React from "react";

import trash from "../../assets/trash.svg";

import { removeTask } from "../../stores/slices/boardsSlice";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";


type TaskProps = {
    id: string;
    listId: string;
    title: string;
    description: string;
    deleteMode: boolean;
};

const Task : React.FC<TaskProps> = ({id, listId, title, description, deleteMode}) => {
    const dispatch = useTypedDispatch();
    const currentBoardId = useTypedSelector(state => state.boards.currentBoardId);

    const handleClick = () => {
        dispatch(removeTask({
            taskId: id,
            listId,
            boardId: currentBoardId
        }));
    };

    return (
        <div className="border border-[#474F7A] rounded-md p-5 bg-[#474F7A] flex gap-4 items-center">
            {deleteMode && (
                <button className="p-0 bg-transparent" onClick={handleClick}>
                    <img src={trash} alt="delete-task" className="w-[30px] h-[30px]" />
                </button>
            )}
            <div>
                <h3 className="text-lg font-medium">{title}</h3>
                <p className="text-sm mt-1 line-clamp-1">{description}</p>
            </div>
        </div>
    );
};

export default Task;