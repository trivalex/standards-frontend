import {
    router
} from './Router';
import {
    store
} from '../../store';
import {
    RoutingReducer
} from './RoutingReducer.js';
class RoutingService extends router(store)(HTMLElement) {

    constructor() {
        super();

        let tmpl = document.createElement('template');
        tmpl.innerHTML = `
<slot></slot>
        `;

        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
        //     installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
    }

    static get properties() {
        return {};
    }
}

window.customElements.define('routing-service', RoutingService);