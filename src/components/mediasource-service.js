import "../../node_modules/traverson/traverson";

class MediasourceService extends HTMLElement {

    static get properties() {
        return {
        };
    }

    connectedCallback() {
        super.connectedCallback();

        // from("http://localhost:8080/media/api").json().follow("alba")
    }
}
customElements.define("mediasource-service", MediasourceService);