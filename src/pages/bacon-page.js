import {
    LitElement,
    html
} from '@polymer/lit-element';
import {
    UiPage
} from '../main/ui/UiPage';

class InitialView extends UiPage(LitElement) {
    _render({
        ready,
        shallFetch
    }) {
        return html `
        <style>
            :host([unresolved]) * {
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
            data: {
                type: Object,
                notify: true,
                value: null
            },
            shallFetch: {
                type: Boolean,
                reflectToAttribute: true,
                value: false,
            }
        };
    }

    transitionInCallback() {
        if (!this.data && this.shallFetch) {
            fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=15&start-with-lorem=1")
                .then((r) => r.text().then((r) => this.data = r.replace('["', '').replace('"]', '')))
                .catch((e) => e);
        }
        // console.log(`hello-world ${this.id} presented`);
    }

    transitionOutCallback() {
        // console.log(`hello-world ${this.id} obscured`);
    }
}
customElements.define("bacon-page", InitialView);