import {
    router
} from './Router';
import {
    store
} from '../../main/store';
import {
    installRouter
} from 'pwa-helpers/router';
import {
    routes,
    routeSelection
} from '../routing/routing-reducer';
import {
    navigate
} from './routing-actions';
import {
    updateDrawerOpened
} from '../ui/ui-actions';
store.addReducers({
    routes,
    routeSelection
});
class RoutingService extends router(store)(HTMLElement) {

    constructor() {
        super();
        let tmpl = document.createElement('template');
        tmpl.innerHTML = `<slot></slot>`;
        let shadowRoot = this.attachShadow({
            mode: 'open'
        });
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
        installRouter(this.routeCallback);
    }

    routeCallback(location) {
        store.dispatch(navigate(window.decodeURIComponent(location.pathname)));
        if (store.getState().ui.narrowViewport) {
            store.dispatch(updateDrawerOpened(false));
        }
    }
}
window.customElements.define('routing-service', RoutingService);