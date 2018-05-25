import {
    LitElement,
    html
} from '@polymer/lit-element';
import {
    installMediaQueryWatcher
} from 'pwa-helpers/media-query.js';
import './ui-manager.js';
import { ShellAppTheme } from '../../../design/theme.js';

window.dynamicstyle.innerHTML = `html { ${ShellAppTheme} }`;
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

        --bit-color: var(var(--bit-color), white);
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
    <nav class="toolbar-list">
    </nav>

    <nav class="drawer-list">
    </nav>

    <slot slot="pages" name="pages" id="pages">
    </slot>

    <footer>
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
        /* jshint ignore:start */
        import('./ui-manager.js').then(() => {
            import('../../components/bits-animation.js').then(() => {});
            import('../../components/initial-view.js').then(() => {});
            import('../../../design/theme.js').then(() => {});
        });
        /* jshint ignore:end */
    }
}

window.customElements.define('ui-root', UiRoot);