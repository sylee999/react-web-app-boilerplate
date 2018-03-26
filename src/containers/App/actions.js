export const APP_MENU = 'boilerplate/app/APP_MENU';
export const APP_DRAWER = 'boilerplate/app/APP_DRAWER';

export const setAppMenu = menu => ({type: APP_MENU, menu});
export const openAppDrawer = drawer => ({type: APP_DRAWER, drawer});
