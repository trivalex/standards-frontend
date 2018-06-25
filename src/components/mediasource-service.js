import {
    PolymerElement
} from '@polymer/polymer/polymer-element.js';

class MediasourceService extends PolymerElement {

    static get properties() {
        return {
            initOnAttach: {
                type: Boolean,
                reflectToAttribute: true
            },
            routePath: String,
            componentUri: String,
            currentRequest: {
                type: Boolean,
                notify: true,
                observer: '_currentRequestChanged'
            },
            links: {
                type: Object
            },
            hasLinks: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
                computed: '_computeHasLinks(links)'
            }
        };
    }
    _currentRequestChanged(r) {
        console.log(r);
    }
    connectedCallback() {
        this.fetchLinks();
    }
    _computeHasLinks(value) {
        return value !== null;
    }

    async fetchLinks() {
        this.currentRequest = fetch(`http://localhost:8080/media/api/browser/alba/`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
        });
        this.currentRequest.then((response) => {
            const reader = response.body.getReader();
            const stream = new ReadableStream({
                start(controller) {
                    // The following function handles each data chunk
                    function push() {
                        // "done" is a Boolean and value a "Uint8Array"
                        reader.read().then(({
                            done,
                            value
                        }) => {
                            // Is there no more data to read?
                            if (done) {
                                // Tell the browser that we have finished sending data
                                controller.close();
                                return;
                            }

                            // Get the data and send it to the browser via the controller
                            controller.enqueue(value);
                            push();
                        });
                    };

                    push();
                }
            });

            response = new Response(stream, {
                headers: {
                    "Content-Type": "application/javascript"
                }
            });

            response.json().then((json) => {
                this.links = json;
                console.debug(this.links);
            });
            return response;
        }).catch((e) => {
            this.lastError = e;
            console.error(e);
        });
    }

    async getLinks() {
        if (this.links === null) await this.fetchLinks();
        return this.links();
    }
}
customElements.define("mediasource-service", MediasourceService);