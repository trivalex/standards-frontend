export const AnimatablePage = (superClass) => {

    return class extends superClass {

        static get properties() {
            return {
                _entryAnimation: {
                    type: String,
                    notify: true,
                    reflectToAttribute: true,
                    value: 'fade-in-animation'
                },
                _exitAnimation: {
                    type: String,
                    notify: true,
                    reflectToAttribute: true,
                    value: 'fade-out-animation'
                }
            };
        }

        /**
         * Can be called when a page is navigated towards.
         * @return {void}
         */
        transitionInCallback() {}


        /**
         * Can be called when a page is navigated away from.
         * @return {void}
         */
        transitionOutCallback() {}
    };
};
