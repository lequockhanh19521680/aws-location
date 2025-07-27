import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Box, styled } from "@mui/material";

const MapContainer = styled("div")({
  flex: 1,
  height: "100%",
  backgroundColor: "#f0f0f0",
});

interface MapViewProps {
  selectedStyle: string;
  colorScheme: "light" | "dark";
  zoomLevel: number;
  pitch: number;
  bearing: number;
  showVectorLayers: boolean;
  showRasterLayers: boolean;
  isMapLoaded: boolean;
  setIsMapLoaded: (loaded: boolean) => void;
  setError: (error: string | null) => void;
  mapStyles: Array<{
    name: string;
    value: string;
    supportsColorScheme: boolean;
  }>;
}

export const MapView = ({
  selectedStyle,
  colorScheme,
  zoomLevel,
  pitch,
  bearing,
  showVectorLayers,
  showRasterLayers,
  isMapLoaded,
  setIsMapLoaded,
  setError,
  mapStyles,
}: MapViewProps) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);

  const currentStyle = mapStyles.find((style) => style.value === selectedStyle);

  // Initialize the map
  useEffect(() => {
    if (!mapContainer.current) return;

    const initializeMap = async () => {
      try {
        const requiredEnvVars = ["VITE_MAP_REGION", "VITE_MAP_API_KEY"];
        const missingVars = requiredEnvVars.filter(
          (varName) => !import.meta.env[varName]
        );

        if (missingVars.length > 0) {
          throw new Error(
            `Missing environment variables: ${missingVars.join(", ")}`
          );
        }

        const apiUrl = new URL(
          `https://maps.geo.${
            import.meta.env.VITE_MAP_REGION
          }.amazonaws.com/v2/styles/${
            import.meta.env.VITE_MAP_STYLE
          }/descriptor`
        );

        apiUrl.searchParams.append("key", import.meta.env.VITE_MAP_API_KEY);

        if (currentStyle?.supportsColorScheme) {
          apiUrl.searchParams.append("color-scheme", colorScheme);
        }

        console.log("Initializing map with URL:", apiUrl.toString());

        const response = await fetch(apiUrl.toString());
        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }

        map.current = new maplibregl.Map({
          container: mapContainer.current!,
          style: apiUrl.toString(),
          center: [-123.115898, 49.295868],
          zoom: zoomLevel,
          pitch: pitch,
          bearing: bearing,
        });

        map.current.on("load", () => {
          setIsMapLoaded(true);
          setError(null);
          console.log("Map loaded successfully");
        });

        map.current.on("error", (e) => {
          console.error("Map error:", e.error);
          setError(`Map error: ${e.error?.message || "Unknown error"}`);
        });

        map.current.on("move", () => {
          if (map.current) {
            // You might want to lift these state updates up
            // Or handle them differently in the parent component
          }
        });

        map.current.addControl(new maplibregl.NavigationControl(), "top-left");
      } catch (err) {
        console.error("Map initialization error:", err);
        setError(`Failed to initialize map: ${err.message}`);
        setIsMapLoaded(false);
      }
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
        setIsMapLoaded(false);
      }
    };
  }, []);

  // Update map style and color scheme
  useEffect(() => {
    if (!isMapLoaded || !map.current) return;

    const updateMapStyle = async () => {
      try {
        const apiUrl = new URL(
          `https://maps.geo.${
            import.meta.env.VITE_MAP_REGION
          }.amazonaws.com/v2/styles/${
            import.meta.env.VITE_MAP_STYLE
          }/descriptor`
        );

        apiUrl.searchParams.append("key", import.meta.env.VITE_MAP_API_KEY);

        if (currentStyle?.supportsColorScheme) {
          apiUrl.searchParams.append("color-scheme", colorScheme);
        }

        console.log("Updating map style:", apiUrl.toString());

        const response = await fetch(apiUrl.toString());
        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }

        map.current!.setStyle(apiUrl.toString());
        setError(null);
      } catch (err) {
        console.error("Error updating map style:", err);
        setError(`Error updating map: ${err.message}`);
      } finally {
      }
    };

    updateMapStyle();
  }, [selectedStyle, colorScheme, isMapLoaded]);

  // Toggle layers visibility
  useEffect(() => {
    if (!isMapLoaded || !map.current) return;

    const toggleLayers = (type: "vector" | "raster", show: boolean) => {
      const layers = map.current!.getStyle().layers;
      if (!layers) return;

      layers.forEach((layer) => {
        const isVectorLayer =
          layer.id.startsWith("road") ||
          layer.id.startsWith("building") ||
          layer.id.startsWith("water") ||
          layer.id.startsWith("land");

        const isRasterLayer =
          layer.type === "raster" ||
          layer.id.includes("raster") ||
          layer.id.includes("satellite");

        if (
          (type === "vector" && isVectorLayer) ||
          (type === "raster" && isRasterLayer)
        ) {
          if (
            map.current!.getLayoutProperty(layer.id, "visibility") !== undefined
          ) {
            map.current!.setLayoutProperty(
              layer.id,
              "visibility",
              show ? "visible" : "none"
            );
          }
        }
      });
    };

    toggleLayers("vector", showVectorLayers);
    toggleLayers("raster", showRasterLayers);
  }, [showVectorLayers, showRasterLayers, isMapLoaded]);

  // Update map view
  useEffect(() => {
    if (!isMapLoaded || !map.current) return;

    map.current.easeTo({
      zoom: zoomLevel,
      pitch: pitch,
      bearing: bearing,
      duration: 300,
    });
  }, [zoomLevel, pitch, bearing, isMapLoaded]);

  return <MapContainer ref={mapContainer} />;
};
