import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Rocket } from "../interfaces";

function RocketDetails() {
  const { rocketId } = useParams();
  const [rocket, setRocket] = useState<Rocket | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (rocketId) {
      fetchRocketDetails(rocketId);
    }
  }, [rocketId]);

  const fetchRocketDetails = async (id: string) => {
    try {
      const res = await axios.get<Rocket>(
        `https://api.spacexdata.com/v3/rockets/${id}`
      );
      setRocket(res.data);
    } catch (error) {
      console.error("Error fetching rocket details:", error);
    }
  };

  if (!rocket) return <p>Ładowanie...</p>;

  return (
    <div className="detailsOfRocket">
      <h2>{rocket.rocket_name}</h2>
      <img src={rocket.flickr_images[0]} alt={rocket.rocket_name} width="300" />
      <p>Opis: {rocket.description}</p>
      <p>Pierwszy lot: {rocket.first_flight}</p>
      <p>Koszt startu: ${rocket.cost_per_launch.toLocaleString()} USD</p>
      <button onClick={() => navigate(-1)}>Powrót</button>
    </div>
  );
}

export default RocketDetails;
