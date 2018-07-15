export const APP_TITLE = "TVD-Web Standards";

/**
 * Compositional platform for the application architecture.
 */
class ShellApp extends HTMLElement {
  constructor() {
    super();
    let tmpl = document.createElement('template');
    tmpl.innerHTML = `
    <style>
        .page {
            position: absolute;
            z-index: 100;
            opacity: 0;
            margin-top: calc(var(--standard-header-height) + var(--content-margin));

            -webkit-align-self: center;
            align-self: center;
            left: calc(var(--content-left) + var(--content-margin));
            background: var(--milk-white);

            margin-left: var(--content-margin);
            margin-right: var(--content-margin);
            margin-bottom: var(--content-margin);
            width: var(--content-max-width);
            max-width: var(--content-max-width);
            min-height: calc(100vh - (var(--standard-header-height) + var(--content-margin) * 2));
            transition: opacity 0.3s ease-out;
        }
    </style>

    <dependency-resolver>

      <mediaresource-service></mediaresource-service>
      <routing-service></routing-service>

      <ui-manager id="ui-manager">

        <drawer-content unresolved slot="drawer-content"></drawer-content>
        
        <media-page class="page" slot="pages" shallFetch id="media"></media-page>
        <grid-page class="page" slot="pages" id="grid"></grid-page>
        <some-page class="page" slot="pages" id="some"></some-page>
        <another-page class="page" slot="pages" id="another"></another-page>

      </ui-manager>

    </dependency-resolver>`;

    let shadowRoot = this.attachShadow({
      mode: 'open'
    });

    shadowRoot.appendChild(tmpl.content.cloneNode(true));

    /* jshint ignore:start */

    let fp = `../pages/${window.location.pathname.replace('/', '')}-page.js`;
    import(fp).then(() => {
      import('../components/dependency-resolver/dependency-resolver.js');
      import('../main/ui/ui-manager.js').then(() => {
        import('../components/drawer-content/drawer-content.js');
      });
    });
    this.removeAttribute('unresolved');
    /* jshint ignore:end */

    let path = window.location.pathname.replace('/', '');
    if (path === "") path = "media";
    const el = this.shadowRoot.getElementById('ui-manager').querySelector(`[id="${path}"]`);
    el.style.display = "block";
    el.setAttribute('initial-page', true);
  }
}

window.customElements.define('shell-app', ShellApp);