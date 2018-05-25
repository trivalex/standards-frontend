import {
    installRouter
} from 'pwa-helpers/router.js';
import {
    connect
} from 'pwa-helpers/connect-mixin.js';
import {
    Routable
} from './Routable';
import {
    Route
} from './Route';
import {
    addRoute
} from './routing-actions';

export const router = (store) => (baseElement) => class extends connect(store)(baseElement) {

    navigate(e) {console.log(e);}

    hydrateRouteDataFromElements(elements) {
        if (!Array.isArray(elements)) return;
        elements.forEach((element) => {this.addRouteFromElement(element);});
    }

    addRouteFromElement(element) {
        if (!this.isRoutable(element)) {
            console.debug("Tried to create a route from an element that was not routable", element);
            return;
        }
        store.dispatch(addRoute(new Route(element.routePath, element.componentUri)));
    }

    reduceRouteDataFromElements(elements) {}
    
    isRoutable(something) {
        return something.isRoutable !== undefined && typeof something.isRoutable === "function" && something.isRoutable();
    }

    // // This s called every time something is updated in the store.
    _stateChanged(state) {}
};

export const routes = [];