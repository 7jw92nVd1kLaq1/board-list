import React from "react";
import {clsx} from "clsx";

import BoardButton from "./BoardButton/BoardButton";
import BoardEditButtonContainer from "./BoardEditButtonContainer/BoardEditButtonContainer";
import { useTypedSelector } from "../../hooks/redux";


type BoardListProps = {
    visible: boolean;
    fixed: boolean;
};

const BoardList : React.FC<BoardListProps> = ({visible, fixed}) => {
    const boardsState = useTypedSelector(state => state.boards);

    let style : string = clsx(
        'flex', 'items-center', 'bg-[#1F2544]', 'gap-2', 'text-white'
    );
    if (fixed) {
        style = clsx(style, 'w-screen', 'fixed');
    }
    if (!visible) {
        style = clsx(style, 'invisible')
    }

    return (
        <div className={style}>
            <h1 className="text-2xl font-semibold p-5 px-10">BoardList</h1>
            <div className="grow text-left"> 
                {
                    boardsState.boards.map(board => (
                        <BoardButton 
                            key={board.id} 
                            title={board.title} 
                            id={board.id} 
                        />
                    ))
                }
            </div>
            <BoardEditButtonContainer>
            </BoardEditButtonContainer>
        </div>
    );
};

export default BoardList;