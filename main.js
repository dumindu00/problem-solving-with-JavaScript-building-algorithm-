
const cameraPositions = [];





        function loop() {

            const { imgData, trueCameraPosition } = getInputImageData();

            const distortedImgData = distortImage(imgData)

            const rgbCounts = segmentImage(distortedImgData);
            const distancesToBalls = estimateDistancesToBalls(rgbCounts)
            const cameraPosition = estimateCameraPosition(distancesToBalls)

            
            cameraPositions.push(cameraPosition)

            drawOutput(distancesToBalls, cameraPositions, trueCameraPosition);

            requestAnimationFrame(loop)
        }





