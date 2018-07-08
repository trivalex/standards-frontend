import {
    LitElement,
    html
} from '@polymer/lit-element';
import {
    UiPage
} from '../main/ui/UiPage';
import {
    Dependant
} from '../components/dependency-resolver/Dependant';
import {
    repeat
} from 'lit-html/lib/repeat';
import {
    until
} from 'lit-html/lib/until';
import {
    store
} from '../main/store';
import {
    mediaresource
} from '../components/mediaresource/redux/mediaresource-reducer';
import {
    connect
} from 'pwa-helpers/connect-mixin';

store.addReducers({
    mediaresource
});

export const Iconfolder = html `<svg height="24" viewBox="0 0 24 24" width="24"><path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></path></svg>`;
export const IconfolderOpen = html `<svg height="24" viewBox="0 0 24 24" width="24"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></path></svg>`;

class MediaPage extends connect(store)(Dependant(UiPage(LitElement))) {
    _render({
        data,
        selectedImage,
        RAIL_SLIGHT_DELAY,
    }) {
        return html `
        <style>
            :host([unresolved]) * {
                display: none;
            }
            .content {
                padding: var(--content-padding);
                max-width: calc(var(--content-max-width) - var(--gutter-double));
                height: auto;
            }
            .folder {
                height: var(--medium-card-size);
                box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
                padding: var(--gutter-default);
                height: auto;
            }
            .folder span {
                display: table-row;
            }
            .folder>.name {
                font-size: var(--fluid-fontsize-c);
            }
            .folder>.path {
                font-size: var(--fluid-fontsize-d);
            }
            .gallery {
                display: grid;
                grid-template-columns : var(--gallery-collumns);
                grid-auto-rows : calc(var(--icon-size) * 3);
                grid-gap: var(--gutter-default);
            }
            .sf  {
                box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
                transition: all 0.3s cubic-bezier(.25,.8,.25,1);
            }
            .sf>.name {
                position: absolute;
                margin: auto var(--gutter-default);
                font-size: var(--fluid-fontsize-d);
            }
            .sf:hover {
                box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
            } 
            .sf  svg {
                width: 100%;
                height: 100%;
                fill: var(--standard-primary-glass-color);
            }
            .sf  svg:hover {
                fill: var(--standard-primary-color);
            }
            .tn {
                background-repeat: no-repeat;
                background-size: contain;
                background-position: center;
                background-color: var(--standard-tetiary-glass-color);
                background-image: var(--image);
                transition: all 0.3s cubic-bezier(.25,.8,.25,1);
            }
            .tn:hover {
                box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
            }

            .image-slide {
                position: absolute;
                z-index: 100;
                opacity: 0;

                -webkit-align-self: center;
                align-self: center;
                background: var(--milk-grey);

                width: 100vw;
                max-width: var(--content-max-width);
                min-height: 100vh;
                transition: opacity 0.3s ease-out;
            }
        </style>
        <div class="content">
            <a target="_blank" href="https://github.com/tvdtb/microservice-gallery"><h2>microservice-gallery</h2></a>
            ${(data)? this.renderFolders(data): this.renderFetchMessage()}
        </div>
        <anime-animated-pages activated activate-event="activateEvent" selected="${selectedImage}" id="views" attr-for-selected="id"
            attrForSelected="a" routeInDuration=${RAIL_SLIGHT_DELAY} routeOutDuration=${RAIL_SLIGHT_DELAY} routeDebounce=0>
            <!-- ${this.renderImages(data)} -->
        </anime-animated-pages>
`;
    }

    renderImageSlider(selectedImage) {
        return html`
        `;
    }

    renderImages(datas) {
        return html`
        ${repeat( datas, data => html`
            <div class="image-slide" id="${data.name}">
            ${repeat( r.images ||[], image => html`
                <div style="--image: url('http://localhost:8080/media/api/browser/alba/default///${image.name}');" class="image"></div>
            `)}
            </div>
        `)}
        `;
    }

    renderFetchMessage()  {
        return html`<a condensed-title target="_blank" href="https://github.com/tvdtb/microservice-gallery">looking for local mediaresource service on port 8080...</a>
        currently, you also need a cors extension like the <a target="_blank" href="https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi">Chrome CORS Extension</a>`;
    }

    renderFolders(datas) {
        return html `
        ${repeat( datas, data => html`
            <div class="folder">
                <span class="name">${data.name}</span>
                <span class="path">${data.path}</span>
                <div class="gallery">
                    ${this.renderGallery(data)}
                </div>
            </div>
        `)}
        `;
    }

    renderGallery(data) {
        return html `
        ${until(this._mediaresourceService.fetchGallery(data.name).then((r) => {
              return html `
            ${repeat( r.folders ||[], folder => html`
                <div class="sf">
                    <span class="name">${folder.name}</span>
                    ${Iconfolder}
                </div>
            `)}
            ${repeat( r.images ||[], image => html`
                <div style="--image: url('http://localhost:8080/media/api/browser/alba/default///${image.name}/ICON');" class="tn" on-tap="${() => {console.log('asd');}}"></div>
            `)}
            `;
        }), data => html`
        `)}
        `;
    }

    static get properties() {
        return {
            data: {
                type: Array,
                notify: true,
            },
            shallFetch: {
                type: Boolean,
                reflectToAttribute: true,
                value: false,
            },
            selectedImage: {
                type: String,
            }
        };
    }

    getData() {
        /* jshint ignore:start */
        import("../components/mediaresource/mediaresource-service/mediaresource-service.js").then(() => {
            this._mediaresourceService = this._wireDependency(this._mediaresourceService, "mediaresource-service");
            this._mediaresourceService.fetchLinks().then((r) => {
                this.data = Array.from(r.alba);
            });
        });
        /* jshint ignore:end */
    }

    transitionInCallback() {
        if (!this.data) {
            this.getData();
        }
    }

    transitionOutCallback() {
        // console.log(`hello-world ${this.id} obscured`);
    }

    _stateChanged(newState) {
        if (newState && newState.mediaresource && newState.mediaresource) {
            // this.data = newState.mediaresource.resources;
        }
    }
}
customElements.define("media-page", MediaPage);