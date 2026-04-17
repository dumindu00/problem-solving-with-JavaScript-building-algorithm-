let inputType = null


videoButton.onclick = function () {
    fileInput.click()
}


fileInput.onchange = function(event) {
            const file = event.target.files[0]
            inputVideo.src = URL.createObjectURL(file)
            inputVideo.play();
        }

        inputVideo.onloadeddata = function() {
            inputType = "video"
            videoCanvas.width = inputVideo.videoWidth;
            videoCanvas.height = inputVideo.videoHeight;
            
            segmentationCanvas.width = inputVideo.videoWidth;
            segmentationCanvas.height = inputVideo.videoHeight;
            
            distortionCanvas.width = inputVideo.videoWidth;
            distortionCanvas.height = inputVideo.videoHeight;
            
            videoCanvas.style.display = "none"
            mainInterface.style.display = "flex"
            startPanel.style.display = "none"
            
            loop();
        }


        simulationButton.onclick = function() {
            inputType = 'simulation'
            segmentationCanvas.width = simulationCanvas.width;
            segmentationCanvas.height = simulationCanvas.height;

            distortionCanvas.width = simulationCanvas.width;
            distortionCanvas.height = simulationCanvas.height;
            
            videoCanvas.style.display = "none"
            mainInterface.style.display = "flex"
            startPanel.style.display = "none"
            loop()
            
        }


function getInputImageData() {

            let imgData = null;
            let trueCameraPosition = null
            if (inputType == "simulation") {
                trueCameraPosition = updateSimulation()
                imgData = getSimulationImageData()
            } else if (inputType == "video") {
                const { width, height } = videoCanvas;
                const ctx = videoCanvas.getContext("2d", { willReadFrequently: true })
                ctx.drawImage(videoCanvas, 0, 0)
                imgData = ctx.getImageData(0, 0, width, height);
            }
        return { imgData, trueCameraPosition }
}