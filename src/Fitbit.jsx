import { AuthProvider } from "react-oauth2-code-pkce";
import { authConfig } from "./fitbit-config";
import UserInfo from "./UserInfo";
import Home from "./Home";

function Fitbit() {
  return (
    <AuthProvider authConfig={authConfig}>
      <Home />
      <UserInfo />
    </AuthProvider>
  );
}

export default Fitbit;
