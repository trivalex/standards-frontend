import {
    UPDATE_PAGE,
    ADD_ROUTE,
    ADD_ROUTES
} from './routing-actions.js';
import { store } from '../../store.js';

export const RoutingReducer = (state, action) => {
    /* jshint ignore:start */
    switch (action.type) {
        case UPDATE_PAGE:
            return {
                ...state,
                page: action.page
            };
        case ADD_ROUTES:
            if (action.routes === undefined) {
                console.error();
            }
            action.routes = state.routing.routes.concat(action.routes)
            return {
                ...state,
                routing: Object.assign(state.routing.routes, action.routes)
            };
        case ADD_ROUTE:
            if (action.route === undefined) {
                console.error();
            };
            action.routes = state.routing.routes.push(action.route);
            return {
                ...state,
                routing: Object.assign(state.routing.routes, action.routes)
            };
        default:
            return state;
    }
    /* jshint ignore:end */
};

export default RoutingReducer;