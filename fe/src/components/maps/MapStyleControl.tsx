import React, { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  Chip,
  Divider,
} from "@mui/material";

const POI_CATEGORIES = [
  "Airport",
  "Park",
  "Hospital",
  "University",
  "School",
  "Business",
  "Recreation",
  "Commercial Zone",
  "Industrial Zone",
];

const LABEL_LANGUAGES = [
  "Default",
  "English",
  "French",
  "Spanish",
  "Chinese",
  "Japanese",
  "Korean",
];

const MapStyleControl = ({ onChange, value }) => {
  const [config, setConfig] = useState(
    value || {
      style: "Standard",
      mode: "light",
      poi: POI_CATEGORIES,
      language: "Default",
    }
  );

  useEffect(() => {
    if (value) setConfig(value);
  }, [value]);

  const handleStyleChange = (_, style) => {
    if (!style) return;
    let newConfig = { ...config, style };
    if (style === "Monochrome") {
      newConfig = {
        ...newConfig,
        poi: ["Airport", "Park", "Hospital", "University"],
      };
    }

    if (style === "Standard" || style === "Hybrid") {
      newConfig = {
        ...newConfig,
        poi: POI_CATEGORIES,
      };
    }
    setConfig(newConfig);
    onChange && onChange(newConfig);
  };

  const handleModeChange = (e) => {
    const newConfig = { ...config, mode: e.target.value };
    setConfig(newConfig);
    onChange && onChange(newConfig);
  };

  const handlePOIChange = (category) => {
    let nextPois = config.poi.includes(category)
      ? config.poi.filter((c) => c !== category)
      : [...config.poi, category];
    const newConfig = { ...config, poi: nextPois };
    setConfig(newConfig);
    onChange && onChange(newConfig);
  };

  const handleLangChange = (e) => {
    const newConfig = { ...config, language: e.target.value };
    setConfig(newConfig);
    onChange && onChange(newConfig);
  };

  const availablePOIs =
    config.style === "Monochrome"
      ? ["Airport", "Park", "Hospital", "University"]
      : POI_CATEGORIES;

  const styleNotes = {
    Standard: (
      <>
        <Typography sx={{ mb: 1 }}>
          Clean, modern look with soft color palettes. Supports a wide range of
          map features and POI categories. Both light and dark modes available.
        </Typography>
        <Typography sx={{ fontSize: "0.95rem", color: "grey.700" }}>
          Use for general applications where readability and visual context are
          priorities.
        </Typography>
      </>
    ),
    Monochrome: (
      <>
        <Typography sx={{ mb: 1 }}>
          Minimalist grayscale style, optimal for data visualization overlays.
          Includes only essential POIs.
        </Typography>
        <Typography sx={{ fontSize: "0.95rem", color: "grey.700" }}>
          Use for analytical dashboards, overlays, or minimalistic UI needs.
        </Typography>
      </>
    ),
    Hybrid: (
      <>
        <Typography sx={{ mb: 1 }}>
          Mix of satellite imagery with readable labels and configurable POIs.
          Supports label language switching.
        </Typography>
        <Typography sx={{ fontSize: "0.95rem", color: "grey.700" }}>
          Use for applications needing rich geographic detail with clear
          annotations.
        </Typography>
      </>
    ),
  };

  return (
    <Paper elevation={4} sx={{ maxWidth: 500, p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Map Style Control
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {/* Style Selector */}
      <FormControl component="fieldset" sx={{ width: "100%", mb: 2 }}>
        <FormLabel component="legend">Map Style</FormLabel>
        <ToggleButtonGroup
          exclusive
          value={config.style}
          onChange={handleStyleChange}
          size="large"
          sx={{ my: 1, mb: 0.5, flexWrap: "wrap" }}
        >
          <ToggleButton value="Standard">Standard</ToggleButton>
          <ToggleButton value="Monochrome">Monochrome</ToggleButton>
          <ToggleButton value="Hybrid">Hybrid</ToggleButton>
        </ToggleButtonGroup>
        <Box sx={{ mt: 1 }}>{styleNotes[config.style]}</Box>
      </FormControl>

      {/* Color Scheme */}
      {(config.style === "Standard" ||
        config.style === "Monochrome" ||
        config.style === "Hybrid") && (
        <FormControl sx={{ my: 2 }}>
          <FormLabel>Color Scheme</FormLabel>
          <RadioGroup
            row
            value={config.mode}
            onChange={handleModeChange}
            name="color-scheme"
          >
            <FormControlLabel value="light" control={<Radio />} label="Light" />
            <FormControlLabel value="dark" control={<Radio />} label="Dark" />
          </RadioGroup>
        </FormControl>
      )}

      {/* POI Categories */}
      {(config.style === "Standard" ||
        config.style === "Hybrid" ||
        config.style === "Monochrome") && (
        <FormControl sx={{ my: 2, width: "100%" }}>
          <FormLabel>Points of Interest</FormLabel>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 1 }}>
            {availablePOIs.map((category) => (
              <Chip
                key={category}
                label={category}
                variant={config.poi.includes(category) ? "filled" : "outlined"}
                color={config.poi.includes(category) ? "primary" : "default"}
                onClick={() => handlePOIChange(category)}
                sx={{ cursor: "pointer" }}
              />
            ))}
          </Box>
          {config.style === "Monochrome" && (
            <Typography sx={{ mt: 1, fontSize: "0.9rem", color: "grey.600" }}>
              Monochrome style only displays a reduced POI set; others are
              hidden visually but remain in map data.
            </Typography>
          )}
        </FormControl>
      )}

      {/* Label Language (Internationalization) */}
      {(config.style === "Monochrome" || config.style === "Hybrid") && (
        <FormControl sx={{ my: 2, minWidth: 180 }}>
          <FormLabel>Label Language</FormLabel>
          <Select
            value={config.language}
            onChange={handleLangChange}
            size="small"
            sx={{ mt: 1 }}
          >
            {LABEL_LANGUAGES.map((lang) => (
              <MenuItem value={lang} key={lang}>
                {lang}
              </MenuItem>
            ))}
          </Select>
          <Typography sx={{ mt: 0.5, fontSize: "0.89rem", color: "grey.600" }}>
            Language switching is available for map labels (where supported).
          </Typography>
        </FormControl>
      )}
    </Paper>
  );
};

export default MapStyleControl;
