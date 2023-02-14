import { useState, useContext } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import Insight from "./Insight";
import Container from "@mui/material/Container";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState(null);
  const { token } = useContext(AuthContext);
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
