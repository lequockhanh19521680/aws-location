// src/utils/serviceComponents.ts
import { MapConcepts, MapStyles } from "../components/services/MapServices";
import { PlaceConcepts } from "../components/services/PlaceServices";
import { RouteConcepts } from "../components/services/RouteServices";
import { GeoConcepts as GeofenceBasics } from "../components/services/GeofenceServices";
import { TrackerConcepts as TrackerBasics } from "../components/services/TrackerServices";
import { DefaultServiceComponent } from "../components/services/DefaultService";
import { ServiceId, ServiceIds } from "./serviceTypes";

export const serviceComponents: Record<ServiceId, React.ComponentType<any>> = {
  [ServiceIds.MAP_CONCEPTS]: MapConcepts,
  [ServiceIds.MAP_STYLES]: MapStyles,
  [ServiceIds.MAP_APIS]: DefaultServiceComponent,
  [ServiceIds.HOW_TO]: DefaultServiceComponent,
  [ServiceIds.COST_MANAGEMENT]: DefaultServiceComponent,
  [ServiceIds.PLACES_CONCEPTS]: PlaceConcepts,
  [ServiceIds.PLACES_APIS]: DefaultServiceComponent,
  [ServiceIds.ROUTES_CONCEPTS]: RouteConcepts,
  [ServiceIds.ROUTE_APIS]: DefaultServiceComponent,
  [ServiceIds.GEOFENCE_CONCEPTS]: GeofenceBasics,
  [ServiceIds.GET_STARTED]: DefaultServiceComponent,
  [ServiceIds.TRACKER_CONCEPTS]: TrackerBasics,
};

export const getServiceComponent = (id: ServiceId) => {
  return serviceComponents[id] || DefaultServiceComponent;
};
