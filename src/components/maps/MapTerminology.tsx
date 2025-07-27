import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export const MapTerminology = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (map.current) return;

    try {
      const apiUrl = `https://maps.geo.${
        import.meta.env.VITE_MAP_REGION
      }.amazonaws.com/v2/styles/${
        import.meta.env.VITE_MAP_STYLE
      }/descriptor?key=${import.meta.env.VITE_MAP_API_KEY}&color-scheme=${
        import.meta.env.VITE_MAP_COLOR_SCHEME
      }`;

      console.log("Map URL:", apiUrl); // Debug URL

      if (!mapContainer.current) {
        setError("Map container not found.");
        return;
      }

      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: apiUrl,
        center: [-123.115898, 49.295868],
        zoom: 11,
      });

      map.current.on("error", (e) => {
        console.error("Map error:", e.error);
        setError(`Map load error: ${e.error?.message || "Unknown error"}`);
      });

      map.current.addControl(new maplibregl.NavigationControl(), "top-left");
    } catch (err) {
      console.error("Map initialization error:", err);
      setError(`Failed to initialize map: ${err.message}`);
    }

    return () => {
      if (map.current) map.current.remove();
    };
  }, []);

  if (error) {
    return (
      <div style={{ color: "red", padding: "20px" }}>
        <h3>Error loading map</h3>
        <p>{error}</p>
        <p>
          Please check:
          <ul>
            <li>API key validity</li>
            <li>Network connection</li>
            <li>Browser console for details</li>
          </ul>
        </p>
      </div>
    );
  }

  return <div ref={mapContainer} style={{ width: "100%", height: "100vh" }} />;
};
