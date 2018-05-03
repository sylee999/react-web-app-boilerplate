import {STATUS_CLEAR, NOTIFICATION} from "./actions";

const configurableNotificationReducer = ({ actionKeyPath = [] } = {}) => {
    return (state = { status: STATUS_CLEAR, message: "" }, action) => {
        const obj = actionKeyPath.reduce((acc, path) => acc[path], action);

        if (!obj) {
            return state;
        }

        const notification = obj[NOTIFICATION];
        if (!!notification) {
            return {
                ...state,
                status: notification.status,
                message: notification.message,
            }
        }

        return state;
    };
};

const notificationReducer = configurableNotificationReducer();

export { notificationReducer, configurableNotificationReducer };