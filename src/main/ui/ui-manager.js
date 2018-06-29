import {
    LitElement,
    html
} from '@polymer/lit-element';
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
    store
} from '../../main/store';
import {
    ui
} from './ui-reducer';
import { EVENT_ANIME_PAGES_TRANSITION_START } from '../../components/anime-animation/anime-animated-pages/anime-animated-pages.js';
import { EVENT_RAIL_INTERACTIVE, RAIL_SLIGHT_DELAY, EVENT_RAIL_FIRST_PAINT } from '../../components/rail-performance/rail-performance-model';
import { iconMenu, iconAccount, iconSettings, iconInfo } from './ui-icons';
store.addReducers({
    ui
});

class UiManager extends connect(store)(Dependant(LitElement)) {

    _render({
        drawerOpened,
        routes,
        selectedRoute
    }) {
        return html `
    <style>
        [unresolved="true"] {
            opacity: 0;
        }
        app-header-layout {
            position: absolute;
            height: calc(100% - 200px);
            overflow: hidden;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
            height: 100vh;
            width: 100vw;
            z-index: 1000;
        }
        app-header[unresolved] {
            opacity: 0;
        }
        app-header {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            text-align: center;
            background-color:  var(--standard-primary-glass-color);
            color: var(--standard-header-text-color);
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
        }

        app-drawer {
            z-index: 3000;
            top: 0px;
            --app-drawer-scrim-background: var(--milk-grey);
            --app-drawer-content-container: {
                background-color: var(--standard-primary-glass-color);
                height: 100vh;
                padding: var(--gutter-default) 0px;
                width: var(--standard-drawer-width);
                display: grid;
                grid-template-rows: var(--framed-icon-size) calc(100vh - (var(--framed-icon-size) + (var(--gutter-default) * 4)) );
                grid-template-columns: var(--standard-drawer-width);
                grid-gap: var(--gutter-default);
                font-size: var(--fluid-fontsize-b);
                text-align: center;
            };
        }
        [unresolved="true"] .drawer-list,
        [unresolved="true"] .drawer-menu {
            opacity: 0;
        }
        .drawer-menu {
            display: grid;
            grid-template-rows: var(--framed-icon-size);
            grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
            grid-gap: var(--gutter-default);
            padding: 0px var(--gutter-default);
        }
        .drawer-menu > * {
            background: var(--milk-white);
            line-height: 0;
        }
        .drawer-list {
            border-top: 1px solid var(--milk-white);
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-auto-rows : var(--drawer-card-size);
            grid-gap: var(--gutter-default);
            overflow-y: auto;
            overflow-x: hidden;
            background: var(--milk-grey);
            padding: var(--gutter-default);
        }
        .drawer-list > a {
        }
        .drawer-list > a:hover {
            background: var(--suggest-glass-color);
        }

        button {
            background: var(--standard-primary-glass-color);
            border: none;
            fill: var(--standard-header-text-color);
            cursor: pointer;
            height: var(--framed-icon-size);
            width: var(--framed-icon-size);
        }
        button:hover {
            fill: var(--suggest-color);
        }

        /*
        app-drawer:not([opened]) .drawer-list *{
            display: none;
        }
        */

        .special {
            grid-column: 5;
        }
        li {
            list-style-type: none;
        }
        a {
            text-decoration: none;
            outline: 0;
            background: var(--milk-white);
        }
        
        .bacon {
            grid-column: span 2;
            grid-row: span 2;
        }
        
        .grid {
            grid-column: span 1;
        }

        ::-webkit-scrollbar {
            width: var(--gutter-default);
        }
        ::-webkit-scrollbar-track {
            background: var(--milk-grey);
        }
        ::-webkit-scrollbar-thumb {
            background: var(--standard-primary-glass-color);
        }
        ::-webkit-scrollbar-thumb:hover {
            background: var(--standard-primary-color);
        }
    </style>
    
    <app-header-layout has-scrolling-region>
        <app-header slot="header" id="header" unresolved="true" condenses shadow reveals effects="waterfall">
            <app-toolbar>
                <button
                    on-click="${(e) => this.shadowRoot.getElementById("drawer").toggle()}"
                    title="drawer menu">
                ${iconMenu}
                </button>
                <h4 condensed-title>${APP_TITLE}</h4>
            </app-toolbar>
        </app-header>
        <slot></slot>

        <anime-animated-pages activated activate-event="activateEvent" selected="${selectedRoute}" id="views" attr-for-selected="id"
            attrForSelected="a" routeInDuration=${RAIL_SLIGHT_DELAY} routeOutDuration=${RAIL_SLIGHT_DELAY} routeDebounce=0>
            <slot name="pages" id="pages"></slot>
        </anime-animated-pages>

    </app-header-layout>

    <app-drawer id="drawer" swipe-open unresolved="true" opened="${drawerOpened}">
        <nav class="drawer-menu">
            <div>
                <button
                    on-click="${(e) => this.shadowRoot.getElementById("drawer").toggle()}"
                    title="drawer menu">
                ${iconMenu}
                </button>
            </div>
            <button>
                ${iconAccount}
            </button>
            <button>
                ${iconSettings}
            </button>
            <button class="special">
                ${iconInfo}
            </button>
        </nav>
        <nav class="drawer-list">
        ${ repeat( (routes === undefined || routes === null )? []: routes , 
                        (route) => html`
            <a class$="${route.element.id}" href$="${route.element.id}"><li>${route.element.id}</li></a>
        `)}
        </nav>
    </app-drawer>
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
        /* jshint ignore:start */
        import('../../components/anime-animation/anime-animated-pages/anime-animated-pages.js').then(() => {
            import('./ui-deferred-dependencies.js').then(() => {
                this.shadowRoot.getElementById("header").removeAttribute("unresolved");
                this.shadowRoot.getElementById("drawer").removeAttribute("unresolved");
                import('./ui-navigation-dependencies.js').then(() => {
                });
            });
            this.dispatchEvent(new CustomEvent(EVENT_RAIL_INTERACTIVE, {
                bubbles: true,
                composed: true,
                scoped: false
            }));
            performance.mark(EVENT_RAIL_INTERACTIVE);
        });
        this.addEventListener(EVENT_ANIME_PAGES_TRANSITION_START, () => {
            if(this.shadowRoot.getElementById("drawer").close) this.shadowRoot.getElementById("drawer").close();
        });
        /* jshint ignore:end */
        performance.mark('mark_boot_end');
        performance.mark(EVENT_RAIL_FIRST_PAINT);
    }

    disconnectedCallback() {
        this.removeEventListener(EVENT_ANIME_PAGES_TRANSITION_START);
    }

    _stateChanged(newState) {
        if (newState && newState.routes && newState.routes.routes.length) {
            this.routes = newState.routes.routes;
        }
        if (newState && newState.routeSelection) {
            this.selectedRoute = newState.routeSelection.selectedRoute;
        }
        if (newState && newState.ui.drawerOpened !== this.drawerOpened) {
            this.drawerOpened = newState.ui.drawerOpened;
        }
    }

    static get properties() {
        return {
            drawerOpened: {
                type: Boolean,
                reflectToAttribute: true,
            },
            routes: {
                type: Array,
            },
            selectedRoute: {
                type: String,
                value: "a",
            }
        };
    }
}

window.customElements.define('ui-manager', UiManager);