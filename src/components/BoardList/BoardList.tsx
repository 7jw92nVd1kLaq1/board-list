import React, { useEffect } from "react";
import {clsx} from "clsx";

import BoardButton from "./BoardButton/BoardButton";
import BoardEditButtonContainer from "./BoardEditButtonContainer/BoardEditButtonContainer";
import { useTypedSelector } from "../../hooks/redux";


type BoardListProps = {
    visible: boolean;
    fixed: boolean;
};

const BoardList : React.FC<BoardListProps> = ({visible, fixed}) => {
    const [onDeleteMode, setOnDeleteMode] = React.useState<boolean>(false);
    const boardsState = useTypedSelector(state => state.boards);

    const toggleDeleteMode = () => {
        if (boardsState.boards.length === 0) {
            return;
        }
        setOnDeleteMode(!onDeleteMode);
    };

    let style : string = clsx(
        'flex', 'items-center', 'bg-[#1F2544]', 'gap-2', 'text-white', 'z-20'
    );
    if (fixed) {
        style = clsx(style, 'w-screen', 'fixed');
    }
    if (!visible) {
        style = clsx(style, 'invisible')
    }

    const deleteButtonStyle : string = clsx(
        'p-2', 'shadow-md', 'rounded-md', 'text-white', 'm-2', 'flex', 'gap-2', 'items-center',
        'bg-red-500'
    );

    // If there is no board, turn off the delete mode
    useEffect(() => {
        if (boardsState.boards.length === 0) {
            setOnDeleteMode(false);
        }
    }, [boardsState.boards.length]);

    return (
        <div className={style}>
            <h1 className="text-2xl font-semibold p-5 px-10">BoardList</h1>
            <div className="grow text-left flex"> 
                {
                    boardsState.boards.map(board => (
                        <BoardButton 
                            key={board.id} 
                            deleteMode={onDeleteMode}
                            title={board.title} 
                            id={board.id} 
                        />
                    ))
                }
                {
                    onDeleteMode && (
                    <button className={deleteButtonStyle} onClick={toggleDeleteMode}>
                        Done
                    </button>
                    )
                }
            </div>
            <BoardEditButtonContainer toggleDeleteModeCallback={toggleDeleteMode} />
        </div>
    );
};

export default BoardList;