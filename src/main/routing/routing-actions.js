export const UPDATE_PAGE = 'UPDATE_PAGE';
export const ADD_ROUTES = 'ADD_ROUTES';
export const ADD_ROUTE = 'ADD_ROUTE';

export const navigate = (path) => (dispatch) => {
    // Extract the page name from path.
    const page = path === '/' ? 'media' : path.slice(1);

    // Any other info you might want to extract from the path (like page type),
    // you can do here
    dispatch(loadPage(page));
};

/* jshint ignore:start */
export const loadPage = (page) => async (dispatch) => {
    import(`../../pages/${page}-page.js`).then(() => {
        dispatch(updatePage(page));
    });
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