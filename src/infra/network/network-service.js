import {
    updateOffline
} from '../../actions/app.js';
import {
    installOfflineWatcher
} from 'pwa-helpers/network.js';
/**
 */

class NetwortkService extends router(store)(HTMLElement) {
    constructor() {
        super();

        let tmpl = document.createElement('template');
        tmpl.innerHTML = `
<slot></slot>
        `;

        let shadowRoot = this.attachShadow({
            mode: 'open'
        });
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
        //     installRouter((location) => store.dispatch(navigate(window.decodeURIComponent(location.pathname))));
    }

    static get properties() {
        return {};
    }

    constructor() {
        super();
    }
    _firstRendered() {
        installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
    }
}

window.customElements.define('network-service', NetwortkService);