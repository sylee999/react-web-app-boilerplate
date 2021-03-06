import {notifyMessage, STATUS_ERROR} from "../Notification/actions";

export const ACCOUNT_UPDATE = 'boilerplate/app/ACCOUNT_UPDATE';
export const TOKEN_UPDATE = 'boilerplate/app/TOKEN_UPDATE';
export const DARK_MODE_UPDATE = 'boilerplate/app/DARK_MODE_UPDATE';

export const loadSettings = () => {
    return dispatch => {
        const settings = getSettings();
        dispatch(updateAccount(settings.account || {}));
        dispatch(updateDarkMode(settings.darkMode || false));
    }
};

const getSettings = () => {
    try {
        return JSON.parse(localStorage.settings || "{}");
    } catch (err) {
        console.warn(err);
        return {};
    }
};

const saveSettings = settings => {
    localStorage.settings = JSON.stringify(settings);
};

export const saveAccount = (account) => {
    return (dispatch, getState) => {
        if (account.token && !/^[a-z0-9]+$/i.test(account.token)) {
            return notifyMessage({status: STATUS_ERROR, message: "Invalid token string.", notifiedAt: Date.now()});
        }
        const settings = getState().settings;
        settings.account = account;
        saveSettings(settings);

        dispatch(updateAccount(account));
    }
};

const updateAccount = (account) => {
    return {type: ACCOUNT_UPDATE, account}
};

export const saveDarkMode = (darkMode) => {
    return (dispatch, getState) => {
        const settings = getState().settings;
        settings.darkMode = darkMode;
        saveSettings(settings);

        dispatch(updateDarkMode(darkMode));
    };
};

const updateDarkMode = (darkMode) => {
    return {type: DARK_MODE_UPDATE, darkMode}
};
