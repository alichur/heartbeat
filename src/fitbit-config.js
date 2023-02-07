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
