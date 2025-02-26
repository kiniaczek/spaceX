import Axios from "axios";
import { useEffect, useState } from "react";
import { Rocket } from "./interfaces";

function App() {

  const [rocketsData, setRocketsData] = useState<Rocket[]>([]);
  const [selectedRocket, setSelectedRocket] = useState<Rocket | null>(null);

  useEffect(() => {
    fetchRocketsData();
  },[]);

  const fetchRocketsData = async () => {
    try { 
        const res = await Axios.get<Rocket[]>("https://api.spacexdata.com/v3/rockets")
        setRocketsData(res.data);
        console.log(res)
    } catch (error) {
      console.log("Error fetching rocket data:", error);
    }

    };

  return (
    <div className="App">
      <h1>SpaceX Rockets</h1>
      <div className="rockets-container">
        {rocketsData.map((element) => (
          <div key={element.id} className="rocket-card">
            <img src={element.flickr_images[0]} alt={element.rocket_name} width="200" onClick={() => setSelectedRocket(element)} />
          </div>
        ))}
      </div>

    {selectedRocket && (
    <div className="detailsOfRocket">
      <h2>{selectedRocket.rocket_name}</h2>
      <p>Opis: {selectedRocket.description}</p>
      <p>Pierwszy lot: {selectedRocket.first_flight}</p>
      <p>Koszt startu: ${selectedRocket.cost_per_launch.toLocaleString()} USD</p>
      <button onClick={() => setSelectedRocket(null)}>Zamknij</button>
    </div>
  )}
  </div>
);
}

export default App;
