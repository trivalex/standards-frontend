class ShellApp extends HTMLElement {
  constructor() {
    super();
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `<dependency-resolver><network-service></network-service><routing-service></routing-service><ui-root></ui-root></dependency-resolver>`;
    let shadowRoot = this.attachShadow({      mode: 'open'    });
    shadowRoot.appendChild(tmpl.content.cloneNode(true));
    /* jshint ignore:start */
    import('../infra/dependency-resolver/dependency-resolver.js').then(() => {
      import('../infra/ui/ui-root.js').then(() => {});
    });
    /* jshint ignore:end */
  }
}
window.customElements.define('shell-app', ShellApp);