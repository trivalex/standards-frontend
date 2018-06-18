export const APP_TITLE = "Shell App";
import "../components/awe-decoration/awe-loading-indicator/awe-loading-indicator.js";
class ShellApp extends HTMLElement {
  constructor() {
    super();
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `<dependency-resolver><routing-service></routing-service><ui-root></ui-root></dependency-resolver>`;
    let shadowRoot = this.attachShadow({
      mode: 'open'
    });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
    /* jshint ignore:start */
    import('../components/dependency-resolver/dependency-resolver.js').then(() => {
      import('../main/ui/ui-root.js');
    });
    import('../domain/hello-world/initial-page.js');
    import('../components/anime-animation/anime-animated-pages/anime-animated-pages.js');
    /* jshint ignore:end */
  }
}

window.customElements.define('shell-app', ShellApp);