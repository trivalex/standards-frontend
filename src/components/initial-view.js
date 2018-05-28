import {
    LitElement,
    html
} from '@polymer/lit-element';

class InitialView extends LitElement {
    _render() {
        return html `
        ${(this.data)? this.data : "fetching text..."}
`;
    }

    static get properties() {
        return {
            unresolved: {
                type: Boolean,
                notify: true,
                value: true,
                reflectToAttribute: true
            },
            data: {
                type: Object,
                notify: true,
                value: null
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        performance.mark('mark_interactive');
        this.removeAttribute('unresolved');
        this.setAttribute("loading", true);

        setTimeout(() => {
            this.removeAttribute('loading');
            this.setAttribute("ready", true);
            let interactiveEvent = new CustomEvent('rail-interactive', {
                bubbles: true,
                composed: true,
                scoped: false
            });
            this.dispatchEvent(interactiveEvent);
        }, 50);
        fetch("https://baconipsum.com/api/?type=meat-and-filler&paras=25&start-with-lorem=1")
            .then((r) => r.text().then((r) => this.data = r.replace('["', '').replace('"]', '')))
            .catch((e) => e);
    }
}
customElements.define("initial-view", InitialView);