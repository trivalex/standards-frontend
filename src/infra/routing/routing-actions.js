import {
    routes
} from './Router.js';

export const UPDATE_PAGE = 'UPDATE_PAGE';
export const ADD_ROUTES = 'ADD_ROUTES';
export const ADD_ROUTE = 'ADD_ROUTE';

export const navigate = (path) => (dispatch) => {
    // Extract the page name from path.
    const page = path === '/' ? 'view1' : path.slice(1);

    // Any other info you might want to extract from the path (like page type),
    // you can do here
    dispatch(loadPage(page));
};

/* jshint ignore:start */
export const loadPage = (page) => async (dispatch) => {

    if (routes === undefined) {
        console.error("routing call without defined global routes array. Check for race conditions");
        return;
    }
    if (routes[page] === undefined) {
        console.error("routing call without defined routes in global routes array. Check for race conditions");
        return;
    }
    if (routes[page].path === undefined) {
        console.error("routing call on corrupt route. Check route configuration");
        return;
    }

    dispatch(updatePage(page));
}

export const addRoutes = (routes) => {
    return {
        type: ADD_ROUTES,
        routes
    };
}

export const addRoute = (route) => {
    return {
        type: ADD_ROUTE,
        route
    };
}

export const updatePage = (page) => {
    return {
        type: UPDATE_PAGE,
        page
    };
}