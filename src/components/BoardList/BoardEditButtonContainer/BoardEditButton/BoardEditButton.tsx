import React from "react";


type BoardEditButtonProps = {
    icon: string;
    name: string;
    onClick: () => void;
};

const BoardEditButton : React.FC<BoardEditButtonProps> = ({icon, name, onClick}) => {
    return (
        <button 
            className="bg-[#81689d] text-[#FFD0EC] p-3 flex gap-2 items-center w-full" 
            style={{borderRadius: '0px'}} 
            onClick={onClick}
        >
            <img src={icon} alt="add" className="w-[16px] h-[16px]" />
            {name}
        </button>
    );
};

export default BoardEditButton;