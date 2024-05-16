import { loggerReducer } from "../slices/loggerSlice"
import { modalReducer } from "../slices/modalSlice"
import { boardsReducer } from "../slices/boardsSlice"


const reducer = {
    logger: loggerReducer,
    modal: modalReducer,
    boards: boardsReducer,
};

export default reducer;