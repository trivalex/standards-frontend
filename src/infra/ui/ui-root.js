import {
    LitElement,
    html
} from '@polymer/lit-element';
class UiRoot extends LitElement {
    _render() {
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
        import('../../components/initial-view.js').then(() => {
            import('../../components/bits-animation.js');
            import('./ui-manager.js').then(() => {});
        });
        /* jshint ignore:end */
    }
}

window.customElements.define('ui-root', UiRoot);