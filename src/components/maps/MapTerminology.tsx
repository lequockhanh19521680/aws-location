import { useState } from "react";
import {
  Box,
  Typography,
  Alert,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { MapControls } from "./MapControls";
import { MapView } from "./MapView";

type MapStyle = {
  name: string;
  value: string;
  supportsColorScheme: boolean;
};

export const MapTerminology = () => {
  const [error, setError] = useState<string | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // State for map controls
  const [selectedStyle, setSelectedStyle] = useState<string>(
    import.meta.env.VITE_MAP_STYLE || "VectorEsriStreets"
  );
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");
  const [showVectorLayers, setShowVectorLayers] = useState(true);
  const [showRasterLayers, setShowRasterLayers] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(11);
  const [pitch, setPitch] = useState(0);
  const [bearing, setBearing] = useState(0);

  const mapStyles: MapStyle[] = [
    {
      name: "ESRI Streets",
      value: "VectorEsriStreets",
      supportsColorScheme: true,
    },
    {
      name: "ESRI Navigation",
      value: "VectorEsriNavigation",
      supportsColorScheme: true,
    },
    {
      name: "ESRI Topographic",
      value: "VectorEsriTopographic",
      supportsColorScheme: true,
    },
    {
      name: "Here Berlin",
      value: "VectorHereBerlin",
      supportsColorScheme: false,
    },
    {
      name: "OpenData Standard",
      value: "VectorOpenDataStandardLight",
      supportsColorScheme: true,
    },
  ];

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6">Error loading map</Typography>
          <Typography>{error}</Typography>
        </Alert>

        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1">Current configuration:</Typography>
          <List dense>
            <ListItem>
              <ListItemText primary={`Style: ${selectedStyle}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Color Scheme: ${colorScheme}`} />
            </ListItem>
            <ListItem>
              <ListItemText primary={`Zoom: ${zoomLevel.toFixed(2)}`} />
            </ListItem>
          </List>
        </Paper>

        <Alert severity="info">
          <Typography variant="subtitle2">Troubleshooting steps:</Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Check API key validity" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Verify network connection" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Check browser console for details" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Ensure environment variables are set" />
            </ListItem>
          </List>
        </Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", width: "100%" }}>
      <MapControls
        colorScheme={colorScheme}
        onColorSchemeChange={setColorScheme}
        showVectorLayers={showVectorLayers}
        onVectorLayersChange={setShowVectorLayers}
        zoomLevel={zoomLevel}
        onZoomChange={setZoomLevel}
        pitch={pitch}
        onPitchChange={setPitch}
        bearing={bearing}
        onBearingChange={setBearing}
      />

      <MapView
        selectedStyle={selectedStyle}
        colorScheme={colorScheme}
        zoomLevel={zoomLevel}
        pitch={pitch}
        bearing={bearing}
        showVectorLayers={showVectorLayers}
        showRasterLayers={showRasterLayers}
        isMapLoaded={isMapLoaded}
        setIsMapLoaded={setIsMapLoaded}
        setError={setError}
        mapStyles={mapStyles}
      />
    </Box>
  );
};
