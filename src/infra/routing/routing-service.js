import {
    LitElement,
    html
} from '@polymer/lit-element';

import {
    installRouter
} from 'pwa-helpers/router.js';
import {
    router
} from './Router';
import {
    store
} from '../../store';
import {
    navigate,
    addRoute
} from './routing-actions';
import {
    Route
} from './Route';
import {
    RoutingReducer
} from './RoutingReducer.js';
/**
 */
class RoutingService extends router(store)(LitElement) {
    _render(props) {
        return html `
<slot></slot>
    `;
    }

    static get properties() {
        return {};
    }

    _firstRendered() {
        installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
    }
}

window.customElements.define('routing-service', RoutingService);