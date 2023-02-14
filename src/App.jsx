import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Fitbit from "./Fitbit";
import Insight from "./Insight";
import Result from "./Result";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Fitbit />}>
          <Route path="insights" element={<Insight />}>
            <Route path=":granularity" element={<Result />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
