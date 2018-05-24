import {
    LitElement,
    html
} from '@polymer/lit-element';
import {
    timeOut
} from '@polymer/polymer/lib/utils/async.js';
import '../../node_modules/animejs/anime.js';
import {
    ShellAppTheme,
    centerVertical,
    centerHorizontal
} from '../../design/theme.js';

const appear = (el, dura, color, size) => {
    return {
        targets: el,
        duration: dura,
        opacity: [{
            value: 0.0,
            duration: 0
        }, {
            value: 0.7,
            duration: dura
        }],
        width: [{
            value: `${window.getComputedStyle(document.body).getPropertyValue('--viewport-xsmall')} `,
        }],
        height: [{
            value: `${window.getComputedStyle(document.body).getPropertyValue('--viewport-xsmall')} `,
        }],
        top: {
            value: centerVertical(window.getComputedStyle(document.body).getPropertyValue('--viewport-xsmall').replace("px", "")) + "px",
            duration: 0
        },
        left: {
            value: centerHorizontal(window.getComputedStyle(document.body).getPropertyValue('--viewport-xsmall').replace("px", "")) + "px",
            duration: 0
        },
        easing: 'linear',
        loop: false
    };
};
class InitialView extends LitElement {
    _render() {
        return html `
<style>
:host {
    position: absolute;
    ${ShellAppTheme}
}

bits-animation {
    --bit-color: var(--white, white);
    --bit-size: 24px;
    width: 100%;
    height: 100%;
}
</style>
`;
    }

    connectedCallback() {
        super.connectedCallback();
        window.onresize();
        window.performance.mark('mark_interactive');

        let _loadAnimation = anime(appear(this, 300, getComputedStyle(document.body).getPropertyValue(
            '--white'), 30)).complete = (() => {
            _loadAnimation = anime({
                targets: this,
                rotate: {
                    duration: 500,
                    delay: 500,
                    value: 90,
                    easing: "linear",
                },
                top: {
                    value: "auto",
                    duration: 0
                },
                left: {
                    value: "auto",
                    duration: 0
                },
                loop: true,
                complete: (anim) => {
                    anim.loop = false;
                    anim.pause();
                    anime({
                        targets: this,
                        rotate: {
                            value: 0,
                            duration: 200,
                            easing: "linear"
                        },
                        loop: false,
                    });
                }
            });
        });
        let sparkTask = timeOut.after(
            500);
        sparkTask.run(() => {
            _loadAnimation.complete(_loadAnimation);
            anime({
                targets: this,
                width: [{
                    value: "100vw",
                    duration: 0
                }],
                height: [{
                    value: "100vh",
                    duration: 0
                }],
                top: [{
                    value: 0,
                    duration: 100
                }],
                left: [{
                    value: 0,
                    duration: 100
                }],
                loop: false,
                easing: 'linear'
            });
            this.setAttribute('unresolved', false);
            this.dispatchEvent(new CustomEvent('rail-interactive', {
                bubbles: true,
                composed: true,
                scoped: false
            }));
            window.onresize();
        });
    }
}
customElements.define("initial-view", InitialView);