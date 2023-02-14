import { Link } from "react-router-dom";
import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Stack from "@mui/material/Stack";
import { Outlet } from "react-router-dom";

const Insight = () => {
  const [period, setPeriod] = useState("date");

  const handleTabChange = (e, newValue) => {
    setPeriod(newValue);
  };
  return (
    <Stack spacing={2}>
      <Tabs value={period} onChange={handleTabChange}>
        <Tab
          value={"date"}
          label="Date tab"
          component={Link}
          to={"/insights/date"}
        ></Tab>
        <Tab
          value={"time"}
          label="Time tab"
          component={Link}
          to={"/insights/time"}
        ></Tab>
      </Tabs>
      <Outlet context={[period]} />
    </Stack>
  );
};
export default Insight;
