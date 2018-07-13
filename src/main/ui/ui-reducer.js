import {
    UPDATE_DRAWER_OPENED,
    UPDATE_NARROW_VIEWPORT
} from "./ui-actions";

export const ui = (state = {
    drawerOpened: false,
    narrowViewport: true
}, action) => {
    /* jshint ignore:start */
    switch (action.type) {
        case UPDATE_DRAWER_OPENED:
            return { ...state,
                drawerOpened: action.open
            };
        case UPDATE_NARROW_VIEWPORT:
            return { ...state,
                narrowViewport: action.narrowViewport
            };
        default:
            return {...state};
    }
    /* jshint ignore:end */
};