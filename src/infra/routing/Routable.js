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

        // connectedCallback() {
        //   // Connect the element to the store.
        //   this.__storeUnsubscribe = store.subscribe(() => this._stateChanged(store.getState()));
        //   this._stateChanged(store.getState());
        //   if (super.connectedCallback) {
        //     super.connectedCallback();
        //   }
        // }

        // disconnectedCallback() {
        //   this.__storeUnsubscribe();

        //   if (super.disconnectedCallback) {
        //     super.disconnectedCallback();
        //   }
        // }

        // // This is called every time something is updated in the store.
        // _stateChanged(state) {
        //   throw new Error('_stateChanged() not implemented', this);
        // }
    };
};