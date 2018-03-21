/*
- indicator
  - pendingTask
  - notification
    - status
    - message
    - createdAt
 */

import {ACTION_KEY, ACTION_MESSAGE, MESSAGE, TASK_CLEAR, TASK_ERROR, TASK_START, TASK_SUCCESS} from "./actions";

const configurableIndicatorReducer = ({ actionKeyPath = [] } = {}) => {
    return (state = {pendingTask:0}, action) => {
        // Reduce the action to find the configured path
        const obj = actionKeyPath.reduce((acc, path) => acc[path], action);

        if (!obj) {
            // Configured path is not included in this action. Nothing to do.
            return state;
        }

        switch (obj[ACTION_KEY]) {
            case TASK_START:
                return {
                    ...state,
                    pendingTask: state.pendingTask + 1,
                };
            case TASK_SUCCESS:
                if (state.pendingTask - 1 < 0) {
                    throw new RangeError(`Number of pending tasks decreased below zero..`);
                }
                return {
                    ...state,
                    pendingTask: state.pendingTask - 1,
                    notification: {
                        status: obj[ACTION_KEY],
                        message: obj[ACTION_MESSAGE] || "Done."
                    }
                };
            case TASK_ERROR:
            case TASK_CLEAR:
                return {
                    ...state,
                    pendingTask: 0,
                    notification: {
                        status: obj[ACTION_KEY],
                        message: obj[ACTION_MESSAGE] || "Error"
                    }
                };
            default:
                return state;
        }
    };
};

const indicatorReducer = configurableIndicatorReducer();

export { ACTION_KEY, TASK_START, TASK_SUCCESS, TASK_ERROR, TASK_CLEAR, indicatorReducer, configurableIndicatorReducer };

