import { AuthProvider } from "react-oauth2-code-pkce";
import { authConfig } from "../fitbit-config";
import Home from "./Home";

function Fitbit() {
  return (
    <AuthProvider authConfig={authConfig}>
      <Home />
    </AuthProvider>
  );
}

export default Fitbit;
