// src/utils/serviceTypes.ts
export const ServiceIds = {
  // Maps
  MAP_CONCEPTS: "map-concepts",
  MAP_STYLES: "map-styles",
  MAP_APIS: "map-apis",
  MAP_HOW_TO: "map-how-to",
  MAP_COST_MANAGEMENT: "map-cost-management",

  // Places
  PLACES_CONCEPTS: "places-concepts",
  PLACES_APIS: "places-apis",
  PLACES_HOW_TO: "places-how-to",
  PLACES_COST_MANAGEMENT: "places-cost-management",

  // Routes
  ROUTES_CONCEPTS: "routes-concepts",
  ROUTE_APIS: "route-apis",
  ROUTES_HOW_TO: "routes-how-to",
  ROUTES_COST_MANAGEMENT: "routes-cost-management",

  // Geofences
  GEOFENCE_CONCEPTS: "geofence-concepts",
  GEOFENCE_GET_STARTED: "geofence-get-started",
  GEOFENCE_HOW_TO: "geofence-how-to",
  GEOFENCE_COST_MANAGEMENT: "geofence-cost-management",

  // Trackers
  TRACKER_CONCEPTS: "tracker-concepts",
  TRACKER_GET_STARTED: "tracker-get-started",
  TRACKER_HOW_TO: "tracker-how-to",
  TRACKER_COST_MANAGEMENT: "tracker-cost-management",
} as const;

export type ServiceId = (typeof ServiceIds)[keyof typeof ServiceIds];
