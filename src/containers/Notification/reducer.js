import {MESSAGE, STATUS_CLEAR} from "./actions";

const reducer = (state = { status: STATUS_CLEAR, message: "" }, action) => {
    switch (action.type) {
        case MESSAGE:
            return {
                ...state,
                status: action.status,
                message: action.message,
            };
        default:
            return state;
    }
};
export default reducer;

