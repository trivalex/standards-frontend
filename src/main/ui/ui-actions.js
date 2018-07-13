export const UPDATE_DRAWER_OPENED = 'UPDATE_DRAWER_OPENED';
export const UPDATE_NARROW_VIEWPORT = 'UPDATE_NARROW_VIEWPORT';

export const updateDrawerOpened = (open) => {
    return {
        type: UPDATE_DRAWER_OPENED,
        open
    };
};
export const updateLayout = (narrowViewport) => {
    console.log(narrowViewport);
    return {
        type: UPDATE_NARROW_VIEWPORT,
        narrowViewport
    };
};