export const UPDATE_DRAWER_OPENED = 'UPDATE_DRAWER_OPENED';

export const updateDrawerOpened = (open) => {
    return {
        type: UPDATE_DRAWER_OPENED,
        open
    };
}