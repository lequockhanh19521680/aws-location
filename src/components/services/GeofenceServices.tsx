// src/components/services/MapServices.tsx
import { Box, Typography, Chip, Stack, Divider } from "@mui/material";
import { MapRounded } from "@mui/icons-material";

export const GeoConcepts = () => (
  <Box>
    <Stack direction="row" alignItems="center" spacing={2} mb={3}>
      <MapRounded color="primary" fontSize="large" />
      <Typography variant="h5">Map Concepts</Typography>
    </Stack>

    <Typography paragraph>
      AWS Location Service provides interactive maps with various styles
      including vector maps, satellite imagery, and 3D terrain views.
    </Typography>

    <Divider sx={{ my: 3 }} />

    <Typography variant="h6" gutterBottom>
      Key Features
    </Typography>
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <Chip label="Vector maps" color="primary" variant="outlined" />
      <Chip label="Satellite imagery" color="primary" variant="outlined" />
      <Chip label="3D terrain" color="primary" variant="outlined" />
      <Chip label="Custom styling" color="primary" variant="outlined" />
    </Stack>
  </Box>
);

export const MapStyles = () => (
  <Box>
    <Stack direction="row" alignItems="center" spacing={2} mb={3}>
      <MapRounded color="primary" fontSize="large" />
      <Typography variant="h5">Map Styles</Typography>
    </Stack>

    <Typography paragraph>
      Choose from several map styles including Vector, Raster, and 3D
      visualization options.
    </Typography>

    {/* Add more content */}
  </Box>
);

// Create similar components for other map services
