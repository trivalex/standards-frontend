import { timeOut } from '@polymer/polymer/lib/utils/async.js';
import { EVENT_ANIME_PAGES_TRANSITION_END } from './anime-animated-pages';
export const AnimatablePage = (superClass) => {

    return class extends superClass {

        static get properties() {
            return {
                childPage: {
                    type: String,
                    reflectToAttribute: true,
                    value: 'loading'
                },
                routeKey: {
                    type: String,
                    reflectToAttribute: true
                },
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
         * @see https://developer.mozilla.org/en-US/docs/Web/Web_Components/Custom_Elements
         */
        connectedCallback() {
            super.connectedCallback();

            if (this.shadowRoot.getElementById("pages")) {
                this.shadowRoot.getElementById("pages").addEventListener(
                    EVENT_ANIME_PAGES_TRANSITION_END,
                    this.runRouteInAnimations.bind(this)
                );
            }
            // this.set('childPageData.page', this.routeKey);
            // this.set('page', this.routeKey);
            // this.set('childPageData.page', 'loading');
            // this.set('page', 'loading');
        }


        transitionEnd() {
            let task = timeOut.after(50);
            task.run(() => {
                this.set('childPageData.page', this.routeKey);
                this.set('childPage', this.routeKey);
            });
        }


        /**
         * Lifecycle callback that implements this pages internal transitions.
         * 
         * Example: This can be used when a page is navigatet towards, to achieve
         * a transition of subpages after the pages own transition. 
         * @return {void}
         */
         routeInit() {
            this._entryAnimation = 'fade-in-animation';
            this._exitAnimation = 'fade-out-animation';
            this.set('childPageData.page', 'loading');
            this.set('childPage', 'loading');
        }

        /**
         * Lifecycle callback that implements this pages internal transitions.
         * 
         * Example: This can be used when a page is navigatet away from, to achieve
         * a transition of subpages after the pages own transition. 
         * @return {void}
         */
        routeEnd() {
            // this._entryAnimation = 'fade-in-animation';
            // this._exitAnimation = 'fade-out-animation';
            // this.set('childPageData.page', 'loading');
            // this.set('childPage', 'loading');
            // progressive enhancement secure
            // if (typeof this.runRouteEndAnimations === 'function') {
            this.runRouteEndAnimations();
            // }
        }

        /**
         * Polymorfic method for page component creation.
         * 
         * Gets called when a page is navigated towards.
         * @return {void}
         */
        runRouteInAnimations() {}


        /**
         * Polymorfic method for page component creation.
         * 
         * Gets called when a page is navigated away from.
         * @return {void}
         */
        runRouteEndAnimations() {}
    };
}
