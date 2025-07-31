// src/pages/Home.tsx
import { Box, Typography, styled, alpha } from "@mui/material";
import { useState, useMemo } from "react";
import { TreeItem, SimpleTreeView } from "@mui/x-tree-view";
import {
  FolderOpenRounded,
  DescriptionRounded,
  ChevronRightRounded,
  ExpandMoreRounded,
  MapRounded,
  LayersRounded,
  SatelliteAltRounded,
  RouteRounded,
  LocationOnRounded,
  // Thêm các icon mới
  MapOutlined,
  PaletteOutlined,
  CodeOutlined,
  MenuBookOutlined,
  AttachMoneyOutlined,
  HelpOutlineOutlined,
  ApiOutlined,
  BuildOutlined,
  SavingsOutlined,
  TimelineOutlined,
  RouteOutlined,
  DirectionsOutlined,
  LocalAtmOutlined,
  FenceOutlined,
  PlayCircleOutlineOutlined,
  ListAltOutlined,
  PaidOutlined,
  RadarOutlined,
  RocketLaunchOutlined,
  SettingsOutlined,
  MonetizationOnOutlined,
} from "@mui/icons-material";
import { menuTree } from "../../data/menuTree";
import { getServiceComponent } from "../../utils/serviceComponents";
import { ServiceId } from "../../utils/serviceTypes";

const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  "& .MuiTreeItem-label": {
    padding: "8px 12px",
    borderRadius: "6px",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    margin: "2px 0",
    userSelect: "none",
  },
}));

const TreeViewContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

// Component mapping cho các icon
const iconComponents: Record<string, React.ComponentType<any>> = {
  MapRounded,
  LocationOnRounded,
  RouteRounded,
  LayersRounded,
  SatelliteAltRounded,
  MapOutlined,
  PaletteOutlined,
  CodeOutlined,
  MenuBookOutlined,
  AttachMoneyOutlined,
  HelpOutlineOutlined,
  ApiOutlined,
  BuildOutlined,
  SavingsOutlined,
  TimelineOutlined,
  RouteOutlined,
  DirectionsOutlined,
  LocalAtmOutlined,
  FenceOutlined,
  PlayCircleOutlineOutlined,
  ListAltOutlined,
  PaidOutlined,
  RadarOutlined,
  RocketLaunchOutlined,
  SettingsOutlined,
  MonetizationOnOutlined,
};

export const Home = () => {
  const [selectedId, setSelectedId] = useState<ServiceId | null>(null);

  const selectedItem = useMemo(() => {
    if (!selectedId) return null;
    for (const group of menuTree) {
      const found = group.children?.find((item) => item.id === selectedId);
      if (found) return found;
    }
    return null;
  }, [selectedId]);

  const SelectedComponent = useMemo(() => {
    if (!selectedId) return null;
    return getServiceComponent(selectedId);
  }, [selectedId]);

  const handleItemSelect = (
    event: React.SyntheticEvent<Element, Event> | null,
    itemIds: string | null
  ) => {
    if (!itemIds) return;
    const itemId = itemIds;
    if (
      menuTree.some((group) =>
        group.children?.some((child) => child.id === itemId)
      )
    ) {
      setSelectedId(itemId as ServiceId);
    }
  };

  const renderIcon = (iconName?: string) => {
    if (!iconName) return null;
    const IconComponent = iconComponents[iconName];
    return IconComponent ? <IconComponent fontSize="small" /> : null;
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: 3,
        gap: 3,
        height: "calc(100vh - 48px)",
        backgroundColor: (theme) => theme.palette.grey[50],
      }}
    >
      <TreeViewContainer sx={{ minWidth: 280 }}>
        <Box
          sx={{
            backgroundColor: (theme) => theme.palette.primary.dark,
            color: (theme) => theme.palette.primary.contrastText,
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <MapRounded sx={{ fontSize: "20px" }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            AWS Location Services
          </Typography>
        </Box>

        <SimpleTreeView
          slots={{
            expandIcon: ChevronRightRounded,
            collapseIcon: ExpandMoreRounded,
          }}
          onSelectedItemsChange={handleItemSelect}
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            padding: "8px",
            "&:focus": { outline: "none" },
          }}
          disableSelection={false}
          multiSelect={false}
        >
          {menuTree.map((group) => (
            <StyledTreeItem
              itemId={`group-${group.label}`}
              key={group.label}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {renderIcon(group.icon)}
                  <Typography variant="subtitle1">{group.label}</Typography>
                </Box>
              }
            >
              {group.children
                ?.filter((item) => typeof item.id === "string")
                .map((item) => (
                  <StyledTreeItem
                    itemId={item.id as string}
                    key={item.id}
                    label={
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                      >
                        {renderIcon(item.icon)}
                        <Typography variant="body1">{item.label}</Typography>
                      </Box>
                    }
                    sx={{ pl: 2.5 }}
                  />
                ))}
            </StyledTreeItem>
          ))}
        </SimpleTreeView>
      </TreeViewContainer>

      <Box
        sx={{
          flex: 1,
          border: "1px solid",
          borderColor: (theme) => theme.palette.divider,
          borderRadius: "8px",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.05),
            borderBottom: "1px solid",
            borderColor: (theme) => theme.palette.divider,
            padding: "16px 24px",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          {selectedItem ? (
            <>
              {renderIcon(selectedItem.icon)}
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {selectedItem.label}
              </Typography>
            </>
          ) : (
            <>
              <DescriptionRounded sx={{ color: "primary.main" }} />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Service Details
              </Typography>
            </>
          )}
        </Box>

        <Box
          sx={{
            flex: 1,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "auto", // Thêm overflow cho container chính

            background: (theme) =>
              `linear-gradient(135deg, ${alpha(
                theme.palette.background.default,
                0.02
              )} 0%, ${alpha(theme.palette.background.default, 0.1)} 100%)`,
          }}
        >
          {SelectedComponent ? (
            <Box
              sx={{
                flex: 1,
                width: "100%",
                height: "100%",
                overflow: "auto", // optional: scroll nếu component dài
              }}
            >
              <SelectedComponent />
            </Box>
          ) : (
            <Box sx={{ textAlign: "center", maxWidth: "400px" }}>
              <FolderOpenRounded
                sx={{ fontSize: "48px", color: "text.disabled", opacity: 0.6 }}
              />
              <Typography variant="h6" sx={{ color: "text.disabled", mt: 2 }}>
                No service selected
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.disabled", mt: 1 }}
              >
                Select a service from the navigation pane to view details.
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
