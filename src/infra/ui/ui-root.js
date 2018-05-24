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

    bits-animation {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0px;

        --bit-color: var(--white);
        --bit-size: var(--icon-button-size);
    }

    initial-view {
        position: fixed;
        background: var(--test-color-a);
        transition: background-color 0.5s ease;
    }
</style>
<bits-animation justAnimate duration="1000" maxBitsCount=20></bits-animation>
<initial-view justAnimate></initial-view>
<ui-manager id="ui-manager">
</ui-manager>
    `;
    }

    static get properties() {
        return {};
    }

    constructor() {
        super();
        /* jshint ignore:start */
        import('../../components/initial-view.js').then(() => {
            import('../../components/bits-animation.js');
            import('./ui-manager.js').then(() => {});
        });
        /* jshint ignore:end */
    }

    _firstRendered() {
        window.performance.mark('mark_boot_end');
        window.performance.mark('mark_first_paint');
    }
}

window.customElements.define('ui-root', UiRoot);