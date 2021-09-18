const POLL_INTERVAL     = 5000;
let isPolling           = false;

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
            console.log(response);
            postMessage(response);

            setTimeout(() => {
                if(isPolling) {
                    pollAlerts();
                }
            }, POLL_INTERVAL);
        });
}