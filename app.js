
const alerts    = new Worker('alerts.js');
const startBtn  = document.getElementById('start-btn');
const stopBtn   = document.getElementById('stop-btn');
const catImg    = document.getElementById('cat-img');

let isPolling = false;

alerts.onmessage = (e) => {
    console.log('Received message:', e.data);

    // We expect to receive binary image data
    const imageURL = URL.createObjectURL(e.data);

    catImg.src = imageURL;
}

startBtn.addEventListener('click', () => {
    
    //Tell Webworker to start polling
    alerts.postMessage('start');

    // Update UI
    isPolling = true;
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled');
});

stopBtn.addEventListener('click', () => {
    
    //Tell Webworker to stop polling
    alerts.postMessage('stop');

    // Update UI
    isPolling = false;
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', true);
});