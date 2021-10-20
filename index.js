// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// and load the index.html of the app.
// window.addEventListener('DOMContentLoaded', () => {
//     document.getElementById('btn-show-cam').addEventListener('click', () => {
//         window.open('cam.html', '_blank', 'top=500,left=200,width=100,height=100,frame=false,nodeIntegration=no')
//     })
// })

window.addEventListener('DOMContentLoaded', async () => {
    // let status = systemPreferences.getMediaAccessStatus("camera"); // returns 'not-determined'
    // const permission = await systemPreferences.askForMediaAccess("camera");

    // resolves to false, without popping up anything
    navigator.mediaDevices.getUserMedia({ video: true, audio: false, })
        .then(function (stream) {
            document.getElementById('camera').srcObject = stream;
        }).catch(function () {
            alert('could not connect stream');
        });
})
