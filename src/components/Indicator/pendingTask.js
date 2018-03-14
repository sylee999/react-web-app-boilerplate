const actionKey = 'boilerplate/app/PENDING_TASK_ACTION_KEY';
const begin = 'boilerplate/app/PENDING_TASK_BEGIN';
const end = 'boilerplate/app/PENDING_TASK_END';
const endAll = 'boilerplate/app/PENDING_TASK_END_ALL';

const configurablePendingTasksReducer = ({ actionKeyPath = [] } = {}) => {
    return (state = 0, action) => {
        // Reduce the action to find the configured path
        const obj = actionKeyPath.reduce((acc, path) => acc[path], action);

        if (!obj) {
            // Configured path is not included in this action. Nothing to do.
            return state;
        }

        if (obj[actionKey] === begin) {
            return state + 1;
        }
        if (obj[actionKey] === end) {
            if (state - 1 < 0) {
                throw new RangeError(`Number of pending tasks decreased below zero. This indicates you have an error in your code. 'end' is called more often than 'begin'.`);
            }
            return state - 1;
        }
        if (obj[actionKey] === endAll) {
            return 0;
        }

        return state;
    };
};

const pendingTasksReducer = configurablePendingTasksReducer();

export { actionKey as pendingTask, begin, end, endAll, pendingTasksReducer, configurablePendingTasksReducer };