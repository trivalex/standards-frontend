import {
    LitElement,
    html
} from '@polymer/lit-element';
import {
    installMediaQueryWatcher
} from 'pwa-helpers/media-query.js';

import './ui-manager.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-scroll-effects/effects/waterfall.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
// import {
//     menuIcon
// } from '../../components/my-icons.js';
// import '../../components/snack-bar.js';
import {
    ShellAppTheme
} from '../../../design/theme.js';
import '../../components/bits-animation.js';
import '../../components/initial-view.js';

/**
 * Component platform for components that deal with visual context, or enrich the browsers render tree.
 */
class UiRoot extends LitElement {
    _render() {
        // Anything that's related to rendering should be done in here.
        return html `
<style>
    :host {
        overflow: hidden;
        display: block;
        position: fixed;
        
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;

        background-color: var(--app-tertiary-color);

        ${ShellAppTheme}
    }

    :host> ::slotted(*) {
        width: 100%;
        height: 100%;
    }
    bits-animation {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0px;

        --bit-color: var(--white);
        --bit-size: 24px;
    }

    initial-view {
        display: block;
        position: fixed;
        top: 0px;
    }
</style>
<bits-animation justAnimate duration="1000" maxBitsCount=20></bits-animation>
<initial-view justAnimate></initial-view>
<ui-manager id="ui-manager">
    <!-- Header -->
    <!-- This gets hidden on a small screen-->
    <nav class="toolbar-list">
    </nav>

    <!-- Drawer content -->
    <nav class="drawer-list">
    </nav>

    <slot slot="pages" name="pages" id="pages">
    </slot>

    <footer>
    <!-- <p>Made with &lt;3 by the Polymer team.</p> -->
    </footer>
</ui-manager>
    `;
    }

    static get properties() {
        return {};
    }

    constructor() {
        super();
    }

    _firstRendered() {
        // var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        // var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        /* jshint ignore:start */
        // installMediaQueryWatcher(`(min-width: ${MAX_VH_512PX}px)`,
        //     (matches) =>
        //     this.dynamicTheme = importDynamicStyle("../../../design/max512px.js"));
        //     // import("../../../design/max512px.js").then(() => { this.dynamicTheme = importDynamicStyle}));

        // installMediaQueryWatcher(`(max-width: ${MAX_VH_768PX}px)`,
        //     (matches) =>
        //     this.dynamicTheme = importDynamicStyle("../../../design/max768px.js"));
        //     // import("../../../design/max768px.js").then(() => {this.dynamicTheme = max768px}));

        // installMediaQueryWatcher(`(max-width: ${MAX_VH_1200PX}px)`,
        //     (matches) =>
        //     this.dynamicTheme = importDynamicStyle("../../../design/max1200px.js"));
        //     // import("../../../design/max1200px.js").then(() => {this.dynamicTheme = max1200px}));

        // installMediaQueryWatcher(`(max-width: ${MAX_VH_1800PX}px)`,
        //     (matches) =>
        //     this.dynamicTheme = importDynamicStyle("../../../design/max1800px.js"));
        //     // import("../../../design/max1800px.js").then(() => {this.dynamicTheme = max1800px}));

        // installMediaQueryWatcher(`(max-width: ${MAX_VH_MAXPX}px)`,
        //     (matches) =>
        //     this.dynamicTheme = importDynamicStyle("../../../design/maxPx.js"));
        //     // import("../../../design/maxPx.js").then(() => {this.dynamicTheme = maxPx}));

        import('./ui-manager.js').then(() => {});
        /* jshint ignore:end */
    }
}

window.customElements.define('ui-root', UiRoot);