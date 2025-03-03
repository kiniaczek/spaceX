import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Rocket } from "../interfaces";

function Home() {
  const [rocketsData, setRocketsData] = useState<Rocket[]>([]);

  useEffect(() => {
    fetchRocketsData();
  }, []);

  const fetchRocketsData = async () => {
    try {
      const res = await axios.get<Rocket[]>(
        "https://api.spacexdata.com/v3/rockets"
      );
      setRocketsData(res.data);
    } catch (error) {
      console.error("Error fetching rocket data:", error);
    }
  };

  return (
    <div className="App">
      <h1>SpaceX Rockets</h1>
      <div className="rockets-container">
        {rocketsData.map((rocket) => (
          <div key={rocket.id} className="rocket-card">
            <Link to={`/rockets/${rocket.rocket_id}`}>
              <img
                src={rocket.flickr_images[0]}
                alt={rocket.rocket_name}
                width="200"
              />
              <h3>{rocket.rocket_name}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
