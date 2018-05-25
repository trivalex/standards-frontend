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
import { addRoute } from './routing-actions';

export const router = (store) => (baseElement) => class extends connect(store)(baseElement) {

    navigate(e) {
        console.log(e);
    }

    hydrateRouteDataFromElements(elements) {
        if (!Array.isArray(elements)) return;

        elements.forEach((element) => {
            this.addRouteFromElement(element);
        });
    }

    addRouteFromElement(element) {
        if (!this.isRoutable(element)) {
            return;
        }
        store.dispatch(addRoute(new Route(element.routePath, element.componentUri)));
    }

    reduceRouteDataFromElements(elements) {
        if (!Array.isArray(elements)) return;

        elements.forEach(element => {
            // addRouteFromElement(element);
        });
    }

    isRoutable(something) {
        return something.isRoutable !== undefined && typeof something.isRoutable === "function" && something.isRoutable();
    }

    // // This is called every time something is updated in the store.
    _stateChanged(state) {}
};

export const routes = [];