import {
    LitElement,
    html
} from '@polymer/lit-element';
import {
    Dependant
} from '../dependency-resolver/Dependant';
import {
    FlattenedNodesObserver
} from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
/**
 * Represents a inter
 */
class UiManager extends Dependant(LitElement) {
    _render() {
        return html`
<style>
    :host> ::slotted(.page) {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
    }
</style>
<slot></slot><slot name="pages" id="pages"></slot>
`;
    }

    _wireDependencies() {
        this.routingService = this._wireDependency(this.routingService, "routing-service");
    }

    // static get properties() {
    //     return {};
    // }

    connectedCallback() {
        super.connectedCallback();

        this._pageObserver = new FlattenedNodesObserver(this.shadowRoot.getElementById("pages"), (info) => {
            this.routingService.hydrateRouteDataFromElements(info.addedNodes);
            this.routingService.reduceRouteDataFromElements(info.removedNodes);
        });
    }
}

window.customElements.define('ui-manager', UiManager);