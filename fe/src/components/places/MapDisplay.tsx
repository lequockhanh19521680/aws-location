import React, { useEffect, useRef } from "react";
import maplibregl, { Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

interface MarkerData {
  lat: number;
  lon: number;
  label: string;
}

interface MapDisplayProps {
  markers: MarkerData[];
}

const MapDisplay: React.FC<MapDisplayProps> = ({ markers }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<MapLibreMap | null>(null);

  const region = import.meta.env.VITE_MAP_REGION;
  const mapName = import.meta.env.VITE_MAP_STYLE;
  const apiKey = import.meta.env.VITE_MAP_API_KEY;

  // Tạo URL style có gắn ?key=API_KEY
  const styleUrl = new URL(
    `https://maps.geo.${region}.amazonaws.com/v2/styles/${mapName}/descriptor`
  );
  styleUrl.searchParams.append("key", apiKey);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = new maplibregl.Map({
        container: mapRef.current,
        center: [105.85, 21.03], 
        zoom: 5,
        style: {
          version: 8,
          sources: {},
          layers: [],
        },
      });

      mapInstance.current.addControl(
        new maplibregl.NavigationControl(),
        "top-right"
      );

      fetch(styleUrl)
        .then((res) => res.json())
        .then((styleJson) => {
          mapInstance.current?.setStyle(styleJson);
        })
        .catch((err) => {
          console.error("Load style failed:", err);
        });
    }

    const oldMarkers = document.querySelectorAll(".aws-marker");
    oldMarkers.forEach((m) => m.remove());

    markers.forEach(({ lat, lon, label }) => {
      const el = document.createElement("div");
      el.className = "aws-marker";
      el.style.background = "red";
      el.style.width = "12px";
      el.style.height = "12px";
      el.style.borderRadius = "50%";

      new maplibregl.Marker(el)
        .setLngLat([lon, lat])
        .setPopup(new maplibregl.Popup().setText(label))
        .addTo(mapInstance.current!);
    });

    // Fit view với tất cả marker
    if (markers.length > 0) {
      const bounds = new maplibregl.LngLatBounds();
      markers.forEach(({ lat, lon }) => bounds.extend([lon, lat]));
      mapInstance.current!.fitBounds(bounds, { padding: 50 });
    }
  }, [markers]);

  return (
    <div
      ref={mapRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
      }}
    />
  );
};

export default MapDisplay;
