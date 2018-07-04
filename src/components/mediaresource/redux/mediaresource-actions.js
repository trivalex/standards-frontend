export const ADD_RESOURCE = 'ADD_RESOURCE';
export const DELETE_RESOURCE = 'DELETE_RESOURCE';
export const FETCH_RESOURCE = 'FETCH_RESOURCE';

export const addResource = (resource) => {
    return {
        type: ADD_RESOURCE,
        resource
    };
};
export const deleteResource = (resource) => {
    return {
        type: DELETE_RESOURCE,
        resource
    };
};
export const fetchResource = async (resource) => {
    return {
        type: FETCH_RESOURCE
    };
};