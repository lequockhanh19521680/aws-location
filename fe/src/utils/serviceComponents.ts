// src/utils/serviceComponents.ts

import { DefaultComponent } from "../components/DefaultComponent";
import { ManageMapCostAndUsage } from "../features/maps/ManageCostAndUsage";
import { ManageRouteCostAndUsage } from "../features/routes/ManageCostAndUsage";

import { MapConcepts } from "../features/maps/MapConcepts";
import { MapStyles } from "../features/maps/MapStyles";

import { ServiceId, ServiceIds } from "./serviceTypes";
import { PlaceApis } from "../features/places/PlaceApis";
import { PlaceHowTo } from "../features/places/PlaceHowTo";
import { PlaceManageCostAndUsage } from "../features/places/PlaceManageCostAndUsage";
import { PlaceConcepts } from "../features/places/PlaceConcepts";
import { RouteConcepts } from "../features/routes/RouteConcepts";
import { GeoConcepts } from "../features/geofences/GeoConcepts";

export const serviceComponents = {
  [ServiceIds.MAP_CONCEPTS]: MapConcepts,
  [ServiceIds.MAP_STYLES]: MapStyles,
  [ServiceIds.MAP_APIS]: DefaultComponent,
  [ServiceIds.MAP_HOW_TO]: DefaultComponent,
  [ServiceIds.MAP_COST_MANAGEMENT]: ManageMapCostAndUsage,
  [ServiceIds.PLACES_CONCEPTS]: PlaceConcepts,
  [ServiceIds.PLACES_APIS]: PlaceApis,
  [ServiceIds.PLACES_HOW_TO]: PlaceHowTo,
  [ServiceIds.PLACES_COST_MANAGEMENT]: PlaceManageCostAndUsage,
  [ServiceIds.ROUTES_CONCEPTS]: RouteConcepts,
  [ServiceIds.ROUTE_APIS]: DefaultComponent,
  [ServiceIds.ROUTES_HOW_TO]: DefaultComponent,
  [ServiceIds.ROUTES_COST_MANAGEMENT]: ManageRouteCostAndUsage,
  [ServiceIds.GEOFENCE_CONCEPTS]: GeoConcepts,
  [ServiceIds.GEOFENCE_GET_STARTED]: DefaultComponent,
  [ServiceIds.GEOFENCE_HOW_TO]: DefaultComponent,
  [ServiceIds.GEOFENCE_COST_MANAGEMENT]: ManageMapCostAndUsage,
  [ServiceIds.TRACKER_CONCEPTS]: DefaultComponent,
  [ServiceIds.TRACKER_GET_STARTED]: DefaultComponent,
  [ServiceIds.TRACKER_HOW_TO]: DefaultComponent,
  [ServiceIds.TRACKER_COST_MANAGEMENT]: ManageMapCostAndUsage,
};

export const getServiceComponent = (id: ServiceId) => {
  return serviceComponents[id] || DefaultComponent;
};
