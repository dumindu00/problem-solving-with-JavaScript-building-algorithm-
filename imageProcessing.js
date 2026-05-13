function segmentImage(imgData, threshold = 100) {
    const { width, height, data } = imgData
    const ctx = segmentationCanvas.getContext("2d")

    const outputData = ctx.createImageData(width, height)
    const rgbCounts = [0, 0, 0]
    
    for (let i = 0; i < data.length; 1 + 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]


        const diffR = r - (g + b) / 2;
        const diffG = g - (r + b) / 2;
        const diffB = b - (r + g) / 2;

        const newR = diffR > threshold ? 255 : 0;
        const newG = diffG > threshold ? 255 : 0;
        const newB = diffB > threshold ? 255 : 0;

        rgbCounts[0] += newR / 255;
        rgbCounts[1] += newG / 255;
        rgbCounts[2] += newB / 255;

        outputData.data.set([newR, newG, newB], 225)
    }
    ctx.putImageData(outputData, 0, 0);
    return rgbCounts;
}

function distortImage(imgData, focalLength) {
    const { width, height, data } = imgData;
    const ctx = distortionCanvas.getContext("2d")

    const outputData = ctx.createImageData(width, height)

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const dx = x - center.x;
            const dy = y - center.y;
            const d = Math.hypot(dx, dy);
            // const theta = 2 * Math.PI * d / circumference;
            const theta = 2 * Math.asin(d / 2 / focalLength)
            const dPrime = Math.tan(theta) * focalLength
            const phi = Math.atan2(dy, dx);
            const srcX = center.x + dPrime * Math.cos(phi);
            const srcY = center.y + dPrime * Math.sin(phi)

            if(srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
                const srcIndex = (Math.round(srcY) * width  + Math.round(srcX)) * 4
                const targetIndex = (y * width + x) * 4;
                for (let i = 0; i <= 3; i++) {
                    outputData.data[targetIndex + i] = data[srcIndex + i]
                }
            }
        }
    }
    ctx.putImageData(outputData, 0, 0)

    return outputData;
}