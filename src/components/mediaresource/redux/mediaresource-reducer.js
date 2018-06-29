import { ADD_RESOURCE, DELETE_RESOURCE, FETCH_RESOURCE } from "./mediaresource-actions";

export const mediaresource = (state = {
    resources: []
}, action) => {
    /* jshint ignore:start */
    switch (action.type) {
        case ADD_RESOURCE:
            return { ...state,
            };
        case DELETE_RESOURCE:
            return { ...state,
            };
        case FETCH_RESOURCE:
            return { ...state,
            };
        default:
            return {...state};
    }
    /* jshint ignore:end */
};