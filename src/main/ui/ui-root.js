import {
    EVENT_ANIME_PAGES_TRANSITION_END
} from '../../components/anime-animation/anime-animated-pages/anime-animated-pages.js';

class UiRoot extends HTMLElement {
    template() {
        return `
    <ui-manager id="ui-manager">
        <slot slot="pages" name="pages" id="pages"></slot>
        <slot slot="drawer-content" name="drawer-content"></slot>
    </ui-manager>
    `;
    }

    static get properties() {
        return {
            interactive: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true
            }
        };
    }

    constructor() {
        super();

        let tmpl = document.createElement('template');
        tmpl.innerHTML = this.template();
        let shadowRoot = this.attachShadow({
            mode: 'open'
        });
        shadowRoot.appendChild(tmpl.content.cloneNode(true));

        /* jshint ignore:start */
        import('./ui-manager.js');
        /* jshint ignore:end */

    }
}
customElements.define('ui-root', UiRoot);