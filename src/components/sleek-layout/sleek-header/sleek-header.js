class SleekHeader extends HTMLElement {
    template() {
        return `
    <style>      
        :host {
            position: relative;
            display: block;
            transition-timing-function: linear;
            transition-property: -webkit-transform;
            transition-property: transform;
            height: var(--standard-header-height, 100px)
        }
        :host([condensed]) {
            height: 0px;
        }

        #contentContainer {
            position: relative;
            width: 100%;
            height: 100%;
            background: var(--sleek-header-background, --standard-secondary-color);

            display: grid;
            grid-template-areas:
                "toolbar-left toolbar toolbar-right";
            grid-template-columns: 1fr 3fr 1fr;
        }

        ::slotted(*) {
            margin: var(--gutter-default, 16px);
            grid-area: toolbar;
        }
        ::slotted([toolbar-left]) {
            grid-area: toolbar-left;
        }
        ::slotted([toolbar-right]) {
            grid-area: toolbar-right;
        }
    </style>
    <div id="contentContainer">
        <slot></slot>
    </div>
`;
    }

    constructor() {
        super();

        let tmpl = document.createElement('template');
        tmpl.innerHTML = this.template();
        let shadowRoot = this.attachShadow({
            mode: 'open'
        });
        shadowRoot.appendChild(tmpl.content.cloneNode(true));

        
    }

    connectedCallback() {
        this.removeAttribute('unresolved');
    }
}
customElements.define("sleek-header", SleekHeader);