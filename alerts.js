const POLL_INTERVAL     = 5000;
let isPolling           = false;

// Receive data from main UI thread
onmessage = function(e) {
    console.log('Worker message', e);

    if(e.data === 'start') {
        if(!isPolling) {
            isPolling = true;
            pollAlerts();
        }
    }
    else if(e.data === 'stop') {
        isPolling = false;
    }
}

function pollAlerts() {

    // https://cataas.com/ (Cats as a service, fucking awesome)
    fetch('https://cataas.com/cat')
        .then(response => response.blob())
        .then(response => {
            
            // Send data back to main UI thread
            postMessage(response);

            setTimeout(() => {
                if(isPolling) {
                    pollAlerts();
                }
            }, POLL_INTERVAL);
        });
}