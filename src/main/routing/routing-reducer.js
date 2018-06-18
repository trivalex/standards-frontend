import {
    UPDATE_PAGE,
    ADD_ROUTE,
    ADD_ROUTES
} from './routing-actions.js';

export const routes = (state = {
    routes: [],
}, action) => {
    /* jshint ignore:start */
    switch (action.type) {
        case ADD_ROUTES:
            return { ...state,
                routes: Array.from(state.routes).concat(action.routes)
            };
        case ADD_ROUTE:
            let newRoutes = state.routes;
            newRoutes.push(action.route)
            return { ...state,
                routes: newRoutes
            };
        default:
            return {...state};
    }
    /* jshint ignore:end */
};
export const routeSelection = (state = {
    selectedRoute: ""
}, action) => {
    /* jshint ignore:start */
    switch (action.type) {
        case UPDATE_PAGE:
            return { ...state,
                selectedRoute: action.page
            };
        default:
            return state;
    }
    /* jshint ignore:end */
};