import {
    LitElement,
    html
} from '@polymer/lit-element';

import {
    updateOffline
} from '../../actions/app.js';
import {
    installOfflineWatcher
} from 'pwa-helpers/network.js';
/**
 */
class NetwortkService extends LitElement {
    _render(props) {
        return html `
<slot></slot>
    `;
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