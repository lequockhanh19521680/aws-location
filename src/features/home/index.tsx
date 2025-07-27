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
} from "@mui/icons-material";
import { menuTree } from "../../data/menuTree";
import { getServiceComponent } from "../../utils/serviceComponents";
import { ServiceId } from "../../utils/serviceTypes";

// Enhanced TreeItem with smooth press effects
const StyledTreeItem = styled(TreeItem)(({ theme }) => ({
  "& .MuiTreeItem-label": {
    padding: "8px 12px",
    borderRadius: "6px",
    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    margin: "2px 0",
    userSelect: "none",
  },
}));

// Container with AWS-style dark header
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

const TreeHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.primary.contrastText,
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

// Content panel with smooth transitions
const ContentPanel = styled(Box)(({ theme }) => ({
  flex: 1,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  display: "flex",
  flexDirection: "column",
}));

const ContentHeader = styled(Box)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.05),
  borderBottom: `1px solid ${theme.palette.divider}`,
  padding: "16px 24px",
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const ContentBody = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  background: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.light,
    0.02
  )} 0%, ${alpha(theme.palette.background.default, 0.1)} 100%)`,
  transition: "all 0.3s ease",
}));

// Icon mapper with fallback
const getIconForItem = (label = "") => {
  if (label.includes("Map")) return <MapRounded />;
  if (label.includes("Place")) return <LocationOnRounded />;
  if (label.includes("Route")) return <RouteRounded />;
  if (label.includes("Geofence")) return <LayersRounded />;
  if (label.includes("Tracker")) return <SatelliteAltRounded />;
  return <DescriptionRounded />;
};

export const Home = () => {
  const [selected, setSelected] = useState("");

  const flattenedItems = useMemo(
    () =>
      menuTree.flatMap((group, i) =>
        group.children
          ? group.children.map((item, j) => ({
              id: `item-${i}-${j}`,
              label: item.label,
              description: item.description,
              group: group.label,
              groupIcon: group.icon,
            }))
          : []
      ),
    []
  );

  const selectedItem = useMemo(
    () => flattenedItems.find((item) => item.id === selected),
    [selected, flattenedItems]
  );

  const SelectedComponent = useMemo(() => {
    if (!selectedItem) return null;
    return getServiceComponent(selectedItem.label as ServiceId);
  }, [selectedItem]);

  const handleItemSelect = (event, itemId) => {
    event.preventDefault();
    setSelected(itemId);
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
      {/* Navigation Tree */}
      <TreeViewContainer sx={{ minWidth: 280 }}>
        <TreeHeader>
          <MapRounded sx={{ fontSize: "20px" }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            AWS Location Services
          </Typography>
        </TreeHeader>

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
          {menuTree.map((group, i) => (
            <StyledTreeItem
              itemId={`group-${i}`}
              key={group.label}
              label={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {getIconForItem(group.label)}
                  <Typography variant="subtitle1">{group.label}</Typography>
                </Box>
              }
            >
              {group.children?.map((item, j) => (
                <StyledTreeItem
                  itemId={`item-${i}-${j}`}
                  key={`item-${i}-${j}`}
                  label={
                    <Box
                      sx={{ display: "flex", alignItems: "center", gap: 1.5 }}
                    >
                      {getIconForItem(item.label)}
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

      {/* Content Panel */}
      <ContentPanel>
        <ContentHeader>
          {selectedItem ? (
            <>
              {getIconForItem(selectedItem.label)}
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
        </ContentHeader>

        <ContentBody>
          {SelectedComponent ? (
            <Box
              sx={{
                backgroundColor: alpha("#fff", 0.9),
                border: `1px solid ${alpha("#ddd", 0.3)}`,
                borderRadius: "8px",
                padding: "32px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                width: "100%",
                maxWidth: "800px",
                textAlign: "left",
                transition: "all 0.3s ease",
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
        </ContentBody>
      </ContentPanel>
    </Box>
  );
};
