import React, { useEffect, useRef } from "react";

import add from "../../../assets/add.svg"
import remove from "../../../assets/remove.svg"
import { openModal } from "../../../stores/slices/addBoardsModalSlice";

import BoardEditButton from "./BoardEditButton/BoardEditButton";
import clsx from "clsx";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../stores";


const BoardEditButtonContainer : React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [visible, setVisible] = React.useState<boolean>(false);
    const MenuRef = useRef<HTMLInputElement>(null);
    const MenuButtonRef = useRef<HTMLButtonElement>(null);

    const className = clsx(
        visible ? 'visible' : 'invisible',
        'absolute', 'right-2', 'w-max'
    );

    const addBoard = () => {
        dispatch(openModal());
    }

    const deleteBoard = () => {
        console.log("Delete Board");
    }

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            // Close the menu if the user clicks outside of it
            if (
                MenuRef.current && 
                !MenuRef.current.contains(event.target as Node)
            ) {
                if (MenuButtonRef.current && MenuButtonRef.current.contains(event.target as Node)) {
                    setVisible(!visible);
                } else {
                    setVisible(false);
                }
            } else {
                setVisible(true);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        }
    });

    return (
        <div className="mr-10 relative">
            <button ref={MenuButtonRef} className="p-2 m-2 rounded-md shadow-md bg-[#FFD0EC] text-[#1F2544]">
                Menu
            </button>
            <div className={className} ref={MenuRef}>
                <div className="flex flex-col overflow-hidden text-[#1F2544] items-stretch w-full rounded-lg">
                    <BoardEditButton icon={add} name="Add Board" onClick={addBoard} />
                    <BoardEditButton icon={remove} name="Delete Board" onClick={deleteBoard} />
                </div>
            </div>
        </div>
    );
};

export default BoardEditButtonContainer;