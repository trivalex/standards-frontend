import {
    Routable
} from '../routing/Routable.js';

export const UiRoutable = (baseElement) => class extends Routable(baseElement) {
    static get properties() {
        return {
            componentUri: String,
        };
    }
};