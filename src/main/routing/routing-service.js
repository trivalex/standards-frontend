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
} from '../routing/routing-reducer';store.addReducers({
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
}
window.customElements.define('routing-service', RoutingService);