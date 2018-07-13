import {
    LitElement,
    html
} from '@polymer/lit-element';
import { UiPage } from '../main/ui/UiPage';

class GridPage extends UiPage(LitElement) {
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

            div * {
                background-color: var(--standard-primary-glass-color);
                height: var(--framed-icon-size);
            }
        </style>
        <div>
            <div></div><div></div>
            <div></div><div></div>
            <div></div><div></div>
            <div></div><div></div>
            <div></div><div></div>
            <div></div><div></div>
            <div></div><div></div>
            <div></div><div></div>
        </div>
`;
    }
}
customElements.define("grid-page", GridPage);