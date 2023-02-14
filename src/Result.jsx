import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import ZoomChart from "./ZoomChart.jsx";
import { formatDateTime } from "./utils";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { buildUrl } from "./fitbit-config";
export default function Result() {
  let params = useParams();
  let type = params.granularity;
  const [data, setData] = useState(null);
  const { token } = useContext(AuthContext);
  useEffect(() => {
    async function fetchData() {
      let res = await fetch(buildUrl(type), {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      let resData = await res.json();
      setData(resData);
    }
    fetchData();
  }, [type]);
  return (
    <div>
      {" "}
      my result is {type}
      {type && (
        <div>
          This will be data and graph for type: {type}{" "}
          {data && data["activities-heart-intraday"] && type === "time" && (
            <ZoomChart
              granularity="time"
              data={data["activities-heart-intraday"].dataset.map((entry) => {
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
              data={data["activities-heart"].map((entry) => {
                return {
                  time: Date.parse(entry.dateTime),
                  value: entry.value.restingHeartRate,
                };
              })}
            />
          )}
        </div>
      )}
    </div>
  );
}
