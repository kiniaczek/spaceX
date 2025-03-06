import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RocketDetails from "./pages/RocketDetails";

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rockets/:rocketId" element={<RocketDetails />} />
      </Routes>
    </div>
  );
}

export default App;
