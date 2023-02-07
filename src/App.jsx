import "./App.css";
import { AuthProvider } from "react-oauth2-code-pkce";
import { authConfig } from "./fitbit-config";
import { UserInfo } from "./UserInfo";

function App() {
  return (
    <AuthProvider authConfig={authConfig}>
      <UserInfo />
      <div className="App">
        <h1>Heartbeat</h1>
      </div>
    </AuthProvider>
  );
}

export default App;
