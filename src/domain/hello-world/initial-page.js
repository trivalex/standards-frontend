import {
    LitElement,
    html
} from '@polymer/lit-element';
import { UiPage } from '../../main/ui/UiPage';

class InitialView extends UiPage(LitElement) {
    _render({ready, shallFetch}) {
        return html `
        <style>
            :host([unresolved]) *{
                display: none;
            }
            div {
                padding: var(--content-padding);
                max-width: calc(var(--content-max-width) - var(--gutter-double));
                font-size: var(--fluid-fontsize-d);
            }
        </style>
        <div>
            ${(this.data)? this.data : (shallFetch) ? "fetching text..." : " Dummy content"}
        </div>
`;
    }

    static get properties() {
        return {
            unresolved: {
                type: Boolean,
                value: true,
                reflectToAttribute: true
            },
            data: {
                type: Object,
                notify: true,
                value: null
            },
            ready: {
                type: Boolean,
                value: false,
                reflectToAttribute: true
            },
            shallFetch: {
                type: Boolean,
                reflectToAttribute: true,
                value: false,
            }
        };
    }
    
    connectedCallback() {
        super.connectedCallback();
        this.removeAttribute('unresolved');
        this.setAttribute('ready', true);
    }

    transitionInCallback() {
        if (!this.data && this.shallFetch) {
            fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=15&start-with-lorem=1")
                .then((r) => r.text().then((r) => this.data = r.replace('["', '').replace('"]', '')))
                .catch((e) => e);
        }
        // console.log(`hello-world ${this.routePath} presented`);
    }

    transitionOutCallback() {
        // console.log(`hello-world ${this.routePath} obscured`);
    }
}
customElements.define("initial-page", InitialView);