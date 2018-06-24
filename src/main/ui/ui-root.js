import { EVENT_ANIME_PAGES_TRANSITION_END } from '../../components/anime-animation/anime-animated-pages/anime-animated-pages.js';
import { iconMenu } from './ui-icons.js';
import { APP_TITLE } from '../shell-app.js';

class UiRoot extends HTMLElement {
    template() {
        return `
    <style>
        :host {
            display: block;
            -webkit-overflow-scrolling: auto;
            position: relative;
            max-width: -webkit-fit-available;
                        
            background-color: var(--standard-tertiary-color);
            font-family: 'Montserrat', sans-serif;
        }

        initial-page[unresolved] {
            opacity: 0;
            z-index: 0;
            display: none;
        }

        initial-page[ready] {
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
        }

        initial-page {
            position: absolute;
            z-index: 100;
            top: calc(var(--content-margin) + var(--standard-header-height));
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
        }

        awe-scenery {
            position: fixed;
            --awe-card-color: var(--standard-primary-glass-color);
            z-index: 0;
        }
        #dummyHeader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            background-color:  var(--standard-primary-glass-color);
            min-height: var(--standard-header-height);
        }
    </style>
    <div id="dummyHeader"></div>
    <ui-manager id="ui-manager">
        <initial-page slot="pages" shallFetch routePath="a"></initial-page>
        <initial-page slot="pages" shallFetch routePath="b"></initial-page>
        <initial-page slot="pages" routePath="e"></initial-page>
        <initial-page slot="pages" routePath="y"></initial-page>
        <initial-page slot="pages" shallFetch routePath="z"></initial-page>
    </ui-manager>
    <awe-scenery id="scenery" folded></awe-scenery>
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
        import('../../../design/design.js').then(() => {
            import('../../domain/hello-world/initial-page.js').then(() => {
                const path = window.location.pathname.replace('/', '');
                const el = this.shadowRoot.getElementById('ui-manager').querySelector(`[routePath="${path}"]`);
                el.style.display = "block";
                el.setAttribute('initial-page', true);
                el.transitionInCallback();
                import('./ui-manager.js');
                import('../../components/awe-decoration/awe-scenery/awe-scenery.js');
            });
        });
        /* jshint ignore:end */

        this.addEventListener(EVENT_ANIME_PAGES_TRANSITION_END, () => {
            this.shadowRoot.getElementById("scenery").removeAttribute("folded");
        });
    }

    connectedCallback() {
        const path = window.location.pathname.replace('/', '');
        const el = this.shadowRoot.getElementById('ui-manager').querySelector(`[routePath="${path}"]`);
        el.setAttribute('initial-page', true);
    }
}
customElements.define('ui-root', UiRoot);