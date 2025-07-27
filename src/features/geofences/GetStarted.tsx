// src/components/services/MapServices.tsx
import { Box, Typography, Stack } from "@mui/material";
import { MapRounded } from "@mui/icons-material";

export const GeoStyles = () => (
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
