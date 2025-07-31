import React, { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import {
  Box,
  CircularProgress,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

interface Suggestion {
  PlaceId: string;
  Place: {
    Label: string;
    Geometry: {
      Point: [number, number]; // [lon, lat]
    };
    Country?: string;
    PostalCode?: string;
    TimeZone?: {
      Name: string;
    };
    Categories?: string[];
  };
}

interface Point {
  lat: number;
  lon: number;
}

const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;
const MAP_REGION = import.meta.env.VITE_MAP_REGION;
const MAP_NAME = import.meta.env.VITE_MAP_NAME;
const BACKEND_API = "http://localhost:4000/api";

// Danh sách style vector và raster (maplibre-gl yêu cầu style JSON hoặc tile)
const MAP_STYLES = [
  { name: "VectorEsriStreets", type: "vector" },
  { name: "VectorEsriTopographic", type: "vector" },
  { name: "VectorEsriNavigation", type: "vector" },
  { name: "VectorHereExplore", type: "vector" },
  { name: "VectorHereContrast", type: "vector" },
  { name: "RasterEsriImagery", type: "raster" },
];

export const MapStyles: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedMapStyle, setSelectedMapStyle] = useState(MAP_NAME);

  const mapRef = useRef<maplibregl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const createMapStyle = (styleName: string) => {
    const styleType = MAP_STYLES.find((s) => s.name === styleName)?.type;
    if (styleType === "raster") {
      const tileUrl = `https://maps.geo.${MAP_REGION}.amazonaws.com/maps/v0/maps/${styleName}/tiles/{z}/{x}/{y}?key=${MAP_API_KEY}`;
      return {
        version: 8,
        sources: {
          imagery: {
            type: "raster",
            tiles: [tileUrl],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "imagery-layer",
            type: "raster",
            source: "imagery",
          },
        ],
      };
    } else {
      return `https://maps.geo.${MAP_REGION}.amazonaws.com/maps/v0/maps/${styleName}/style-descriptor?key=${MAP_API_KEY}`;
    }
  };

  useEffect(() => {
    if (mapRef.current || !mapContainerRef.current) return;

    const style = createMapStyle(selectedMapStyle);

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      center: [106.7, 10.8],
      zoom: 10,
      style,
    });
  }, []);

  useEffect(() => {
    if (!mapRef.current || !selectedPoint) return;

    const { lon, lat } = selectedPoint;

    document.querySelectorAll(".mapboxgl-marker").forEach((el) => el.remove());

    new maplibregl.Marker().setLngLat([lon, lat]).addTo(mapRef.current!);

    mapRef.current.flyTo({ center: [lon, lat], zoom: 14 });
  }, [selectedPoint]);

  useEffect(() => {
    if (!mapRef.current) return;
    const style = createMapStyle(selectedMapStyle);
    mapRef.current.setStyle(style);
  }, [selectedMapStyle]);

  const fetchSuggestions = async (text: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BACKEND_API}/suggest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unknown error");

      setSuggestions(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSuggestionClick = (sug: Suggestion) => {
    setQuery(sug.Place.Label);
    setSuggestions([]);

    const point = sug.Place.Geometry.Point;
    if (point) {
      setSelectedPoint({ lon: point[0], lat: point[1] });
      setSelectedLabel(sug.Place.Label);
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Chọn kiểu bản đồ</InputLabel>
        <Select
          value={selectedMapStyle}
          label="Chọn kiểu bản đồ"
          onChange={(e) => setSelectedMapStyle(e.target.value)}
        >
          {MAP_STYLES.map((style) => (
            <MenuItem key={style.name} value={style.name}>
              {style.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Tìm kiếm địa điểm"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => {
          const val = e.target.value;
          setQuery(val);
          if (val.length > 2) {
            fetchSuggestions(val);
          } else {
            setSuggestions([]);
          }
        }}
      />

      {loading && <CircularProgress size={20} />}
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      {suggestions.length > 0 && (
        <Paper elevation={3} sx={{ p: 1 }}>
          {suggestions.map((sug) => (
            <Typography
              key={sug.PlaceId}
              onClick={() => handleSuggestionClick(sug)}
              sx={{
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              {sug.Place.Label}
            </Typography>
          ))}
        </Paper>
      )}

      {selectedLabel && (
        <Typography variant="subtitle1">
          📍 Địa điểm đã chọn: <strong>{selectedLabel}</strong>
        </Typography>
      )}

      <Box
        ref={mapContainerRef}
        sx={{ height: 500, borderRadius: 2, overflow: "hidden" }}
      />
    </Box>
  );
};
