import {
    LitElement,
    html
} from '@polymer/lit-element';
import {
    timeOut
} from '@polymer/polymer/lib/utils/async.js';
import '../../node_modules/animejs/anime.js';
import {
    ShellAppTheme
} from '../../design/theme.js';

const appear = (el, dura, color, size) => {
    return {
        targets: el,
        duration: dura,
        opacity: [{
            value: 0.0,
        }, {
            value: 0.7,
        }],
        width: [{
            value: 0.0,
        }, {
            value: `${size}vw`,
        }],
        height: [{
            value: 0.0,
        }, {
            value: `${size}vh`,
        }],
        top: [{
            value: `${(50 - (size / 2))}vh`,
            duration: 0
        }],
        left: [{
            value: `${(50 - (size / 2))}vw`,
            duration: 0
        }],
        backgroundColor: color,
        easing: 'linear',
        loop: false
    };
};
class InitialView extends LitElement {
    _render() {
        return html`
<style>
:host {
    position: absolute;
    background-color: var(--app-secondary-color);
    ${ShellAppTheme}
}
:host> ::slotted(*) {
    width: 100%;
    height: 100%;
}

bits-animation {
    --bit-color: white;
    --bit-size: 24px;
    width: 100%;
    height: 100%;
}
</style>
`;
    }
    static get properties() {
        return {
            justAnimate: Boolean
        };
    }

    connectedCallback() {
        super.connectedCallback();

        let _loadAnimation = anime(appear(this, 500, getComputedStyle(document.body).getPropertyValue(
            '--warn-color'), 30)).complete = (() => {
            _loadAnimation = anime({
                targets: this,
                rotate: {
                    duration: 500,
                    delay: 500,
                    value: 90,
                    easing: "linear"
                },
                top: {
                    value: `${(50 - (30 / 2))}vw`,
                    duration: 0
                },
                left: {
                    value: `${(50 - (30 / 2))}vw`,
                    duration: 0
                },
                duration: 2000,
                loop: true
            });
        });
        let sparkTask = timeOut.after(
            1000);
        sparkTask.run(() => {
            _loadAnimation.pause();
            anime({
                targets: this,
                width: {
                    value: `100vw`,
                    easing: 'linear',
                    duration: 2000
                },
                height: {
                    value: `100vh`,
                    easing: 'linear',
                    duration: 2000
                },
                top: [{
                    value: `${(50 - (30 / 2))}vw`,
                    duration: 0
                }, {
                    value: 0,
                    duration: 100
                }],
                left: [{
                    value: `${(50 - (30 / 2))}vw`,
                    duration: 0
                }, {
                    value: 0,
                    duration: 100
                }, ],
                loop: false,
                easing: 'linear',
                rotate: {
                    value: 0,
                    duration: 100,
                    easing: 'linear',
                },
                duration: 2000
            });

            const interactiveEvent = new CustomEvent("rail-interactive", {
                bubbles: true,
                composed: true
            });
    
            this.dispatchEvent(interactiveEvent);
        });
    }
}
customElements.define("initial-view", InitialView);