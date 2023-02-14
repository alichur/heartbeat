import { Routes, Route, Link } from "react-router-dom";
import { useState, useContext } from "react";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Outlet } from "react-router-dom";

// import TabPanel from "@mui/lab/TabPanel";
// import Link from "@mui/material/Link";
const Insight = () => {
  const [period, setPeriod] = useState("date");

  const handleTabChange = (e) => {
    setPeriod(e.target.value);
  };
  return (
    <div>
      <>
        <p>please select a type. Current selected type is: {period}</p>
        <div>
          <Link to="/insights/date">View data by date</Link>
          <Link to="/insights/time">View data by time</Link>
        </div>
      </>

      <Outlet context={[period]} />
    </div>
  );
};
export default Insight;
