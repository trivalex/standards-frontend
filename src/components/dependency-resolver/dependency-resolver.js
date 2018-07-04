import {
    FlattenedNodesObserver
} from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import {
    DEPEDENCY_WIRING_PREFIX
} from './Dependant';
/* 
 * dependency-resolver provides 'document dependency resolution',
 * a dependency injection approach for components within it's light-DOM.
 */
class DependencyResolver extends HTMLElement {

    constructor() {
        super();
        let tmpl = document.createElement('template');
        tmpl.innerHTML = `<slot id="dependencies"></slot>`;
        let shadowRoot = this.attachShadow({
            mode: 'open'
        });
        shadowRoot.appendChild(tmpl.content.cloneNode(true));
    }

    connectedCallback() {
        this._dependencyObserver = new FlattenedNodesObserver(this.shadowRoot.getElementById("dependencies"), (info) => {
            // registration
            info.addedNodes.filter((node) => {
                return (node.nodeType === Node.ELEMENT_NODE);
            }).forEach(element => {
                if (element.tagName !== undefined) {
                    this.addEventListener(
                        `${DEPEDENCY_WIRING_PREFIX}-${element.tagName.toLowerCase()}`, (event) => {
                            event.detail.dependency = element;
                            event.stopPropagation();
                        }
                    );
                }
            });
        });
    }
}
customElements.define("dependency-resolver", DependencyResolver);