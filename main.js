
const cameraPositions = [];

let inputType = null


fileInput.onchange = function(event) {
            const file = event.target.files[0]
            videoCanvas.src = URL.createObjectURL(file)
            videoCanvas.play();
        }

        videoCanvas.onloadeddata = function() {
            inputType = "video"
            videoCanvas.width = videoCanvas.videoWidth;
            videoCanvas.height = videoCanvas.videoHeight;
            segmentationCanvas.width = videoCanvas.videoWidth;
            segmentationCanvas.height = videoCanvas.videoHeight;
            segmentationCanvas.height = inputVideo.videoHeight;
            videoCanvas.style.display = "none"
            loop();
        }


        simulationButton.onclick = function() {
            inputType = 'simulation'
            segmentationCanvas.width = simulationCanvas.width;
            segmentationCanvas.height = simulationCanvas.height;
            videoCanvas.style.display = "none"
            loop()
        }



        function loop() {

            let imgData = null;

            if (inputType == "simulation") {

            updateSimulation()

            const imgData = getSimulationImageData()
            
            } else if (inputType == "video") {
            
                const { width, height } = videoCanvas;
                const ctx = videoCanvas.getContext("2d", { willReadFrequently: true })
                ctx.drawImage(videoCanvas, 0, 0)
                imgData = ctx.getImageData(0, 0, width, height);
                
            }

            const rgbCounts = segmentImage(imgData);
            const distancesToBalls = estimateDistancesToBalls(rgbCounts)
            const cameraPosition = estimateCameraPosition(distancesToBalls)

            
            cameraPositions.push(cameraPosition)

            drawOutput(distancesToBalls, cameraPositions);

            requestAnimationFrame(loop)
        }





