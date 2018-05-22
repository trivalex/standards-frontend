import {
    LitElement,
    html
} from '@polymer/lit-element';
import {
    timeOut
} from '@polymer/polymer/lib/utils/async.js';
import '../../node_modules/animejs/anime.js';
import { ShellAppTheme } from '../../design/theme.js';

const bitFlameAnimation = (el, dura, heigd) => {
    return {
        targets: el,
        opacity: [{
            value: 0.0,
        }, {
            value: 0.7,
            duration: (dura - (dura / 6))
        }, {
            value: 0.0,
            duration: (dura / 6)
        }],
        translateY: [{
            value: 0 - heigd,
            duration: dura,
        }, {
            value: 0,
            delay: (dura - (dura / 6))
        }],
        easing: 'easeInSine'
    };
};

class BitsAnimation extends LitElement {
    _render() {
        return html `
<style>
:host {
    width: inherit;
    height: inherit;
    position: absolute;
    ${ShellAppTheme}
}
#bits {
    width: inherit;
    height: inherit;
    align-items: flex-end;
    display: flex;
    position: absolute;
    justify-content: space-between;
    @apply --bits-container;
}
.bit {
    min-width: var(--bit-size, 8px);
    max-width: var(--bit-size, 8px);
    min-height: var(--bit-size, 8px);
    max-height: var(--bit-size, 8px);
    background-color: var(--bit-color, black);
    opacity: 0;
}
</style><div id="bits"></div>
`;
    }

    static get properties() {
        return {
            maxBitsCount: {
                type: Number,
                notify: true,
                reflectToAttribute: true,
                value: 5
            },
            animate: {
                type: Boolean,
                reflectToAttribute: true
            },
            justAnimate: {
                type: Boolean,
                reflectToAttribute: true
            },
            duration: {
                type: Number,
                reflectToAttribute: true
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();

        if (this.routeKey !== undefined) {
            this.dispatchEvent(new CustomEvent('register-nav-element-animator', {
                detail: {
                    routeKey: this.routeKey,
                    animator: this
                },
                bubbles: true,
                composed: true,
                scoped: false
            }));
        }

        if (this.justAnimate) {
            let animateTask = timeOut
                .after(1000);
            animateTask.run(() => {
                this.animateToNav();
            });
        }
    }

    animateToNav() {
        this.animate = true;
        this.flame();
    }

    cancleAnimateToNav() {
        this.animate = false;
    }

    flame() {
        if (this.animate) {
            let bitsContainer = this.shadowRoot.getElementById("bits");
            let bitHeight = getComputedStyle(document.body).getPropertyValue(
                '--bit-size').replace("px", "");
            if (bitHeight === 0 || bitHeight === undefined) bitHeight = 8;
            let height = bitsContainer.offsetHeight - bitHeight;
            let bitCount = this.maxBitsCount;

            const sparkCall = (bit, height) => {
                this.spark(bit, height);
            };

            for (let i = 0; i < bitCount; i++) {
                let bit = document.createElement("div");
                bit.classList.add("bit");
                bit.id = i;



                bitsContainer.appendChild(bit);
                let sparkTask = timeOut
                    .after(10);
                sparkTask.run(sparkCall(bit, height));
            }
        }
    }

    spark(bit, height) {
        if (this.animate) {
            let duration = (Math.random() * (this.duration - 500) + 500);

            if (!document.hidden) {
                anime(bitFlameAnimation(bit, duration, height));
            }

            let sparkTask = timeOut.after(
                duration + (Math.random() * ((this.duration * 3) - 500) + 500 * 2));
            sparkTask.run(() => {
                this.spark(bit, height);
            });
        }
    }
}
customElements.define("bits-animation", BitsAnimation);