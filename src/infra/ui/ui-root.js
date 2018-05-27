import {
    LitElement,
    html
} from '@polymer/lit-element';
class UiRoot extends LitElement {
    _render(props) {
        return html `
<style>
    :host {
        display: block;
        position: fixed;
        
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;

        background-color: var(--app-tertiary-color);
        color: black;
        font-family: 'Montserrat', sans-serif;

        -webkit-overflow-scrolling: auto;
        position: relative;
        max-width: -webkit-fit-available;
    }

    bits-animation {
        position: fixed;
        width: 100%;
        height: 100%;
        --bit-color: var(--white);
        --bit-size: calc(var(--small-card-size) / 4);
    }

    tri-loading-indicator {
        position: fixed;
        --tri-li-size: var(--small-card-size);
        --tri-li-bg-color: var(--critical-color);
        left: calc(50vw - var(--small-card-size) / 2);
        top: calc(50vh  - var(--small-card-size) / 2);
        z-index: 1000;
        transition: top 1s ease-out;
        transition: opacity 1s ease-out;
    }

     tri-loading-indicator[interactive="true"] {
        left: var(--gutter-double);
        top: var(--gutter-double);
        --tri-li-size: var(--icon-size);
    }
    
    tri-loading-indicator[unresolved] {
        --tri-li-size: var(--icon-size);
        opacity: 0;
    }

    initial-view[ready] {
        -webkit-align-self: center;
        align-self: center;
        left: calc(50% - ((var(--content-max-width) / 2) + var(--content-margin)));
        -webkit-animation:presentpage 0.5s ease-out;
        -moz-animation:presentpage 0.5s ease-out;
        animation:presentpage 0.5s ease-out;
        opacity: 1;
        background: var(--milk-white);
        display: block;
        position: absolute;

        margin-left: var(--content-margin);
        margin-right: var(--content-margin);
        margin-top: var(--gutter-double);
        margin-bottom: var(--gutter-double);
        padding: var(--gutter-half);
        width: var(--content-max-width);
        max-width: var(--content-max-width);
        min-height: calc(100% - var(--gutter-double));
    }

    initial-view[unresolved] {
        padding: 0px;
        margin: 0px;
    }
    initial-view {
        display: block;
        position: absolute;
        -webkit-transition: all 0.5s ease-out;
        -moz-transition: all 0.5s ease-out;
        -o-transition: all 0.5s ease-out;
        transition: all 0.5s ease-out;
        display: block;
        position: absolute;
    }

    initial-view[loading] {
        left: calc(50% - (var(--small-card-size) / 2));
        top: calc(50% - (var(--small-card-size) / 2));
        transition: background-color 1s ease-out;
        opacity: 0.5;
    }
</style>
<tri-loading-indicator unresolved animate="${props.interactive === false}" rows=4 bitsPerRow=4></tri-loading-indicator>
<!-- <bits-animation justAnimate duration="1000" maxBitsCount=20></bits-animation> -->
<initial-view></initial-view>
<ui-manager id="ui-manager">
</ui-manager>
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
        import('../../../design/theme.js').then(() => {
            import('../../components/initial-view.js').then(() => {
                import('../../components/tri-loading-indicator.js').then(() => {
                    import('../../components/bits-animation.js');
                    import('./ui-manager.js');
                });
            });
        });;
        
        this.addEventListener('rail-interactive', () => {
            this.interactive = true;
            this.setAttribute("interactive", true);
        });
        /* jshint ignore:end */
    }

    _firstRendered() {
        performance.mark('mark_boot_end');
        performance.mark('mark_first_paint');
    }
}

customElements.define('ui-root', UiRoot);