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
class UiManager extends Dependant(LitElement) {
    _render() {
        return html`
<slot></slot><slot name="pages" id="pages"></slot>
`;
    }

    _wireDependencies() {
        import("../routing/routing-service.js").then(() => {
            this._pageObserver = new FlattenedNodesObserver(this.shadowRoot.getElementById("pages"), (info) => {
                this.routingService = this._wireDependency(this.routingService, "routing-service");
                this.routingService.hydrateRouteDataFromElements(info.addedNodes);
                this.routingService.reduceRouteDataFromElements(info.removedNodes);
            });
        });
    }
}

window.customElements.define('ui-manager', UiManager);