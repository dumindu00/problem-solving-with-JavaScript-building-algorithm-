
const cameraPositions = [];





        function loop() {

            const { imgData, trueCameraPosition } = getInputImageData();

            
            const focalLength = fovToFocalLength(CAMERA_FOV, imgData.height)

            const distortedImgData = distortImage(imgData, focalLength)

            const rgbCounts = segmentImage(distortedImgData);
            const distancesToBalls = estimateDistancesToBalls(rgbCounts, focalLength)
            const cameraPosition = estimateCameraPosition(distancesToBalls)

            
            cameraPositions.push(cameraPosition)

            drawOutput(distancesToBalls, cameraPositions, trueCameraPosition);

            requestAnimationFrame(loop)
        }





