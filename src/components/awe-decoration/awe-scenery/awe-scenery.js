import {
    LitElement,
    html
} from '@polymer/lit-element';
import '../../../../node_modules/animejs/anime.js';
class AweScenery extends LitElement {
    _render() {
        return html `
<style>
    .card.one {
        transform: translateX(-30vw) rotate(-20deg);
    }
    .card.two {    
        transform: translateX(-50vw) rotate(-30deg);
    }
    .card.three {
        transform: translateX(-40vw) rotate(-60deg);
    }
    .card {
        width: calc(300vw + 50vh);
        height: 100vh;
        position: absolute;
        top: 70vh;
        left: -30vw;
        background: var(--awe-card-color, white);
        transition: all 1s cubic-bezier(1.000, 0.005, 0.000, 1.000); /* custom */
        opacity: 0.7;
    }
    :host([folded]) .card {
        background: #333;
        transform: translateX(-0vw) rotate(0deg);
        opacity: 0;
    }
</style>
    <div class="card one">
    </div>
    <div class="card two">
    </div>
    <div class="card three">
    </div>
`;
    }

    static get properties() {
        return {
            folded: {
                type: Boolean,
                reflectToAttribute: true,
                value: true
            },
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.removeAttribute('unresolved');
    }
}
customElements.define("awe-scenery", AweScenery);