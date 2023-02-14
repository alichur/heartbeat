import { useState } from "react";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";

export default function Home() {
  const [period, setPeriod] = useState("");

  return (
    <Container className="App">
      <AppBar>
        <Toolbar>Heartbeat</Toolbar>
      </AppBar>
      <Toolbar />
      <Outlet context={[period]} />
    </Container>
  );
}
