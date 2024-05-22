import { loggerReducer } from "../slices/loggerSlice"
import { modalReducer } from "../slices/modalSlice"
import { boardsReducer } from "../slices/boardsSlice"
import { addBoardsModalReducer } from "../slices/addBoardsModalSlice";
import { addListModalReducer } from "../slices/addListModalSlice";
import { addTaskModalReducer } from "../slices/addTaskModalSlice";
import { userReducer } from "../slices/userSlice";


const reducer = {
    user: userReducer,
    logger: loggerReducer,
    modal: modalReducer,
    boards: boardsReducer,
    addBoardsModal: addBoardsModalReducer,
    addListModal: addListModalReducer,
    addTaskModal: addTaskModalReducer,
};

export default reducer;