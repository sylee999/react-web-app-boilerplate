/*
 * action types
 */

export const CHANGE_APP_MENU = 'CHANGE_APP_MENU';
export const OPEN_APP_DRAWER = 'OPEN_APP_DRAWER';

/*
 * action creators
 */

export function changeAppMenu(menu) {
    return { type: CHANGE_APP_MENU, menu };
}

export function openAppDrawer(drawer) {
    return { type: OPEN_APP_DRAWER, drawer };
}
