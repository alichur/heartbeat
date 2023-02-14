import { useState } from "react";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import Typography from "@mui/material/Typography";

export default function Home() {
  const [period, setPeriod] = useState("");

  return (
    <Container className="App">
      <AppBar>
        <Toolbar>
          <Typography variant="h3">Heartbeat</Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Outlet context={[period]} />
    </Container>
  );
}
