import {
    LitElement,
    html
} from '@polymer/lit-element';
import {
    Dependant
} from '../dependency-resolver/Dependant';
import {
    connect
} from 'pwa-helpers/connect-mixin';
import {
    store
} from '../../main/store';
import {
    iconMenu,
    iconAccount,
    iconSettings,
    iconInfo
} from '../../main/ui/ui-icons';
import {
    repeat
} from 'lit-html/lib/repeat';
import { updateDrawerOpened } from '../../main/ui/ui-actions';

class DrawerContent extends connect(store)(Dependant(LitElement)) {
    _render({
        drawerOpened,
        routes,
        selectedRoute,
        narrowViewport
    }) {
        return html `
        <style>
            :host([unresolved]) * {
                display: none;
            }
            :host {
                height: 100vh;
                padding: var(--gutter-default) 0px;
                width: var(--standard-drawer-width);
                display: grid;
                grid-template-rows: var(--framed-icon-size) calc(100vh - (var(--framed-icon-size) + (var(--gutter-default) * 4)) );
                grid-template-columns: var(--standard-drawer-width);
                grid-gap: var(--gutter-default);
                font-size: var(--fluid-fontsize-b);
                text-align: center;
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
                color: var(--black);
            }
            .drawer-list > a:hover {
                background: var(--standard-primary-color);
                color: var(--white);
            }

            .special {
                grid-column: 5;
            }
            li {
                list-style-type: none;
            }

            a {
                color: var(--white);
                text-decoration: none;
                outline: 0;
            }

            .drawer-list a {
                background: var(--milk-white);
            }

            .media {
                grid-column: span 2;
                grid-row: span 2;
            }

            .grid {
                grid-column: span 1;
            }

            button {
                background: var(--milk-white);
                border: none;
                fill: var(--standard-header-text-color);
                cursor: pointer;
                height: var(--framed-icon-size);
                width: var(--framed-icon-size);
            }
            button:hover {
                fill: var(--standard-primary-color);
            }
        </style>

        <nav class="drawer-menu">
            <button on-click="${(e) => store.dispatch(updateDrawerOpened(false))}"
                hidden="${!narrowViewport}"
                title="drawer menu">
                ${iconMenu}
            </button>
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
`;
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
                type: String
            },
            narrowViewport: {
                type: Boolean,
                reflectToAttribute: true,
            },
        };
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
        if (newState && newState.ui.narrowViewport !== this.narrowViewport) {
            this.narrowViewport = newState.ui.narrowViewport;
        }
    }

}
customElements.define("drawer-content", DrawerContent);