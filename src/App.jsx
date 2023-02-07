import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Fitbit from "./Fitbit";
import Insight from "./Insight";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<Fitbit />}></Route>
        <Route path="insights/*" element={<Insight />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
