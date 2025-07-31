import { Box, Typography, Slider, Button, Paper, Divider } from "@mui/material";
import { Stack } from "@mui/system";

type ColorScheme = "light" | "dark";

interface MapControlsProps {
  colorScheme: ColorScheme;
  onColorSchemeChange: (scheme: ColorScheme) => void;
  showVectorLayers: boolean;
  onVectorLayersChange: (show: boolean) => void;
  zoomLevel: number;
  onZoomChange: (zoom: number) => void;
  pitch: number;
  onPitchChange: (pitch: number) => void;
  bearing: number;
  onBearingChange: (bearing: number) => void;
}

const DEFAULT_ZOOM = 10;
const DEFAULT_PITCH = 0;
const DEFAULT_BEARING = 0;

export const MapControls = ({
  zoomLevel,
  onZoomChange,
  pitch,
  onPitchChange,
  bearing,
  onBearingChange,
}: MapControlsProps) => {
  const handleReset = () => {
    onZoomChange(DEFAULT_ZOOM);
    onPitchChange(DEFAULT_PITCH);
    onBearingChange(DEFAULT_BEARING);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: 350,
        padding: 3,
        overflowY: "auto",
        borderRadius: 0,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Map Controls
      </Typography>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Map View
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Zoom: {zoomLevel.toFixed(2)}</Typography>
        <Slider
          value={zoomLevel}
          onChange={(_, value) => onZoomChange(value as number)}
          min={0}
          max={20}
          step={0.1}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Pitch: {pitch}°</Typography>
        <Slider
          value={pitch}
          onChange={(_, value) => onPitchChange(value as number)}
          min={0}
          max={60}
        />
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography gutterBottom>Bearing: {bearing}°</Typography>
        <Slider
          value={bearing}
          onChange={(_, value) => onBearingChange(value as number)}
          min={0}
          max={360}
        />
      </Box>

      <Button variant="outlined" onClick={handleReset} fullWidth>
        Reset to Default
      </Button>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Terminology
      </Typography>
      <Typography variant="body2" paragraph>
        <strong>Basemap:</strong> Provides geographic context with vector tile
        layers.
      </Typography>
      <Typography variant="body2" paragraph>
        <strong>Vector:</strong> Points, lines, and polygons representing map
        features.
      </Typography>
    </Paper>
  );
};
