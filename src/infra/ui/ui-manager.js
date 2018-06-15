import {
    LitElement,
    html
} from '@polymer/lit-element';
import {
    Dependant
} from '../dependency-resolver/Dependant';
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
} from '../../store';
import {
    routes,
    routeSelection
} from '../routing/routing-reducer';
import {
    ui
} from './ui-reducer';
import { EVENT_ANIME_PAGES_TRANSITION_START } from '../../components/anime-animated-pages';
import { EVENT_RAIL_INTERACTIVE } from '../rail-performance-model';
store.addReducers({
    routes,
    routeSelection,
    ui
});

class UiManager extends connect(store)(Dependant(LitElement)) {

    _render({
        drawerOpened,
        ready,
        routes,
        selectedRoute
    }) {
        return html `
    <style>
        [unresolved="true"] {
            opacity: 0;
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
            background-color:  var(--view-primary-glass-color);
            color: var(--app-header-text-color);
            border-bottom: 1px solid var(--milk-white);
            min-height: var(--header-height);
            z-index: 2000;
            opacity: 1;
            transition-property: opacity;
            transition-duration: .5s;
            font-size:var(--fluid-fontsize-b);
        }

        app-drawer {
            z-index: 3000;
            top: 0px;
            --app-drawer-scrim-background: var(--milk-grey);
            --app-drawer-content-container: {
                background-color: var(--view-primary-glass-color);
                height: 100vh;
                padding: var(--gutter-default) 0px;
                width: var(--app-drawer-width);
                display: grid;
                grid-template-rows: var(--framed-icon-size) calc(100vh - (var(--framed-icon-size) + (var(--gutter-default) * 4)) );
                grid-template-columns: var(--app-drawer-width);
                grid-gap: var(--gutter-default);
                font-size: var(--fluid-fontsize-c);
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
        .drawer-menu > div {
            background: var(--milk-white);
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
        ::-webkit-scrollbar {
            width: var(--gutter-default);
        }
        ::-webkit-scrollbar-track {
            background: var(--milk-grey);
        }
        ::-webkit-scrollbar-thumb {
            background: var(--view-primary-glass-color);
        }
        ::-webkit-scrollbar-thumb:hover {
            background: var(--view-primary-color);
        }
    </style>
    <app-header id="header" unresolved="true" condenses reveals>
        <div>
            <div main-title>${APP_TITLE} ${ready}</div>
        </div>
    </app-header>
    <app-drawer id="drawer" swipe-open unresolved="true" opened="${drawerOpened}">
        <nav class="drawer-menu">
            <div></div>
            <div></div>
            <div></div>
            <div class="special">*</div>
        </nav>
        <nav class="drawer-list">
        ${ repeat( (routes === undefined ||routes === null )? []: routes , 
                        (i) => html`
        <a href="${i.routePath}"><li>${i.routePath}</li></a>
        `)}
        </nav>
    </app-drawer>
    <slot></slot>

    <anime-animated-pages activated activate-event="activateEvent" selected="${selectedRoute ||"a"}" id="views" attr-for-selected="routePath"
        fallback-selection="a" route-in-duration=500 route-out-duration=500>
        <slot name="pages" id="pages"></slot>
    </anime-animated-pages>
`;
    }

    _wireDependencies() {
        /* jshint ignore:start */
        import("../../infra/routing/routing-service.js").then(() => {
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

        import('../../components/anime-animated-pages.js').then(() => {});
        import('./ui-deferred-dependencies.js').then(() => {
            this.shadowRoot.getElementById("header").removeAttribute("unresolved");
            this.shadowRoot.getElementById("drawer").removeAttribute("unresolved");
            let interactiveEvent = new CustomEvent(EVENT_RAIL_INTERACTIVE, {
                bubbles: true,
                composed: true,
                scoped: false
            });
            this.dispatchEvent(interactiveEvent);
        });
        this.addEventListener(EVENT_ANIME_PAGES_TRANSITION_START, () => {
            if(this.shadowRoot.getElementById("drawer").close) this.shadowRoot.getElementById("drawer").close();
        });
        /* jshint ignore:end */
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
            ready: Boolean,
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