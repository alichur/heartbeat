import { useParams } from "react-router-dom";
import ZoomChart from "./ZoomChart.jsx";
import { formatDateData, formatTimeData } from "../utils";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { buildUrl, intradayString, activitiesString } from "../fitbit-config";

export default function Result() {
  let params = useParams();
  let type = params.granularity;
  const [data, setData] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    async function fetchData() {
      let res = await fetch(
        buildUrl(type, {
          dateStart: "2023-01-23",
          dateRange: "1m",
          timeStart: "08:00",
          timeEnd: "08:30",
        }),
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      let resData = await res.json();
      setData(resData);
    }
    fetchData();
  }, [type]);

  return (
    <div>
      {type && (
        <div>
          {data && data[intradayString] && type === "time" && (
            <ZoomChart granularity="time" data={formatTimeData(data)} />
          )}
          {data && data[activitiesString] && type === "date" && (
            <ZoomChart granularity="date" data={formatDateData(data)} />
          )}
        </div>
      )}
    </div>
  );
}
