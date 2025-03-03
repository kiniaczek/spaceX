import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RocketDetails from "./pages/RocketDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rockets/:rocketId" element={<RocketDetails />} />
    </Routes>
  );
}

export default App;
