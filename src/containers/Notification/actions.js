import {
    MESSAGE
} from "./constants";

export const notifyMessage = message => ({type: MESSAGE, message: message});
