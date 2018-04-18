export const NOTIFICATION = 'boilerplate/notification/NOTIFICATION';

export const STATUS_SUCCESS = 'boilerplate/notification/STATUS_SUCCESS';
export const STATUS_ERROR = 'boilerplate/notification/STATUS_ERROR';
export const STATUS_CLEAR = 'boilerplate/notification/STATUS_CLEAR';

export const notifyMessage = notification => {
    return {type: NOTIFICATION, meta: {[NOTIFICATION]: {status: notification.status, message: notification.message}}};
};
