// src/components/services/MapServices.tsx
import { Box, Typography, Chip, Stack, Divider } from "@mui/material";
import { MapRounded } from "@mui/icons-material";

export const DefaultComponent = () => (
  //not done component
  <Box>
    <Stack direction="row" alignItems="center" spacing={2} mb={3}>
      <MapRounded color="primary" fontSize="large" />
      <Typography variant="h5">Default Component</Typography>
    </Stack>

    <Typography paragraph>
      This is a placeholder for the default component content.
    </Typography>

    <Divider sx={{ my: 3 }} />

    <Typography variant="h6" gutterBottom>
      Key Features
    </Typography>
    <Stack direction="row" spacing={1} flexWrap="wrap">
      <Chip label="Feature 1" color="primary" variant="outlined" />
      <Chip label="Feature 2" color="primary" variant="outlined" />
      <Chip label="Feature 3" color="primary" variant="outlined" />
    </Stack>
  </Box>
);
