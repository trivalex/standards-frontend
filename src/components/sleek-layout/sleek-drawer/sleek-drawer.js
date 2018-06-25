class SleekDrawer extends HTMLElement {
    template() {
        return `
    <style>      
        :host {
            position: fixed;
            left: 0px;
            top: 0px;
            display: block;
            transition-timing-function: linear;
            transition-property: -webkit-transform;
            transition-property: transform;
            --standard-drawer-width: var(--standard-drawer-width, 300px);
            width: var(--standard-drawer-width, 300px);
            height: var(--standard-drawer-height, 100vh);
            --standard-drawer-index: 3000;
            z-index: var(--standard-drawer-index, 3000);
        }
        :host(:not([open])) {
            left: calc(0px - var(--standard-drawer-width));
        }

        #contentContainer {
            position: relative;
            width: 100%;
            height: 100%;

            display: grid;
            grid-template-areas:
                "toolbar"
                "content";
            grid-template-rows: var(--standard-header-height, 100px) auto;

            background: var(--sleek-drawer-background, --standard-secondary-color);
            z-index: var(--standard-drawer-index, 3000);
        }

        #scrim {
            position: fixed;
            left: 0px;
            top: 0px;
            display: block;
            background: var(--sleek-drawer-scrim-background, var(--standard-tetiary-color, rgba(50, 50, 50, 0.5)));
            width: 100vw;
            height: 100vh;
            z-index: calc(var(--standard-drawer-index, 3000) -1);
        }
        
        :host([open]) #scrim {
            pointer-events: all;
        }
        
        ::slotted(*) {
            grid-area: content;
        }

        ::slotted([toolbar]) {
            grid-area: toolbar;
            max-height: var(--standard-header-height, 100px);
        }
    </style>
    <div id="contentContainer">
        <slot></slot>
    </div>
    <div id="scrim">
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

    toggle() {

    }
}
customElements.define("sleek-drawer", SleekDrawer);