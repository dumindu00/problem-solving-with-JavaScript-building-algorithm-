let initialApparentRadii = null;


function estimateDistancesToBalls(rgbCounts) {

const apparentRaddi = rgbCounts.map( Math.sqrt(area))
            if (!initialApparentRadii) {
                initialApparentRadii = apparentRaddi
            };

            const distancesToBalls = [];
            for (let i =  0; i < apparentRaddi.length; i++) {
                const ratio = initialApparentRadii[i] / apparentRaddi[i]
                distancesToBalls[i] = INITIAL_DISTANCE_TO_BALLS[i] * ratio
            }
            return distancesToBalls;
}

function estimateCameraPosition(distancesToBalls) {
            const a = DISTANCE_BETWEEN_BALLS;
            const b = distancesToBalls[2];
            const c = distancesToBalls[1];
            const x = (b ** 2 - a ** 2 - c ** 2) / (2 * a)
            const z = Math.sqrt(c ** 2 - x ** 2);
            const xOffset = a / 2

            return { x: x + xOffset, z };
}