import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  useTheme,
  styled,
} from "@mui/material";
import { useState } from "react";

const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 600,
  fontSize: "0.9rem",
  minHeight: "44px",
  color: theme.palette.text.secondary,
  transition: "all 0.3s ease",
  "&.Mui-selected": {
    color: theme.palette.primary.main,
  },
  "&:hover": {
    color: theme.palette.primary.main,
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
}));

interface TabContent {
  label: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

interface CommonTabBarProps {
  tabs: TabContent[];
}

export const CommonTabBar = ({ tabs }: CommonTabBarProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const theme = useTheme();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        width: "100%",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0px 4px 20px rgba(0, 0, 0, 0.5)"
            : "0px 4px 20px rgba(0, 0, 0, 0.15)",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow:
            theme.palette.mode === "dark"
              ? "0px 6px 24px rgba(0, 0, 0, 0.6)"
              : "0px 6px 24px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{
          minHeight: "44px",
          backgroundColor: theme.palette.grey[50],
          "& .MuiTabs-indicator": {
            backgroundColor: theme.palette.primary.main,
            height: "3px",
            borderRadius: "3px 3px 0 0",
          },
        }}
      >
        {tabs.map((tab, index) => (
          <StyledTab
            key={index}
            label={
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                {tab.icon}
                {tab.label}
              </Box>
            }
          />
        ))}
      </Tabs>

      <Box
        sx={{
          padding: "24px",
          backgroundColor: theme.palette.background.paper,
          minHeight: "300px",
        }}
      >
        {tabs[tabIndex].component}
      </Box>
    </Paper>
  );
};
