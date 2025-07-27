export const ServiceIds = {
  MAP_CONCEPTS: "map-concepts",
  MAP_STYLES: "map-styles",
  MAP_APIS: "map-apis",
  HOW_TO: "how-to",
  COST_MANAGEMENT: "cost-management",
  PLACES_CONCEPTS: "places-concepts",
  PLACES_APIS: "places-apis",
  ROUTES_CONCEPTS: "routes-concepts",
  ROUTE_APIS: "route-apis",
  GEOFENCE_CONCEPTS: "geofence-concepts",
  GET_STARTED: "get-started",
  TRACKER_CONCEPTS: "tracker-concepts",
} as const;

export type ServiceId = (typeof ServiceIds)[keyof typeof ServiceIds];
