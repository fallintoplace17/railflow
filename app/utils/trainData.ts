export const stationNames = ["Aalen", "Goldshöfe", "Westhausen", "Lauchheim", "Aufhausen", "Bopfingen", "Trochtelfingen", "Pflaumloch", "Nördlingen", "Möttingen", "Hoppingen", "Harburg", "Ebermergen", "Wörnitzstein", "Donauwörth"];

export const generateRandomBetween = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
  
export const generateFakeTrainLineData = (numLines: number, numStations: number, maxTime: number) => {
    const trainLines = [];
    const minTravelTime = 5;
    const maxTravelTime = 15;
    const minStopDuration = 2;
    const maxStopDuration = 10;
    const minLoopStations = 4; 
    const maxLoopStations = generateRandomBetween(9, 15);
  
    for (let i = 0; i < numLines; i++) {
        let currentTime = 0;
        const lineData = [];
        const loopStations = generateRandomBetween(minLoopStations, maxLoopStations);
        const startIndex = generateRandomBetween(0, numStations - loopStations); // Starting station is randomized
        let currentStationIndex = startIndex;

        while (currentTime < maxTime) {
            const direction = Math.random() > 0.5 ? 1 : -1;
            const loopStations = generateRandomBetween(minLoopStations, maxLoopStations);

            for (let j = startIndex; j < startIndex + loopStations && currentTime <= maxTime; j++) {
                const travelTime = generateRandomBetween(minTravelTime, maxTravelTime);
                const stopDuration = generateRandomBetween(minStopDuration, maxStopDuration);
                currentStationIndex = (currentStationIndex + direction + numStations) % numStations;

                // Departure time at station
                lineData.push({
                    time: currentTime,
                    station: stationNames[j % numStations],
                });
                currentTime += travelTime;
  
                // Check if next station or stop will exceed maxTime
                if (currentTime + stopDuration <= maxTime) {
                    // Arrival time at station (simulate brief stop)
                    lineData.push({
                        time: currentTime,
                        station: stationNames[j % numStations],
                    });
                    currentTime += stopDuration; // Add stop duration
                }
            }
  
            // Add loop back time to first station
            if (currentTime + minTravelTime <= maxTime) {
                currentTime += minTravelTime; // Simulate the time taken to loop back
            }
        }
  
        trainLines.push(lineData);
    }
    return trainLines;
};
  