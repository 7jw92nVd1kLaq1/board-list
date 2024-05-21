export type TModalState = {
    isOpen: boolean;
    boardId: string;
    listId: string;
    taskId: string;
};

export type TAddBoardsModalState = {
    isOpen: boolean;
    title: string;
};

export type TBoardsState = {
    boards: TBoard[];
    currentBoardId: string;
}

export type TLoggerState = {
    isOpen: boolean;
    logs: TLog[];
};

export type TTask = {
    id: string;
    title: string;
    description: string;
};

export type TList = {
    id: string;
    title: string;
    tasks: TTask[];
};

export type TBoard = {
    id: string;
    title: string;
    lists: TList[];
};

export type TLog = {
    id: string;
    message: string;
    timestamp: string;
};