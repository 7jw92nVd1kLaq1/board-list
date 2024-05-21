import React from "react";


type LogItemProps = {
    message: string;
    timestamp: string;
};

const LogItem : React.FC<LogItemProps> = ({message, timestamp}) => {
    const timestampDateStr = new Date(parseInt(timestamp)).toLocaleString();

    return (
        <div className="border border-[#474F7A] rounded-md p-5 text-[#FFD0EC] flex flex-col gap-3 items-start bg-[#1F2544]">
            <p className="text-sm font-semibold">{timestampDateStr}</p>
            <p className="line-clamp-1">{message}</p>
        </div>
    );
};

export default LogItem;