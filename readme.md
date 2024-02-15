#Clinical Trial Heart Rate

This JavaScript program calculates statistics for heart rate data collected from a patient over several days. It reads heart rate measurements from a JSON file, calculates the minimum, maximum, median beats per minute, and the latest data timestamp for each day, and outputs the result in JSON format.

##Prerequisites

Ensure you have Node.js installed on your machine. 

##Installation

Clone this repository or download the source code.
Navigate to the directory containing the source files.

##Usage

Ensure your heart rate data is stored in a JSON file following the specified format.
Replace the heartrate.json file in the project directory with your heart rate data file.
Open a terminal or command prompt.
Run the following command to execute the program:
node calculateHeartRateStatistics.js
The program will read the heart rate data, calculate statistics, and write the output to a JSON file named output.json.

##Sample Input File Format

The input JSON file "heartrate.json" should contain an array of heart rate measurements. Each measurement should have the following format:

heartrate.json

[
    {
        "startTimestamp": "YYYY-MM-DDTHH:MM:SS",
        "endTimestamp": "YYYY-MM-DDTHH:MM:SS",
        "bpm": BPM
    },
    ...
]
startTimestamp: The timestamp when the measurement was started.
endTimestamp: The timestamp when the measurement was ended.
bpm: The beats per minute recorded during the measurement.

##Output Format

The program writes the output to a separate JSON file named "output.json". The format of the output is as follows:

output.json
[
    {
        "date": "YYYY-MM-DD",
        "min": MINIMUM_BPM,
        "max": MAXIMUM_BPM,
        "median": MEDIAN_BPM,
        "latestDataTimestamp": "YYYY-MM-DDTHH:MM:SS"
    },
    ...
]
date: The date for which the statistics are calculated.
min: The minimum beats per minute recorded on that day.
max: The maximum beats per minute recorded on that day.
median: The median beats per minute recorded on that day.
latestDataTimestamp: The timestamp of the last measurement taken on that day.