import {
  Box,
  Typography,
  List,
  ListItem,
  Paper,
  useTheme,
} from "@mui/material";
import { Language } from "@mui/icons-material";

export const LocalizationInternationalization = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          fontWeight="600"
          sx={{
            mb: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: theme.palette.primary.main,
          }}
        >
          Internationalization
        </Typography>
        <List dense sx={{ pl: 2 }}>
          {[
            "Handling multiple languages in map labels",
            "Formatting location data based on locale",
            "Adjusting map behavior for different regions",
          ].map((item, index) => (
            <ListItem key={index} sx={{ alignItems: "flex-start", py: 0.5 }}>
              <Box
                sx={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  backgroundColor: theme.palette.primary.main,
                  mt: "9px",
                  mr: 1.5,
                }}
              />
              <Typography variant="body1">{item}</Typography>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography
          variant="subtitle1"
          fontWeight="600"
          sx={{
            mb: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: theme.palette.primary.main,
          }}
        >
          Regional Settings
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 1.5,
          }}
        >
          {[
            "Timezone considerations",
            "Local map regulations",
            "Cultural adaptations",
            "Local business integrations",
          ].map((item, index) => (
            <Paper
              key={index}
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: 1.5,
                borderRadius: "8px",
                backgroundColor: theme.palette.action.hover,
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: theme.palette.action.selected,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                },
              }}
            >
              <Box
                sx={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: theme.palette.primary.main,
                }}
              />
              <Typography variant="body1">{item}</Typography>
            </Paper>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
