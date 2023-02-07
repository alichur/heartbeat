import "./App.css";
import { AuthProvider } from "react-oauth2-code-pkce";
import { authConfig } from "./fitbit-config";
import UserInfo from "./UserInfo";
import Home from "./Home";
function App() {
  return (
    <AuthProvider authConfig={authConfig}>
      <UserInfo />
      <div className="App">
        <h1>Heartbeat</h1>
        <Home />
      </div>
    </AuthProvider>
  );
}

export default App;
