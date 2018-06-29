class MediaresourceService extends HTMLElement {

    connectedCallback() {
        fetch(`http://localhost:8080/media/api/browser/alba/`, {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, cors, *same-origin
            });
    }

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
                    resolve(json)
                });
            }).catch((e) => {
                this.lastError = e;
                console.error(e);
                reject(e)
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
                    resolve(json)
                });
            }).catch((e) => {
                this.lastError = e;
                console.error(e);
                reject(e)
            });
        });
    }
}
customElements.define("mediaresource-service", MediaresourceService);