export const Routable = (baseElement) => {
    return class extends baseElement {
        
        isRoutable() {
            return true;
        }

        static get properties() {
            return {
                routePath: String,
                componentUri: String,
            };
        }
    };
};