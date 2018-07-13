import {
    Routable
} from '../routing/Routable.js';

export const UiState = (baseElement) => class extends baseElement {
    
    static get properties() {
        return {
            drawerOpened: {
                type: Boolean,
                reflectToAttribute: true,
            },
            routes: {
                type: Array,
            },
            selectedRoute: {
                type: String,
                value: "a",
            },
            narrowViewport: {
                type: Boolean,
                reflectToAttribute: true,
            },
        };
    }
    _stateChanged(newState) {
        if (newState && newState.routes && newState.routes.routes.length) {
            this.routes = newState.routes.routes;
        }
        if (newState && newState.routeSelection) {
            this.selectedRoute = newState.routeSelection.selectedRoute;
        }
        if (newState && newState.ui.drawerOpened !== this.drawerOpened) {
            this.drawerOpened = newState.ui.drawerOpened;
        }
        if (newState && newState.ui.narrowViewport !== this.narrowViewport) {
            this.narrowViewport = newState.ui.narrowViewport;
        }
    }
};