import {
  LitElement,
  html
} from '@polymer/lit-element';
import {
  setPassiveTouchGestures
} from '@polymer/polymer/lib/utils/settings.js';

import {
  installOfflineWatcher
} from 'pwa-helpers/network.js';
import {
  updateMetadata
} from 'pwa-helpers/metadata.js';
import {
  store
} from '../store.js';
import {
  updateOffline,
  updateDrawerState,
  updateLayout
} from '../actions/app.js';

class ShellApp extends LitElement {
  _render() {
    return html`
<style>
</style>
<dependency-resolver>
  <network-service id="network-service"></network-service>
  <routing-service id="routing-service"></routing-service>
  <ui-root id="ui-root">
    <my-view1 class="page" slot="pages" routePath="asda" componentUri="asdasd"></my-view1>
  </ui-root>
</dependency-resolver>
`;
  }

  constructor() {
    super();
    // To force all event listeners for gestures to be passive.
    // See https://www.polymer-project.org/2.0/docs/devguide/gesture-events#use-passive-gesture-listeners
    setPassiveTouchGestures(true);
  }

  _firstRendered() {
    /* jshint ignore:start */
    import('../infra/dependency-resolver/dependency-resolver.js').then(() => {});
    import('../infra/routing/routing-service.js').then(() => {
      import('../infra/ui/ui-root.js').then(() => {});
    });
    /* jshint ignore:end */
  }
}

window.customElements.define('shell-app', ShellApp);