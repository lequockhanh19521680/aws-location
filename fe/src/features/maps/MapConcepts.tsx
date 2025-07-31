import { Map, Language } from "@mui/icons-material";
import { MapTerminology } from "../../components/maps/MapTerminology";
import { LocalizationInternationalization } from "../../components/maps/LocalizationInternationalization";
import { CommonTabBar } from "../../components/common/CommonTabBar";

export const MapConcepts = () => {
  const tabs = [
    {
      label: "Map Terminology",
      icon: <Map fontSize="small" />,
      component: <MapTerminology />,
    },
    {
      label: "Localization",
      icon: <Language fontSize="small" />,
      component: <LocalizationInternationalization />,
    },
  ];

  return <CommonTabBar tabs={tabs} />;
};
