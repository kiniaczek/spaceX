import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Rocket } from "../interfaces";
import { Button } from "@/components/ui/button";

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

  if (!rocket) {
    return <p className="text-center text-gray-900">Ładowanie...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        {rocket.rocket_name}
      </h1>
      <img
        src={rocket.flickr_images[0]}
        alt={rocket.rocket_name}
        className="w-full max-h-[500px] object-contain rounded-lg shadow-md"
      />
      <p className="text-gray-800 mt-4 leading-relaxed text-center">
        {rocket.description}
      </p>
      <p className="text-gray-700 mt-2">
        <strong>Pierwszy lot:</strong> {rocket.first_flight}
      </p>
      <p className="text-gray-700">
        <strong>Koszt startu:</strong> $
        {rocket.cost_per_launch.toLocaleString()} USD
      </p>
      <Button
        variant="default"
        size="lg"
        className="mt-6 bg-black text-white hover:bg-gray-800"
        onClick={() => navigate(-1)}
      >
        Powrót
      </Button>
    </div>
  );
}

export default RocketDetails;
