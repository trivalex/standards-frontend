import {
    router
} from './Router';
import {
    store
} from '../../store';
import { installRouter } from 'pwa-helpers/router';
import { navigate } from './routing-actions';
import { updateDrawerOpened } from '../ui/ui-actions';
class RoutingService extends router(store)(HTMLElement) {

    constructor() {
        super();
        let tmpl = document.createElement('template');
        tmpl.innerHTML = `<slot></slot>`;
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
        installRouter((location) => {
            store.dispatch(navigate(window.decodeURIComponent(location.pathname)));
            store.dispatch(updateDrawerOpened(false));
        });
    }
}
window.customElements.define('routing-service', RoutingService);