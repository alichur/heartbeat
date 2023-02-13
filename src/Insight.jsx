import { Routes, Route, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { buildUrl } from "./fitbit-config";
import ZoomChart from "./ZoomChart.jsx";
import { formatDateTime } from "./utils";

const Insight = ({ type }) => {
  const [data, setData] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      let res = await fetch(buildUrl(type), {
        headers: {
          authorization: `Bearer ${token}`
        }
      });
      let resData = await res.json();
      setData(resData);
    }
    fetchData();
  }, [type]);

  return (
    <div>
      {!type && (
        <>
          <p>please select a type. Current selected type is: {type}</p>
          <div>
            <Link to="./date">View data by date</Link>
            <Link to="./time">View data by time</Link>
            <Routes>
              <Route path="date" element={<Insight type="date" />} />
              <Route path="time" element={<Insight type="time" />} />
            </Routes>
          </div>
        </>
      )}
      {type && (
        <div>
          This will be data and graph for type: {type}{" "}
          {data && data["activities-heart-intraday"] && type === "time" && (
            <ZoomChart
              granularity="time"
              data={data["activities-heart-intraday"].dataset.map(entry => {
                let timeString = formatDateTime(
                  data["activities-heart"][0].dateTime,
                  entry.time
                );
                return { time: timeString, value: entry.value };
              })}
            />
          )}
          {data && data["activities-heart"] && type === "date" && (
            <ZoomChart
              granularity="date"
              data={data["activities-heart"].map(entry => {
                return {
                  time: Date.parse(entry.dateTime),
                  value: entry.value.restingHeartRate
                };
              })}
            />
          )}
        </div>
      )}
    </div>
  );
};
export default Insight;
