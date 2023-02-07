import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
const Insight = ({ type }) => {
  console.log(type);
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
      {type && <p>This will be data and graph for type: {type}</p>}
    </div>
  );
};
export default Insight;
