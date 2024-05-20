import React from "react";
import clsx from "clsx";
import { setCurrentBoard } from "../../../stores/slices/boardsSlice";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux";


type BoardButtonProps = {
    title: string;
    id: string;
};

const BoardButton : React.FC<BoardButtonProps> = ({title, id}) => {
    const currentBoardId = useTypedSelector(state => state.boards.currentBoardId);
    const dispatch = useTypedDispatch();
    const handleClick = () => {
        dispatch(setCurrentBoard({id}));
    };

    const style = clsx(
        'p-2', 'shadow-md', 'rounded-md', 'text-white', 'm-2',
        currentBoardId === id ? 'bg-[#1F2544]' : 'bg-[#474F7A]',
        currentBoardId === id ? 'border border-white': ''
    );

    return (
        <button className={style} onClick={handleClick}>
            {title}
        </button>
    );
};

export default BoardButton;