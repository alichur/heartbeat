import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import Insight from "./Insight";
export default function Home() {
  const [data, setData] = useState(null);
  const { token } = useContext(AuthContext);
  const [period, setPeriod] = useState("");

  useEffect(() => {
    async function fetchData() {
      let res = await fetch(
        "https://api.fitbit.com/1/user/-/activities/heart/date/today/1d.json",
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
      let resData = await res.json();
      setData(JSON.stringify(resData["activities-heart"][0].value));
    }
    fetchData();
  }, []);
  return (
    <div className="App">
      <h1>Heartbeat</h1>
      <Insight />
      <Link to="insights/date">View data by date</Link>
      <Link to="insights/time">View data by time</Link>
      <Routes>
        <Route path="date" element={<Insight type="date" />} />
        <Route path="time" element={<Insight type="time" />} />
      </Routes>
    </div>
  );
}
