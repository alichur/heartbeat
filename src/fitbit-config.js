export const authConfig = {
  clientId: "227RTW",
  authorizationEndpoint: "https://www.fitbit.com/oauth2/authorize",
  tokenEndpoint: "https://api.fitbit.com/oauth2/token", // todo nice error if send with thishttps://api.fitbit.com/oauth2/token
  redirectUri: "http://localhost:8080",
  scope: "heartrate",
  onRefreshTokenExpire: TRefreshTokenExpiredEvent =>
    window.confirm(
      "Session expired. Refresh page to continue using the site?"
    ) && event.login()
};

const intradayExampleUrl =
  "https://api.fitbit.com/1/user/-/activities/heart/date/2023-01-23/1d/1min/time/08:00/08:30.json";
const dateExampleUrl =
  "https://api.fitbit.com/1/user/-/activities/heart/date/2023-01-23/1d.json";

export function buildUrl(type) {
  if (type === "date") {
    return dateExampleUrl;
  }
  if (type === "time") {
    return intradayExampleUrl;
  }
  return null;
}
