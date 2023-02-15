import { activitiesString, intradayString } from "./fitbit-config";

export function formatDateTime(dateString, timeString) {
  if (timeString) {
    return Date.parse(`${dateString}T${timeString}`);
  }
  return Date.parse(dateString);
}

/**
 * Given dater data such as {
  "activities-heart": [
    { dateTime: "2023-01-23", value: { restingHeartRate: 100 } }
  ]
};
 * returns time date and value portions
 * [{ time: 1674414060000,  value: 100}]
 */
export function formatDateData(data) {
  return data[activitiesString].map((entry) => {
    return {
      time: Date.parse(entry.dateTime),
      value: entry.value.restingHeartRate,
    };
  });
}

/**
 * Given time data such as {
 *   "activities-heart": [],
 *   "activities-heart-intraday": {
 *     dataset: [
 *       { time: "08:00:00", value: 51 },
 *       { time: "08:01:00", value: 50 },
 *     ],
 *   },
 * };
 * returns time time and value portions
 * [{ time: 1674414000000,  value: 51}, { time: 1674414060000, value: 50 }]
 */
export function formatTimeData(data) {
  return data[intradayString].dataset.map((entry) => {
    let timeString = formatDateTime(
      data[activitiesString][0].dateTime,
      entry.time
    );
    return { time: timeString, value: entry.value };
  });
}
