import {
    LitElement,
    html
} from '@polymer/lit-element';
import { EVENT_ANIME_PAGES_TRANSITION_END } from '../../components/anime-animation/anime-animated-pages/anime-animated-pages.js';
import { EVENT_RAIL_FIRST_PAINT, EVENT_RAIL_INTERACTIVE } from '../../components/rail-performance/rail-performance-model';
class UiRoot extends LitElement {
    _render({interactive}) {
        return html `
    <style>
        :host {
            display: block;
            -webkit-overflow-scrolling: auto;
            position: relative;
            max-width: -webkit-fit-available;
                        
            background-color: var(--app-tertiary-color);
            font-family: 'Montserrat', sans-serif;
        }

        initial-page[ready] {
            -webkit-align-self: center;
            align-self: center;
            left: calc(var(--content-left) + var(--content-margin));
            background: var(--milk-white);

            margin-left: var(--content-margin);
            margin-right: var(--content-margin);
            margin-top: calc(var(--content-margin) + var(--header-height));
            margin-bottom: var(--content-margin);
            width: var(--content-max-width);
            max-width: var(--content-max-width);
            min-height: calc(100vh - (var(--header-height) + var(--content-margin) * 2));
        }

        initial-page {
            position: absolute;
            opacity: 0;
            z-index: 100;
        }

        awe-scenery {
            position: fixed;
            --awe-card-color: var(--view-primary-glass-color);
            z-index: 0;
        }
    </style>
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
        /* jshint ignore:start */
        import('../../domain/hello-world/initial-page.js').then(() => {
            import('../../../design/design.js').then(() => {
                import('./ui-manager.js');
                import('../../components/awe-decoration/awe-scenery/awe-scenery.js');
            });
        });

        this.addEventListener(EVENT_RAIL_INTERACTIVE, () => {
            this.interactive = true;
            this.setAttribute("interactive", true);
        });

        this.addEventListener(EVENT_ANIME_PAGES_TRANSITION_END, () => {
            this.shadowRoot.getElementById("scenery").removeAttribute("folded");
        });
        
        /* jshint ignore:end */
    }

    disconnectedCallback() {
        this.removeEventListener(EVENT_ANIME_PAGES_TRANSITION_END);
    }

    _firstRendered() {
        performance.mark('mark_boot_end');
        performance.mark(EVENT_RAIL_FIRST_PAINT);
    }
}
customElements.define('ui-root', UiRoot);