import { UPDATE_DRAWER_OPENED } from "./ui-actions";

export const ui = (state = {
    drawerOpened: false,
}, action) => {
    /* jshint ignore:start */
    switch (action.type) {
        case UPDATE_DRAWER_OPENED:
            return { ...state,
                drawerOpened: action.open
            };
        default:
            return {...state};
    }
    /* jshint ignore:end */
};