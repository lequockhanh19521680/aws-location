import { ServiceIds } from "../utils/serviceTypes";

export interface MenuItem {
  id?: string;
  label: string;
  description: string;
  icon?: string;
  children?: MenuItem[];
}

export const menuTree: MenuItem[] = [
  {
    label: "Maps",
    icon: "MapRounded",
    description: "Map related features and documentation",
    children: [
      {
        id: ServiceIds.MAP_CONCEPTS,
        label: "Map concepts",
        description: "Learn about map fundamentals",
        icon: "MapOutlined",
      },
      {
        id: ServiceIds.MAP_STYLES,
        label: "Map styles",
        description: "Explore available map styles",
        icon: "PaletteOutlined",
      },
      {
        id: ServiceIds.MAP_APIS,
        label: "Map APIs",
        description: "Integrate with our mapping APIs",
        icon: "CodeOutlined",
      },
      {
        id: ServiceIds.MAP_HOW_TO,
        label: "How to",
        description: "Step-by-step guides",
        icon: "MenuBookOutlined",
      },
      {
        id: ServiceIds.MAP_COST_MANAGEMENT,
        label: "Manage costs and usage",
        description: "Optimize your spending",
        icon: "AttachMoneyOutlined",
      },
    ],
  },
  {
    label: "Places",
    icon: "LocationOnRounded",
    description: "Places search and geocoding features",
    children: [
      {
        id: ServiceIds.PLACES_CONCEPTS,
        label: "Places concepts",
        description: "Understand places service",
        icon: "HelpOutlineOutlined",
      },
      {
        id: ServiceIds.PLACES_APIS,
        label: "Places APIs",
        description: "Access places APIs",
        icon: "ApiOutlined",
      },
      {
        id: ServiceIds.PLACES_HOW_TO,
        label: "How to",
        description: "Implementation guides",
        icon: "BuildOutlined",
      },
      {
        id: ServiceIds.PLACES_COST_MANAGEMENT,
        label: "Manage costs and usage",
        description: "Cost management",
        icon: "SavingsOutlined",
      },
    ],
  },
  {
    label: "Routes",
    icon: "RouteRounded",
    description: "Routing and directions features",
    children: [
      {
        id: ServiceIds.ROUTES_CONCEPTS,
        label: "Routes concepts",
        description: "Routing fundamentals",
        icon: "TimelineOutlined",
      },
      {
        id: ServiceIds.ROUTE_APIS,
        label: "Route APIs",
        description: "Routing API documentation",
        icon: "RouteOutlined",
      },
      {
        id: ServiceIds.ROUTES_HOW_TO,
        label: "How to",
        description: "Implementation examples",
        icon: "DirectionsOutlined",
      },
      {
        id: ServiceIds.ROUTES_COST_MANAGEMENT,
        label: "Manage costs and usage",
        description: "Pricing details",
        icon: "LocalAtmOutlined",
      },
    ],
  },
  {
    label: "Geofences",
    icon: "LayersRounded",
    description: "Geofencing and boundary management",
    children: [
      {
        id: ServiceIds.GEOFENCE_CONCEPTS,
        label: "Geofence concepts",
        description: "Geofencing basics",
        icon: "FenceOutlined",
      },
      {
        id: ServiceIds.GEOFENCE_GET_STARTED,
        label: "Get started",
        description: "Quick start guide",
        icon: "PlayCircleOutlineOutlined",
      },
      {
        id: ServiceIds.GEOFENCE_HOW_TO,
        label: "How to",
        description: "Detailed instructions",
        icon: "ListAltOutlined",
      },
      {
        id: ServiceIds.GEOFENCE_COST_MANAGEMENT,
        label: "Manage costs and usage",
        description: "Cost optimization",
        icon: "PaidOutlined",
      },
    ],
  },
  {
    label: "Trackers",
    icon: "SatelliteAltRounded",
    description: "Tracking devices and assets",
    children: [
      {
        id: ServiceIds.TRACKER_CONCEPTS,
        label: "Tracker concepts",
        description: "Tracking fundamentals",
        icon: "RadarOutlined",
      },
      {
        id: ServiceIds.TRACKER_GET_STARTED,
        label: "Get started",
        description: "Quick setup guide",
        icon: "RocketLaunchOutlined",
      },
      {
        id: ServiceIds.TRACKER_HOW_TO,
        label: "How to",
        description: "Usage examples",
        icon: "SettingsOutlined",
      },
      {
        id: ServiceIds.TRACKER_COST_MANAGEMENT,
        label: "Manage costs and usage",
        description: "Pricing information",
        icon: "MonetizationOnOutlined",
      },
    ],
  },
];

export const findMenuItemById = (id: string): MenuItem | undefined => {
  for (const category of menuTree) {
    if (category.children) {
      const found = category.children.find((item) => item.id === id);
      if (found) return found;
    }
  }
  return undefined;
};

export const getAllServiceIds = (): string[] => {
  return menuTree
    .flatMap((category) => category.children || [])
    .filter((item) => item.id)
    .map((item) => item.id!);
};
