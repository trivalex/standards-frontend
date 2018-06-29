import { EVENT_ANIME_PAGES_TRANSITION_END } from '../../components/anime-animation/anime-animated-pages/anime-animated-pages.js';

class UiRoot extends HTMLElement {
    template() {
        return `
    <style>
        .page {
            position: absolute;
            z-index: 100;
            opacity: 0;
            margin-top: calc(var(--standard-header-height) + var(--content-margin));

            -webkit-align-self: center;
            align-self: center;
            left: calc(var(--content-left) + var(--content-margin));
            background: var(--milk-white);

            margin-left: var(--content-margin);
            margin-right: var(--content-margin);
            margin-bottom: var(--content-margin);
            width: var(--content-max-width);
            max-width: var(--content-max-width);
            min-height: calc(100vh - (var(--standard-header-height) + var(--content-margin) * 2));
            transition: opacity 0.3s ease-out;
        }

    </style>
    <ui-manager id="ui-manager">
        <media-page class="page" slot="pages" shallFetch id="media"></media-page>
        <grid-page class="page" slot="pages" id="grid"></grid-page>
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

        let path = window.location.pathname.replace('/', '');
        if (path === "") path = "media";
        const el = this.shadowRoot.getElementById('ui-manager').querySelector(`[id="${path}"]`);
        el.style.display = "block";
        el.setAttribute('initial-page', true);

        /* jshint ignore:start */
        import('./ui-manager.js');
        /* jshint ignore:end */

    }
}
customElements.define('ui-root', UiRoot);