import { Routes, Route, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "react-oauth2-code-pkce";

const Insight = ({ type }) => {
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
      setData(JSON.stringify(resData));
    }
    fetchData();
  }, []);

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
        <p>
          This will be data and graph for type: {type} {data}
        </p>
      )}
    </div>
  );
};
export default Insight;
