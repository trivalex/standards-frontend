import {
    html,
    LitElement
} from '@polymer/lit-element';
import {
    timeOut
} from '@polymer/polymer/lib/utils/async.js';
import '../../../../node_modules/animejs/anime.js';
import { RAIL_SLIGHT_DELAY } from '../../rail-performance/rail-performance-model.js';
class AweLoadingIndicator extends LitElement {
    _render() {
        return html `
<style>
    :host {
        perspective: 250px;
        --awe-li-size: var(--awe-li-size, 100px);
    }
    #first {
        width: var(--awe-li-size);
        height: var(--awe-li-size);
        transform-style: preserve-3d;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        transform:  rotateY(45deg);
    }
    .side {
        position: absolute;
        width: var(--awe-li-size);
        height: var(--awe-li-size);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .side div {
        height: 25%;
        opacity: 0.7;
        margin: 1px;
        background-color: var(--awe-li-bg-color, rgba(255, 255, 255, 0.2)) ;
    }
    .side div.color-a {
        background-color: var(--awe-li-color-a, red);
    }
    .side div.color-b {
        background-color: var(--awe-li-color-b, white);
    }
    .back {
        transform: translateZ(calc((var(--awe-li-size) - (var(--awe-li-size) * 2 )) / 2));
    }
    .left {
        transform: translateX(calc((var(--awe-li-size) - (var(--awe-li-size) * 2 )) / 2)) rotateY(90deg);
    }
    .top {
        margin: 1%;
        transform: translateY(calc((var(--awe-li-size) - (var(--awe-li-size) * 2 )) / 2)) rotateX(90deg);
    }
    .right {
        transform: translateX(calc(var(--awe-li-size) / 2)) rotateY(90deg);
    }
    .bottom {
        margin: 1%;
        transform: translateY(calc(var(--awe-li-size) / 2)) rotateX(90deg);
    }
    .front {
        transform: translateZ(calc(var(--awe-li-size) / 2));
    }
</style>
<div id="first">
    <div class="side back">
    </div>
    <div class="side left">
    </div>
    <div class="side right">
    </div>
    <!-- <div class="side top">
    </div> -->
    <!-- <div class="side bottom">
    </div> -->
    <div class="side front">
    </div>
</div>
`;
    }

    static get properties() {
        return {
            animate: {
                type: Boolean,
                reflectToAttribute: true
            },
            rows: {
                type: Number,
                reflectToAttribute: true,
                notify: true,
                value: 3
            },
            bitsPerRow: {
                type: Number,
                reflectToAttribute: true,
                notify: true,
                value: 4
            },
        };
    }

    connectedCallback() {
        super.connectedCallback();
        timeOut.after(50).run(() => {
            this._hydrateDOM(this.shadowRoot.getElementById("first"), this.rows, "first");
        });
        this.removeAttribute('unresolved');
    }

    _hydrateDOM(rootNode, rows, place) {
        rootNode.id = place;
        Array.from(rootNode.children).forEach(element => {
            if (!element.classList.contains("bottom") && !element.classList.contains("top")) {
                for (let i = 0; i < rows; i++) {
                    let div = document.createElement("div");
                    element.appendChild(div);
                    this.loadAnimation(div, true);
                }
            }
        });
    }

    loadAnimation(div, repeat) {
        let t = ((Math.random() * RAIL_SLIGHT_DELAY)),
            a = anime({
                targets: div,
                delay: t,
                width: [{
                    value: "0px",
                }, {
                    value: "100%",
                    duration: t,
                }, ],
                opacity: [{
                        value: 0,
                    },
                    {
                        value: 0.7,
                        duration: t,
                    }
                ],
                easing: 'linear'
            }).finished;

        a.then((anim) => {
            if (this.animate === true && repeat) {
                this.loadAnimation(div, repeat);
                return;
            }
            if (repeat) {
                setTimeout(() => {
                    if (div.parentNode.classList.contains("left") || div.parentNode.classList.contains("right")) {
                        div.classList.add("color-a");
                    }
                    if (div.parentNode.classList.contains("back") || div.parentNode.classList.contains("front")) {
                        div.classList.add("color-b");
                    }
                    this.loadAnimation(div, false);
                }, 500);
            }
        });
    }

    disconectedCallback() {
        this.shadowRoot.getElementById("cube").children = new HTMLCollection();
    }
}
customElements.define("awe-loading-indicator", AweLoadingIndicator);