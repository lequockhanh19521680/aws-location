// src/utils/serviceComponents.ts

import { DefaultComponent } from "../components/DefaultComponent";
import { MapConcepts } from "../features/maps/MapConcepts";
import { MapStyles } from "../features/maps/MapStyles";

import { ServiceId, ServiceIds } from "./serviceTypes";

export const serviceComponents = {
  [ServiceIds.MAP_CONCEPTS]: MapConcepts,
  [ServiceIds.MAP_STYLES]: MapStyles,
  [ServiceIds.MAP_APIS]: DefaultComponent,
  [ServiceIds.MAP_HOW_TO]: DefaultComponent,
  [ServiceIds.MAP_COST_MANAGEMENT]: DefaultComponent,
  [ServiceIds.PLACES_CONCEPTS]: DefaultComponent,
  [ServiceIds.PLACES_APIS]: DefaultComponent,
  [ServiceIds.PLACES_HOW_TO]: DefaultComponent,
  [ServiceIds.PLACES_COST_MANAGEMENT]: DefaultComponent,
  [ServiceIds.ROUTES_CONCEPTS]: DefaultComponent,
  [ServiceIds.ROUTE_APIS]: DefaultComponent,
  [ServiceIds.ROUTES_HOW_TO]: DefaultComponent,
  [ServiceIds.ROUTES_COST_MANAGEMENT]: DefaultComponent,
  [ServiceIds.GEOFENCE_CONCEPTS]: DefaultComponent,
  [ServiceIds.GEOFENCE_GET_STARTED]: DefaultComponent,
  [ServiceIds.GEOFENCE_HOW_TO]: DefaultComponent,
  [ServiceIds.GEOFENCE_COST_MANAGEMENT]: DefaultComponent,
  [ServiceIds.TRACKER_CONCEPTS]: DefaultComponent,
  [ServiceIds.TRACKER_GET_STARTED]: DefaultComponent,
  [ServiceIds.TRACKER_HOW_TO]: DefaultComponent,
  [ServiceIds.TRACKER_COST_MANAGEMENT]: DefaultComponent,
};

export const getServiceComponent = (id: ServiceId) => {
  return serviceComponents[id] || DefaultComponent;
};
