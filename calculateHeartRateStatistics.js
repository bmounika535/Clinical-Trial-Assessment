const fs = require('fs');

/**
 * Function to calculate statistics from heart rate data.
 * @param {Object[]} data - Array of heart rate data objects.
 * @returns {Object[]} Array of objects containing statistics for each day.
 */
function calculateHeartRateStatistics(data) {
    const dailyStatistics = {};

    // Iterate through each heart rate data
    data.forEach(record => {
        const date = record.startTimestamp.split('T')[0];

        // Initialize daily statistics object if not exists
        if (!dailyStatistics[date]) {
            dailyStatistics[date] = {
                date: date,
                min: Number.MAX_SAFE_INTEGER,
                max: Number.MIN_SAFE_INTEGER,
                heartRates: [],
                latestDataTimestamp: ''
            };
        }

        // Update minimum and maximum heart rate
        dailyStatistics[date].min = Math.min(dailyStatistics[date].min, record.bpm);
        dailyStatistics[date].max = Math.max(dailyStatistics[date].max, record.bpm);

        // Add heart rate to the daily statistics
        dailyStatistics[date].heartRates.push(record.bpm);

        // Update latest data timestamp
        if (record.endTimestamp > dailyStatistics[date].latestDataTimestamp) {
            dailyStatistics[date].latestDataTimestamp = record.endTimestamp;
        }
    });

    // Calculate median for each day
    for (const date in dailyStatistics) {
        dailyStatistics[date].heartRates.sort((a, b) => a - b);
        const middle = Math.floor(dailyStatistics[date].heartRates.length / 2);
        dailyStatistics[date].median = dailyStatistics[date].heartRates.length % 2 === 0 ?
            (dailyStatistics[date].heartRates[middle - 1] + dailyStatistics[date].heartRates[middle]) / 2 :
            dailyStatistics[date].heartRates[middle];
        delete dailyStatistics[date].heartRates; // Remove unnecessary array
    }

    return Object.values(dailyStatistics);
}

// Read heart rate data from JSON file
fs.readFile('heartrate.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    try {
        const heartRateData = JSON.parse(data);
        const statistics = calculateHeartRateStatistics(heartRateData);

        // Write output to JSON file
        fs.writeFile('output.json', JSON.stringify(statistics, null, 2), err => {
            if (err) {
                console.error('Error writing file:', err);
                return;
            }
            console.log('Statistics written to output.json');
        });
    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});