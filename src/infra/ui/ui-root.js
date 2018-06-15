import {
    LitElement,
    html
} from '@polymer/lit-element';
import { EVENT_ANIME_PAGES_TRANSITION_END } from '../../components/anime-animated-pages.js';
import { EVENT_RAIL_FIRST_PAINT, EVENT_RAIL_INTERACTIVE } from '../rail-performance-model.js';
class UiRoot extends LitElement {
    _render({interactive}) {
        return html `
    <style>
        :host {
            display: block;
            position: fixed;
            
            background-color: var(--app-tertiary-color);
            font-family: 'Montserrat', sans-serif;

            -webkit-overflow-scrolling: auto;
            position: relative;
            max-width: -webkit-fit-available;
        }

        tri-loading-indicator {
            position: fixed;
            --tri-li-size: var(--small-card-size);
            --tri-li-bg-color: var(--view-primary-glass-color);
            --tri-li-color-a:var(--view-primary-glass-color);
            --tri-li-color-b:var(--view-primary-glass-color);
            left: calc(50vw - var(--small-card-size) / 2);
            top: calc(50vh  - var(--small-card-size) / 2);
            transition: all 1s cubic-bezier(1.000, 0.005, 0.000, 1.000); /* custom */
            z-index: 10000;
        }

        tri-loading-indicator[interactive] {
            transition: all 1s cubic-bezier(1.000, 0.005, 0.000, 1.000); /* custom */
            opacity: 0.1;
            z-index: 300;
        }
        
        tri-loading-indicator[unresolved] {
            opacity: 0;
        }

        initial-view[ready] {
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

        initial-view {
            position: absolute;
            opacity: 0;
        }

        awe-scenery {
            position: fixed;
            --awe-card-color: var(--view-primary-glass-color);
            z-index: 300;
        }

        #loadingText {
            color: white;
            position: fixed;
            margin: calc(50vw - (50vw /2));
            width: 50vw;
            font-size: 32px;
            text-align: center;
            bottom: 32px;
        }
    </style>
    <ui-manager id="ui-manager">
        <initial-view slot="pages" shallFetch routePath="a"></initial-view>
        <initial-view slot="pages" shallFetch routePath="b"></initial-view>
        <initial-view slot="pages" shallFetch routePath="c"></initial-view>
        <initial-view slot="pages" shallFetch routePath="d"></initial-view>
        <initial-view slot="pages" routePath="e"></initial-view>
        <initial-view slot="pages" routePath="f"></initial-view>
        <initial-view slot="pages" routePath="g"></initial-view>
        <initial-view slot="pages" routePath="h"></initial-view>
        <initial-view slot="pages" routePath="i"></initial-view>
        <initial-view slot="pages" routePath="j"></initial-view>
        <initial-view slot="pages" routePath="k"></initial-view>
        <initial-view slot="pages" routePath="l"></initial-view>
        <initial-view slot="pages" routePath="m"></initial-view>
        <initial-view slot="pages" routePath="n"></initial-view>
        <initial-view slot="pages" routePath="o"></initial-view>
        <initial-view slot="pages" routePath="p"></initial-view>
        <initial-view slot="pages" routePath="q"></initial-view>
        <initial-view slot="pages" routePath="r"></initial-view>
        <initial-view slot="pages" routePath="s"></initial-view>
        <initial-view slot="pages" routePath="t"></initial-view>
        <initial-view slot="pages" routePath="u"></initial-view>
        <initial-view slot="pages" routePath="v"></initial-view>
        <initial-view slot="pages" routePath="w"></initial-view>
        <initial-view slot="pages" routePath="x"></initial-view>
        <initial-view slot="pages" routePath="y"></initial-view>
        <initial-view slot="pages" shallFetch routePath="z"></initial-view>
    </ui-manager>
    <span id="loadingText">... Loading ...</span>
    <awe-scenery id="scenery" folded></awe-scenery>
    <tri-loading-indicator unresolved animate="${interactive === false}" rows=4 bitsPerRow=4></tri-loading-indicator>
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
        import('../../../design/design.js').then(() => {
            import('../../components/initial-view.js').then(() => {
                import('../../components/tri-loading-indicator.js').then(() => {
                    import('./ui-manager.js');
                });
                import('../../components/awe-scenery.js');
            });
        });

        this.addEventListener(EVENT_RAIL_INTERACTIVE, () => {
            this.interactive = true;
            this.setAttribute("interactive", true);
        });

        this.addEventListener(EVENT_ANIME_PAGES_TRANSITION_END, () => {
            this.shadowRoot.getElementById("scenery").removeAttribute("folded");
            this.shadowRoot.getElementById("loadingText").setAttribute("hidden", true);
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