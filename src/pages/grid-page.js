import {
    LitElement,
    html
} from '@polymer/lit-element';
import { UiPage } from '../main/ui/UiPage';

class GridView extends UiPage(LitElement) {
    _render({}) {
        return html `
        <style>
            :host([unresolved]) *{
                display: none;
            }
            :host>div {
                width: -webkit-fill-available;
                height: auto;
                display: grid;
                grid-template-rows: var(--framed-icon-size);
                grid-template-columns: auto;
                grid-gap: var(--gutter-default);
                padding: var(--content-padding);
                max-width: calc(var(--content-max-width) - var(--gutter-double));
                font-size: var(--fluid-fontsize-d);
            }

            div * {
                background-color: var(--standard-primary-glass-color);
                height: var(--framed-icon-size);
            }
        </style>
        <div>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
        </div>
`;
    }
}
customElements.define("grid-page", GridView);