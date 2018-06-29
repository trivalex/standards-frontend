export const APP_TITLE = "Shell App";
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
    import('../components/dependency-resolver/dependency-resolver.js');
    import('../main/ui/ui-root.js');
    import('../../design/design.js');

    let fp = `../pages/${window.location.pathname.replace('/', '')}-page.js`;
    import(fp);
    this.removeAttribute('unresolved');
    /* jshint ignore:end */
  }
}

window.customElements.define('shell-app', ShellApp);