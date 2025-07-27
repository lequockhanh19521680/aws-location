// src/data/menuTree.ts
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
    description: "Map-related features and documentation",
    children: [
      {
        id: ServiceIds.MAP_CONCEPTS,
        label: "Map concepts",
        description: "Learn about map fundamentals",
      },
      {
        id: ServiceIds.MAP_STYLES,
        label: "Map styles",
        description: "Explore available map styles",
      },
      {
        id: ServiceIds.MAP_APIS,
        label: "Map APIs",
        description: "Integrate with our mapping APIs",
      },
      {
        id: ServiceIds.HOW_TO,
        label: "How to",
        description: "Step-by-step guides",
      },
      {
        id: ServiceIds.COST_MANAGEMENT,
        label: "Manage costs and usage",
        description: "Optimize your spending",
      },
    ],
  },
  {
    label: "Places",
    icon: "LocationOnRounded",
    description: "Places search and geocoding services",
    children: [
      {
        id: ServiceIds.PLACES_CONCEPTS,
        label: "Places concepts",
        description: "Understand places service",
      },
      {
        id: ServiceIds.PLACES_APIS,
        label: "Places APIs",
        description: "Access places APIs",
      },
      {
        id: ServiceIds.HOW_TO,
        label: "How to",
        description: "Implementation guides",
      },
      {
        id: ServiceIds.COST_MANAGEMENT,
        label: "Manage costs and usage",
        description: "Cost management",
      },
    ],
  },
  {
    label: "Routes",
    icon: "RouteRounded",
    description: "Routing features and documentation",
    children: [
      {
        id: ServiceIds.ROUTES_CONCEPTS,
        label: "Routes concepts",
        description: "Routing fundamentals",
      },
      {
        id: ServiceIds.ROUTE_APIS,
        label: "Route APIs",
        description: "Routing API documentation",
      },
      {
        id: ServiceIds.HOW_TO,
        label: "How to",
        description: "Implementation examples",
      },
      {
        id: ServiceIds.COST_MANAGEMENT,
        label: "Manage costs and usage",
        description: "Pricing details",
      },
    ],
  },
  {
    label: "Geofences",
    icon: "LayersRounded",
    description: "Geofencing features and documentation",
    children: [
      {
        id: ServiceIds.GEOFENCE_CONCEPTS,
        label: "Geofence concepts",
        description: "Geofencing basics",
      },
      {
        id: ServiceIds.GET_STARTED,
        label: "Get started",
        description: "Quick start guide",
      },
      {
        id: ServiceIds.HOW_TO,
        label: "How to",
        description: "Detailed instructions",
      },
      {
        id: ServiceIds.COST_MANAGEMENT,
        label: "Manage costs and usage",
        description: "Cost optimization",
      },
    ],
  },
  {
    label: "Trackers",
    icon: "SatelliteAltRounded",
    description: "Tracking features and documentation",
    children: [
      {
        id: ServiceIds.TRACKER_CONCEPTS,
        label: "Tracker concepts",
        description: "Tracking fundamentals",
      },
      {
        id: ServiceIds.GET_STARTED,
        label: "Get started",
        description: "Quick setup guide",
      },
      {
        id: ServiceIds.HOW_TO,
        label: "How to",
        description: "Usage examples",
      },
      {
        id: ServiceIds.COST_MANAGEMENT,
        label: "Manage costs and usage",
        description: "Pricing information",
      },
    ],
  },
];

// Helper function to find a menu item by ID
export const findMenuItemById = (id: string): MenuItem | undefined => {
  for (const category of menuTree) {
    if (category.children) {
      const found = category.children.find((item) => item.id === id);
      if (found) return found;
    }
  }
  return undefined;
};

// Helper function to get all available IDs
export const getAllServiceIds = (): string[] => {
  return menuTree
    .flatMap((category) => category.children || [])
    .filter((item) => item.id)
    .map((item) => item.id!);
};
