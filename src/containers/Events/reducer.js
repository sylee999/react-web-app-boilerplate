import {EVENTS_FAILURE, EVENTS_RECEIVE, EVENTS_REQUEST} from "./actions";

const reducer = (state = {items: [], isFetching: false}, action) => {
    switch (action.type) {
        case EVENTS_REQUEST:
            return {
                ...state,
                isFetching: true,
                isFail: false,
            };
        case EVENTS_RECEIVE:
            return {
                ...state,
                items: state.items.concat(action.payload),
                nextPageUrl: action.meta.nextPageUrl,
                isFetching: true,
                isFail: false,
            };
        case EVENTS_FAILURE:
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
