import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

export const Routable = (baseElement) => {
    return class extends baseElement {
        
        isRoutable() {
            return true;
        }

        static get properties() {
            return {
                routePath: String,
                reflectToAttribute: true
            };
        }
    };
};