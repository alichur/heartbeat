import { formatDateData, formatTimeData } from "./utils";

describe("fitbit api data utils formatDateData", () => {
  let fitbitApiData;
  beforeEach(() => {
    fitbitApiData = {
      "activities-heart": [
        { dateTime: "2023-01-23", value: { restingHeartRate: 100 } },
      ],
    };
  });

  it("formats api data for date", () => {
    expect(formatDateData(fitbitApiData)).toStrictEqual([
      { time: 1674432000000, value: 100 },
    ]);
  });
  it("returns an object even if there is no date data", () => {
    fitbitApiData.value = {};
    expect(formatDateData(fitbitApiData)).toStrictEqual([
      { time: 1674432000000, value: 100 },
    ]);
  });
});

describe("fitbit api data utils formatTimeData", () => {
  let fitbitApiData;
  beforeEach(() => {
    fitbitApiData = {
      "activities-heart": [
        { dateTime: "2023-01-23", value: { restingHeartRate: 100 } },
      ],
      "activities-heart-intraday": {
        dataset: [
          { time: "08:00:00", value: 51 },
          { time: "08:01:00", value: 50 },
        ],
      },
    };
  });
  // todo: manually get this requested time range, and add to array with empty values.
  it("returns an object even if there is no time data", () => {
    fitbitApiData["activities-heart-intraday"].dataset = [];
    expect(formatTimeData(fitbitApiData)).toStrictEqual([]);
  });
  it("formats api data for time", () => {
    expect(formatTimeData(fitbitApiData)).toStrictEqual([
      { time: 1674414000000, value: 51 },
      { time: 1674414060000, value: 50 },
    ]);
  });
});
