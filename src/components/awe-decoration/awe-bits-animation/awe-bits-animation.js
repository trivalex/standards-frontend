import {
    LitElement,
    html
} from '@polymer/lit-element';
import {
    timeOut
} from '@polymer/polymer/lib/utils/async.js';
import '../../node_modules/animejs/anime.js';

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
            duration: dura
        }, {
            value: 0,
            delay: (dura - (dura / 6))
        }],
        easing: 'easeInSine'
    };
};

class AweBitsAnimation extends LitElement {
    _render() {
        return html `
<style>
:host {
    width: inherit;
    height: inherit;
}
#bits {
    width: inherit;
    height: inherit;
    align-items: flex-end;
    display: flex;
    justify-content: space-between;
    @apply --bits-container;
}
.bit {
    min-width: var(--bit-size, --gutter-default);
    min-height: var(--bit-size, --gutter-default);
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
                value: 0
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

        if (this.justAnimate) {
            let animateTask = timeOut
                .after(100);
            animateTask.run(() => {
                this.flame();
            });
        }
    }

    flame() {
        if (this.animate) {
            let bitsContainer = this.shadowRoot.getElementById("bits");
            let bitHeight = Math.floor(parseInt(getComputedStyle(document.body).getPropertyValue(
                '--bit-size'))) || Math.floor(parseInt(getComputedStyle(document.body).getPropertyValue(
                '--gutter-default')));
            let height = bitsContainer.offsetHeight;

            if (this.maxBitsCount < 1)  {
                let tmp = Math.round(parseInt(height / bitHeight));
                this.maxBitsCount = (tmp < 4) ? 4 : tmp;
            }

            
            const sparkCall = (bit, height) => {
                this.spark(bit, height);
            };

            for (let i = 0; i < this.maxBitsCount; i++) {
                let bit = document.createElement("div");
                bit.classList.add("bit");
                bit.id = i;

                bitsContainer.appendChild(bit);
                let sparkTask = timeOut.after(10);
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
customElements.define("awe-bits-animation", AweBitsAnimation);