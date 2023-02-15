import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Fitbit from "./Fitbit";
import Insight from "./Insight";
import Result from "./Result";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Fitbit />}>
          <Route path="insights" element={<Insight />}>
            <Route path=":granularity" element={<Result />} />
          </Route>
        </Route>
      </Routes>
    </Router>{" "}
  </React.StrictMode>
);
