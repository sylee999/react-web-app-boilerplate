export const MESSAGE = 'boilerplate/Indicator/MESSAGE';

export const ACTION_KEY = 'boilerplate/indicator/ACTION_KEY';
export const ACTION_MESSAGE = 'boilerplate/indicator/ACTION_MESSAGE';

export const TASK_START = 'boilerplate/indicator/TASK_START';
export const TASK_SUCCESS = 'boilerplate/indicator/TASK_SUCCESS';
export const TASK_ERROR = 'boilerplate/indicator/TASK_ERROR';
export const TASK_CLEAR = 'boilerplate/indicator/TASK_CLEAR';

export const notifyMessage = message => ({type: MESSAGE, meta: {[ACTION_MESSAGE]: message} });
