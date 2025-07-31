import React, { useEffect, useState } from "react";

const apiKey = "YOUR_API_KEY_HERE";
const region = "us-east-1"; // vùng bạn đã tạo route calculator
const calculatorName = "MyRouteCalculator";

const startPosition = [-73.985664, 40.748514]; // ví dụ: Tọa độ NY (long, lat)
const destinationPosition = [-73.98513, 40.758896]; // Times Square

export const RouteConceptItem = () => {
  const [routeData, setRouteData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await fetch(
          `https://routes.geo.${region}.amazonaws.com/routes/v0/calculators/${calculatorName}/calculate/route`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-Amz-Api-Key": apiKey,
            },
            body: JSON.stringify({
              DeparturePosition: startPosition,
              DestinationPosition: destinationPosition,
              TravelMode: "Car", // or 'Walking', 'Truck'
              IncludeLegGeometry: true,
              DistanceUnit: "Kilometers",
              DepartNow: true,
              // Optional: AvoidFerries, AvoidTolls
            }),
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }

        const data = await response.json();
        setRouteData(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchRoute();
  }, []);

  if (error) return <div className="text-red-500">Error: {error}</div>;

  return (
    <div>
      <h2 className="font-bold text-lg mb-2">Route Result</h2>
      {routeData ? (
        <pre className="text-sm bg-gray-100 p-4 rounded">
          {JSON.stringify(routeData, null, 2)}
        </pre>
      ) : (
        <div>Loading route...</div>
      )}
    </div>
  );
};
