import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Rocket } from "../interfaces";
import { Button } from "@/components/ui/button";

function Home() {
  const [rocketsData, setRocketsData] = useState<Rocket[]>([]);
  const navigate = useNavigate();

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
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-6">
        SpaceX Rockets
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {rocketsData.map((rocket) => (
          <div
            key={rocket.id}
            className="bg-white shadow-md rounded-lg p-4 text-center"
          >
            <Link to={`/rockets/${rocket.rocket_id}`} className="block">
              <img
                src={rocket.flickr_images[0]}
                alt={rocket.rocket_name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold text-gray-900 mt-4">
                {rocket.rocket_name}
              </h3>
            </Link>
            <Button
              variant="default"
              size="sm"
              onClick={() => navigate(`/rockets/${rocket.rocket_id}`)}
            >
              Zobacz szczegóły
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
