import React from "react";
import clsx from "clsx";
import { removeBoard, setCurrentBoard } from "../../../stores/slices/boardsSlice";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux";

import trash from "../../../assets/trash-red.svg";
import { addLog } from "../../../stores/slices/loggerSlice";


type BoardButtonProps = {
    title: string;
    id: string;
    deleteMode: boolean;
};

const BoardButton : React.FC<BoardButtonProps> = ({title, id, deleteMode}) => {
    const currentBoardId = useTypedSelector(state => state.boards.currentBoardId);
    const dispatch = useTypedDispatch();

    const handleSelectClick = () => {
        dispatch(setCurrentBoard({id}));
    };

    const handleDeleteClick = () => {
        dispatch(addLog({message: `Board '${title}' deleted`}));
        dispatch(removeBoard({id}));
    };

    const style = clsx(
        'p-2', 'shadow-md', 'rounded-md', 'text-white', 'm-2', 'flex', 'gap-2', 'items-center',
        currentBoardId === id ? 'bg-[#1F2544]' : 'bg-[#474F7A]', 'hover:bg-[#81689D]',
        !deleteMode && currentBoardId === id ? 'border border-white': '',
        deleteMode ? 'border-2 border-red-500' : ''
    );

    return (
        <button className={style} onClick={deleteMode ? handleDeleteClick : handleSelectClick}>
            {deleteMode && <img src={trash} alt="trash" className="w-7 h-7" />}
            {title}
        </button>
    );
};

export default BoardButton;