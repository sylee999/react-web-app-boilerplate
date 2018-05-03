import {ACCOUNT_UPDATE, DARK_MODE_UPDATE, TOKEN_UPDATE} from "./actions";

const reducer = (state = {account:{}, darkMode:false}, action) => {
    switch (action.type) {
        case TOKEN_UPDATE:
            return {
                ...state,
                token: action.token
            };
        case ACCOUNT_UPDATE:
            return {
                ...state,
                account: action.account
            };
        case DARK_MODE_UPDATE:
            return {
                ...state,
                darkMode: action.darkMode
            };
        default:
            return state;
    }
};
export default reducer;
