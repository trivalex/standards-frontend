import {
    LitElement,
    html
} from '@polymer/lit-element';
import { UiPage } from '../main/ui/UiPage';

class AnotherPage extends UiPage(LitElement) {
    _render() {
        return html `
        <style>
            :host([unresolved]) * {
                display: none;
            }

            :host>div {
                display: grid;
                grid-template-columns: auto;
                grid-gap: var(--gutter-default);
                padding: var(--content-padding);
                font-size: var(--fluid-fontsize-d);
            }
        </style>
        <div>
        Another Page
        </div>
`;
    }
}
customElements.define("another-page", AnotherPage);