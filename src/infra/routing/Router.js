import {
    connect
} from 'pwa-helpers/connect-mixin.js';
import {
    Route
} from './Route';
import {
    addRoute
} from './routing-actions';

export const EVENT_ROUTING = 'EVENT_ROUTING';

export const router = (store) => (baseElement) => class extends connect(store)(baseElement) {

    navigate(e) {
        console.log(e);
    }

    addRouteDataViaElements(elements) {
        if (!Array.isArray(elements)) return;
        elements.forEach((element) => this.addRouteDataViaElement(element));
    }

    addRouteDataViaElement(element) {
        if (!this.isRoutable(element)) return;
        store.dispatch(addRoute(new Route(element.routePath)));
    }

    removeRouteDataViaElements(elements) {
        if (!Array.isArray(elements)) return;
        elements.forEach((element) => this.removeRouteDataViaElement(element));
    }
    removeRouteDataViaElement(elements) {}

    isRoutable(something) {
        return something.isRoutable !== undefined && typeof something.isRoutable === "function" && something.isRoutable();
    }

    _stateChanged(state) {
        if (state && state.routeSelection) {
            this.dispatchEvent(new CustomEvent(EVENT_ROUTING, {
                bubbles: true,
                composed: true
            }));
        }
    }
};