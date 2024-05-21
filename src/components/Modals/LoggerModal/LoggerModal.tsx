import React from "react";
import clsx from "clsx";
import { useTypedDispatch, useTypedSelector } from "../../../hooks/redux";
import { clearLogs, closeModal } from "../../../stores/slices/loggerSlice";
import LogItem from "./LogItem/LogItem";


const LoggerModal : React.FC = () => {
    const dispatch = useTypedDispatch();
    const loggerModalStatus = useTypedSelector(state => state.logger.isOpen);
    const logs = useTypedSelector(state => state.logger.logs);

    const parentStyle = clsx(
        'fixed', 'bg-black/50', 'w-screen', 'h-screen', 'items-center', 
        'justify-center', 'flex-col', 'z-30',
        loggerModalStatus ? 'flex': 'hidden'
    );
    const logContainerStyle = clsx(
        'flex', 'flex-col', 'w-full', 'h-[300px]', 'my-8', 'overflow-y-auto', 'gap-2',
        logs.length === 0 ? 'justify-center items-center': ''
    );
    const buttonStyle = clsx(
        `text-[#FFD0EC]`, 'bg-[#1F2544]', 'p-2', 'rounded-lg'
    );

    const handleClearLogClick = () => {
        dispatch(clearLogs());
    };

    const handleCloseModalClick = () => {
        dispatch(closeModal());
    };

    return (
        <div className={parentStyle}>
            <div className="p-5 rounded-lg bg-[#FFD0EC] text-[#1F2544] w-[90%] md:w-[500px]">
                <h1 className="text-2xl">Logger</h1>
                <div className={logContainerStyle}>
                    {logs.length === 0 ? 
                        (<h1 className="text-4xl">No Log</h1>) :
                        logs.map((log, index) => (
                            <LogItem key={index} message={log.message} timestamp={log.timestamp} />
                        ))
                    }
                </div>
                <div className="flex items-stretch justify-center gap-4">
                    <button className={buttonStyle} onClick={handleClearLogClick}>Clear</button>
                    <button className={buttonStyle} onClick={handleCloseModalClick}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default LoggerModal;