import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import MapDisplay from "./MapDisplay";

interface Suggestion {
  PlaceId: string;
  Place: {
    Label: string;
    Geometry: {
      Point: [number, number]; // [longitude, latitude]
    };
  };
}

const PlaceConceptItem: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 1) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
        setError(null);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchSuggestions = async (text: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("http://localhost:4000/api/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errRes = await response.json();
        throw new Error(errRes.error || "Unknown error");
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    } catch (err: any) {
      console.error("Fetch error:", err.message || err);
      setError(err.message || "Unknown error");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", position: "relative" }}>
      {/* Map full screen */}
      <MapDisplay
        markers={suggestions.map((s) => ({
          lat: s.Place.Geometry.Point[1],
          lon: s.Place.Geometry.Point[0],
          label: s.Place.Label,
        }))}
      />

      {/* Search input overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          width: 300,
          zIndex: 1000,
          backgroundColor: "white",
          padding: 2,
          borderRadius: 1,
          boxShadow: 3,
        }}
      >
        <TextField
          fullWidth
          label="Tìm kiếm địa điểm"
          variant="outlined"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
            <CircularProgress size={20} />
          </Box>
        )}

        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            ❌ Lỗi: {error}
          </Typography>
        )}

        {!loading && !error && suggestions.length > 0 && (
          <Paper sx={{ mt: 1, maxHeight: 300, overflow: "auto" }}>
            {suggestions.map((item) => (
              <Box
                key={item.PlaceId}
                sx={{ borderBottom: "1px solid #eee", p: 1 }}
              >
                <Typography variant="subtitle2">{item.Place.Label}</Typography>
                <Typography variant="caption" color="text.secondary">
                  Lat: {item.Place.Geometry.Point[1]} | Lon:{" "}
                  {item.Place.Geometry.Point[0]}
                </Typography>
              </Box>
            ))}
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default PlaceConceptItem;
