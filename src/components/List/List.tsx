import React from "react";
import clsx from "clsx";
import { TList } from "../../types";
import Task from "../Task/Task";

import addOutline from "../../assets/add-outline.svg"
import expand from "../../assets/expand.svg"
import settings from "../../assets/settings.svg"
import shrink from "../../assets/shrink.svg"
import { useTypedDispatch } from "../../hooks/redux";
import { openModal, setListId } from "../../stores/slices/addTaskModalSlice";
import { removeList } from "../../stores/slices/boardsSlice";


type ListProps = {
    list: TList;
    id: string;
};

const List : React.FC<ListProps> = ({ list, id }) => {
    const [isOpen, setIsOpen] = React.useState<boolean>(false);
    const [isSettingsOpen, setIsSettingsOpen] = React.useState<boolean>(false);
    const [isDeleteModeOn, setIsDeleteModeOn] = React.useState<boolean>(false);

    const dispatch = useTypedDispatch();
    const listId = id;

    const listStyle = clsx(
        "p-5", "bg-[#1F2544]", "w-full", "md:w-[300px]", "items-start", "rounded-lg", 
        "shadow-md", "text-white",
        isDeleteModeOn ? "border-2 border-red-500" : "" 
    );
    const tasksContainerStyle = isOpen ? "flex flex-col gap-4 mt-8" : "hidden";
    const settingsContainerStyle = isSettingsOpen ? "absolute bg-[#FFD0EC] right-0 top-[35px] rounded-md w-[255px]" : "hidden";

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={listStyle}>
            <div className="flex justify-between items-start">
                <h1 className="text-2xl">{list.title}</h1>
                <div className="flex gap-2">
                    <button className="p-0 m-0 bg-transparent" onClick={handleClick}>
                        { !isOpen ? (
                        <img src={expand} alt="expand" className="w-[30px] h-[30px]" />
                        ) : (
                        <img src={shrink} alt="shrink" className="w-[30px] h-[30px]" />
                        )}
                    </button>
                    <button 
                        className="p-0 m-0 bg-transparent relative" 
                        onClick={() => {
                            setIsSettingsOpen(!isSettingsOpen)
                        }}
                    >
                        <img src={settings} alt="settings" className="w-[30px] h-[30px]" />
                        <div className={settingsContainerStyle}>
                            <button 
                                className="p-3 w-full text-left text-[#1F2544] bg-transparent"
                            >
                                Edit
                            </button>
                            <button 
                                className="p-3 w-full text-left text-[#1F2544] bg-transparent"
                                onClick={() => setIsDeleteModeOn(!isDeleteModeOn)}
                            >
                                Delete Tasks
                            </button>
                            <button
                                className="p-3 w-full text-left text-[#1F2544] bg-transparent"
                                onClick={() => {
                                    dispatch(removeList({listId: listId}))
                                }} 
                            >
                                Delete List
                            </button>
                        </div>
                    </button>
                </div>
            </div>
            <div className={tasksContainerStyle}>
                {list.tasks.length ? list.tasks.map(task => (
                    <Task 
                        key={task.id} 
                        id={task.id} 
                        listId={listId}
                        title={task.title} 
                        description={task.description} 
                        deleteMode={isDeleteModeOn}
                    />
                )) : (
                    <div className="text-center text-xl font-medium my-8">
                        No Tasks :(
                    </div>
                )}
                <button 
                    className="pl-1 bg-[#1F2544] text-[#FFD0EC] w-full text-left flex items-center gap-4"
                    onClick={() => {
                        dispatch(setListId(listId));
                        dispatch(openModal())
                    }}
                >
                    <img src={addOutline} alt="add-task" className="w-[30px] h-[30px]" />
                    Add Task
                </button>
            </div>
        </div>
    );
};

export default List;