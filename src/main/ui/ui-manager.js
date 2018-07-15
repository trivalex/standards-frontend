import {
    LitElement,
    html
} from '@polymer/lit-element';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall';
import {
    Dependant
} from '../../components/dependency-resolver/Dependant';
import {
    FlattenedNodesObserver
} from '@polymer/polymer/lib/utils/flattened-nodes-observer.js';
import {
    APP_TITLE
} from '../shell-app.js';
import {
    repeat
} from 'lit-html/lib/repeat';
import {
    connect
} from 'pwa-helpers/connect-mixin';
import {
    installMediaQueryWatcher
} from 'pwa-helpers/media-query.js';
import {
    store
} from '../../main/store.js';
import {
    ui
} from './ui-reducer';
import {
    EVENT_ANIME_PAGES_TRANSITION_START
} from '../../components/anime-animation/anime-animated-pages/anime-animated-pages.js';
import {
    EVENT_RAIL_INTERACTIVE,
    RAIL_SLIGHT_DELAY,
    EVENT_RAIL_FIRST_PAINT
} from '../../components/rail-performance/rail-performance-model';
import {
    iconMenu,
} from './ui-icons';
import {
    ScrollbarCSS
} from '../../../design/scroll-bar';
import {
    updateLayout, updateDrawerOpened
} from './ui-actions';
import { UiState } from './UiState';
store.addReducers({
    ui
});

/**
 * Compositional platform for the ui architecture.
 */
class UiManager extends UiState(connect(store)(Dependant(LitElement))) {

    _render({
        drawerOpened,
        routes,
        selectedRoute,
        narrowViewport
    }) {
        return html `
    <style>
        [unresolved], [unresolved="true"] {
            display: none;
            opacity: 0;
        }
        app-drawer-layout {
            --app-drawer-width: var(--standard-drawer-width);
        }
        app-header-layout {
            position: absolute;
            height: calc(100% - 200px);
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            min-height: 100vh;
            width: 100%;
            z-index: 1000;
            overflow: hidden;
        }
        app-header[unresolved] {
            opacity: 0;
        }
        app-header {
            width: 100%;
            text-align: center;
            background-color:  var(--standard-primary-glass-color);
            border-bottom: 1px solid var(--milk-white);
            min-height: var(--standard-header-height);
            z-index: 2000;
            opacity: 1;
            transition-property: opacity;
            transition-duration: .5s;
            font-size:var(--fluid-fontsize-b);
        }
        app-toolbar {
            min-height: var(--standard-header-height);
            color: var(--standard-light-text-color);
        }

        app-drawer {
            z-index: 3000;
            top: 0px;
            --app-drawer-scrim-background: var(--milk-grey);
            --app-drawer-content-container: {
                background-color: var(--standard-primary-glass-color);
                height: 100vh;
                width: var(--standard-drawer-width);
                padding: 0px;
            };
        }

        button {
            background: var(--milk-white);
            border: none;
            color: var(--standard-dark-text-color);
            cursor: pointer;
            height: var(--framed-icon-size);
            width: var(--framed-icon-size);
        }
        button:hover {
            fill: var(--standard-primary-color);
        }

        app-drawer-layout:not([narrow]) [title="drawer menu"] {
            display: none;
        }

        ${ScrollbarCSS}
    </style>
    
    <app-drawer-layout forceNarrow="${narrowViewport}">
        <app-header-layout has-scrolling-region>
        
            <app-header slot="header" id="header" unresolved="true" condenses shadow reveals effects="waterfall">
                <app-toolbar>
                    <button on-click="${(e) => store.dispatch(updateDrawerOpened(true))}"
                        title="drawer menu">
                    ${iconMenu}
                    </button>
                    <h4 condensed-title>${APP_TITLE}</h4>
                </app-toolbar>
            </app-header>

            <anime-animated-pages active activate-event="activateEvent" selected="${selectedRoute}" id="views" attr-for-selected="id"
                attrForSelected="a" routeInDuration=${RAIL_SLIGHT_DELAY} routeOutDuration=${RAIL_SLIGHT_DELAY} routeDebounce=0>
                <slot slot="pages" name="pages" id="pages"></slot>
            </anime-animated-pages>

        </app-header-layout>

        <app-drawer id="drawer" swipe-open unresolved opened="${drawerOpened}" slot="drawer">
            <slot name="drawer-content"></slot>
        </app-drawer>
    </app-drawer-layout>

`;
    }

    _wireDependencies() {
        /* jshint ignore:start */
        import("../routing/routing-service.js").then(() => {
            this._pageObserver = new FlattenedNodesObserver(this.shadowRoot.getElementById("pages"), (info) => {
                this.routingService = this._wireDependency(this.routingService, "routing-service");

                this.routingService.addRouteDataViaElements(info.addedNodes);
                this.routingService.removeRouteDataViaElements(info.removedNodes);
            });
        });
        /* jshint ignore:end */
    }

    connectedCallback() {
        super.connectedCallback();

        installMediaQueryWatcher("(min-width: 1200px)", (matches) => {
            store.dispatch(updateLayout(!matches));
        });

        /* jshint ignore:start */
        import('../../components/anime-animation/anime-animated-pages/anime-animated-pages.js').then(() => {
            import('./ui-deferred-dependencies.js').then(() => {
                this.shadowRoot.getElementById("header").removeAttribute("unresolved");
                import('./ui-navigation-dependencies.js').then(() => {
                    this.shadowRoot.getElementById("drawer").removeAttribute("unresolved");
                });
            });
            this.dispatchEvent(new CustomEvent(EVENT_RAIL_INTERACTIVE, {
                bubbles: true,
                composed: true,
                scoped: false
            }));
            performance.mark(EVENT_RAIL_INTERACTIVE);
        });
        /* jshint ignore:end */
        performance.mark('mark_boot_end');
        performance.mark(EVENT_RAIL_FIRST_PAINT);
    }

    disconnectedCallback() {
        this.removeEventListener(EVENT_ANIME_PAGES_TRANSITION_START);
    }
}

window.customElements.define('ui-manager', UiManager);