import {GUEST_USER, USER_FAILURE, USER_RECEIVE, USER_REQUEST} from "./actions";

const reducer = (state = {user: GUEST_USER, isFail: false, isFetching: false}, action) => {
    switch (action.type) {
        case USER_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFail: false,
            };
        case USER_RECEIVE:
            return {
                ...state,
                user: action.payload,
                lastUpdated: action.meta.receivedAt,
                isFetching: false,
                isFail: false,
            };
        case USER_FAILURE:
            return {
                ...state,
                isFetching: false,
                isFail: true,
            };
        default:
            return state;
    }
};
export default reducer;
