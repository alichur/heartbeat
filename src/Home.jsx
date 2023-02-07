import { useState, useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import Insight from "./Insight";
export default function Home() {
  const [data, setData] = useState(null);
  const { token } = useContext(AuthContext);
  const [period, setPeriod] = useState("");

  return (
    <div className="App">
      <h1>Heartbeat</h1>
      <Insight />
    </div>
  );
}
