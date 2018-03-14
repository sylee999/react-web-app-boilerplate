import { fromJS } from 'immutable';

import {
    MESSAGE
} from "./constants";

const initialState = fromJS({
    status: "DONE",
    message: ""
});

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case MESSAGE:
            return state
                .set('message', action.message);
        default:
            return state;
    }
};
export default reducer;

