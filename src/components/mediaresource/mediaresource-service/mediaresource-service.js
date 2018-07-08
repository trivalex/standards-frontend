class MediaresourceService extends HTMLElement {

    fetchLinks() {
        return new Promise((resolve,reject) => {
            this.currentRequest = fetch(`http://localhost:8080/media/api/browser/alba/`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
            });
            this.currentRequest.then((response) => {
                this.lastResponse = response;
                const reader = response.body.getReader();
                const stream = new ReadableStream({
                    start(controller) {
                        function push() {
                            reader.read().then(({
                                done,
                                value
                            }) => {
                                if (done) {
                                    controller.close();
                                    return;
                                }
                                controller.enqueue(value);
                                push();
                            });
                        }
    
                        push();
                    }
                });
    
                response = new Response(stream, {
                    headers: {
                        "Content-Type": "application/javascript"
                    }
                });
    
                response.json().then((json) => {
                    resolve(json);
                });
            }).catch((e) => {
                this.lastError = e;
                reject(e);
            });
        });
    }

    fetchGallery(path) {

        return new Promise((resolve,reject) => {
            this.currentRequest = fetch(`http://localhost:8080/media/api/browser/alba/${path}/`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
            });
            this.currentRequest.then((response) => {
                this.lastResponse = response;
                const reader = response.body.getReader();
                const stream = new ReadableStream({
                    start(controller) {
                        function push() {
                            reader.read().then(({
                                done,
                                value
                            }) => {
                                if (done) {
                                    controller.close();
                                    return;
                                }
                                controller.enqueue(value);
                                push();
                            });
                        }
                        push();
                    }
                });
    
                response = new Response(stream, {
                    headers: {
                        "Content-Type": "application/javascript"
                    }
                });
    
                response.json().then((json) => {
                    resolve(json);
                });
            }).catch((e) => {
                this.lastError = e;
                console.error(e);
                reject(e);
            });
        });
    }
}
customElements.define("mediaresource-service", MediaresourceService);