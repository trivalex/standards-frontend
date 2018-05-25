import {installRouter} from 'pwa-helpers/router.js';
import {router} from './Router';
import {store} from '../store';
import {navigate} from './routing-actions';
class RoutingService extends router(store)(HTMLElement) {
    connectedCallback() {
        let tmpl = document.createElement('template');
        tmpl.innerHTML = `<slot id="dependencies"></slot>`;
        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
        // installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
    }
}
window.customElements.define('routing-service', RoutingService);