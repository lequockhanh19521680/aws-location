import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  Alert,
  CircularProgress,
  Button,
} from "@mui/material";
import { CompareArrows } from "@mui/icons-material";

// Supported languages and political views
const SUPPORTED_LANGUAGES = [
  { code: "default", name: "Default" },
  { code: "ar", name: "Arabic" },
  { code: "de", name: "German" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "he", name: "Hebrew" },
  { code: "it", name: "Italian" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "pt", name: "Portuguese" },
  { code: "ru", name: "Russian" },
  { code: "zh", name: "Chinese" },
  { code: "vi", name: "Vietnamese" },
];

const SUPPORTED_POLITICAL_VIEWS = [
  { code: "", name: "International (default)" },
  { code: "AR", name: "Argentina" },
  { code: "CY", name: "Cyprus" },
  { code: "EG", name: "Egypt" },
  { code: "GE", name: "Georgia" },
  { code: "GR", name: "Greece" },
  { code: "KE", name: "Kenya" },
  { code: "MA", name: "Morocco" },
  { code: "PS", name: "Palestine" },
  { code: "RS", name: "Serbia" },
  { code: "RU", name: "Russia" },
  { code: "SD", name: "Sudan" },
  { code: "SR", name: "Suriname" },
  { code: "SY", name: "Syria" },
  { code: "TR", name: "Türkiye" },
  { code: "TZ", name: "Tanzania" },
  { code: "UY", name: "Uruguay" },
];

// Coordinates
const CYPRUS_CENTER = [33.0714561, 35.1052139] as [number, number];
const JAPAN_CENTER = [139.76694, 35.68085] as [number, number];
const VIETNAM_CENTER = [105.853333, 21.028333] as [number, number];

export const LocalizationInternationalization = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const compareMapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const compareMap = useRef<maplibregl.Map | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState<string>("default");
  const [politicalView, setPoliticalView] = useState<string>("");
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [location, setLocation] = useState<[number, number]>(VIETNAM_CENTER);

  // Memoized function to get map URL
  const getMapUrl = useCallback(
    (customPoliticalView?: string) => {
      const apiUrl = new URL(
        `https://maps.geo.${
          import.meta.env.VITE_MAP_REGION
        }.amazonaws.com/v2/styles/${import.meta.env.VITE_MAP_STYLE}/descriptor`
      );

      apiUrl.searchParams.append("key", import.meta.env.VITE_MAP_API_KEY);

      if (language !== "default") {
        apiUrl.searchParams.append("language", language);
      }

      const viewToUse = customPoliticalView ?? politicalView;
      if (viewToUse) {
        apiUrl.searchParams.append("politicalView", viewToUse);
      }

      return apiUrl.toString();
    },
    [language, politicalView]
  );

  // Initialize main map (runs only once)
  const initializeMap = useCallback(() => {
    if (map.current || !mapContainer.current) return;

    setIsLoading(true);
    setError(null);

    try {
      const mapUrl = getMapUrl();
      console.log("Initializing map with URL:", mapUrl);

      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: mapUrl,
        center: location,
        zoom: compareMode ? 7.5 : 5,
      });

      map.current.on("load", () => {
        setIsMapLoaded(true);
        setIsLoading(false);
        setError(null);
        map.current?.addControl(new maplibregl.NavigationControl(), "top-left");
      });

      map.current.on("error", (e) => {
        console.error("Map error:", e.error);
        setError(`Map load error: ${e.error?.message || "Unknown error"}`);
        setIsLoading(false);
      });
    } catch (err) {
      console.error("Map initialization error:", err);
      setError(`Failed to initialize map: ${err.message}`);
      setIsLoading(false);
    }
  }, [getMapUrl, location, compareMode]);

  // Initialize comparison map
  const initializeCompareMap = useCallback(() => {
    if (!compareMapContainer.current || !map.current) return;

    try {
      const compareMapUrl = getMapUrl("TR");
      console.log("Initializing comparison map with URL:", compareMapUrl);

      compareMap.current = new maplibregl.Map({
        container: compareMapContainer.current,
        style: compareMapUrl,
        center: location,
        zoom: map.current.getZoom(),
      });

      // Sync movement between maps
      const syncMove = (
        sourceMap: maplibregl.Map,
        targetMap: maplibregl.Map
      ) => {
        sourceMap.on("move", () => {
          targetMap.setCenter(sourceMap.getCenter());
          targetMap.setZoom(sourceMap.getZoom());
        });
      };

      syncMove(map.current, compareMap.current);
      syncMove(compareMap.current, map.current);

      compareMap.current.on("load", () => {
        console.log("Comparison map loaded successfully");
      });
    } catch (err) {
      console.error("Comparison map initialization error:", err);
    }
  }, [getMapUrl, location]);

  // Update map style when parameters change
  const updateMapStyle = useCallback(() => {
    if (!map.current || isLoading) return;

    const newMapUrl = getMapUrl();
    console.log("Updating map with new URL:", newMapUrl);

    setIsLoading(true);
    try {
      map.current.setStyle(newMapUrl);
      setIsLoading(false);
    } catch (err) {
      console.error("Failed to update map style:", err);
      setError(`Failed to update map: ${err.message}`);
      setIsLoading(false);
    }
  }, [getMapUrl, isLoading]);

  // Toggle compare mode
  const toggleCompareMode = () => {
    const newCompareMode = !compareMode;
    setCompareMode(newCompareMode);
    setLocation(newCompareMode ? CYPRUS_CENTER : VIETNAM_CENTER);
  };

  // Handle location change
  const handleLocationChange = (loc: string) => {
    switch (loc) {
      case "cyprus":
        setLocation(CYPRUS_CENTER);
        break;
      case "japan":
        setLocation(JAPAN_CENTER);
        break;
      case "vietnam":
        setLocation(VIETNAM_CENTER);
        break;
      default:
        setLocation(VIETNAM_CENTER);
    }
  };

  // Initialize map on mount
  useEffect(() => {
    initializeMap();

    return () => {
      map.current?.remove();
      compareMap.current?.remove();
    };
  }, [initializeMap]);

  // Handle compare mode changes
  useEffect(() => {
    if (!isMapLoaded) return;

    if (compareMode) {
      initializeCompareMap();
    } else if (compareMap.current) {
      compareMap.current.remove();
      compareMap.current = null;
    }

    return () => {
      compareMap.current?.remove();
    };
  }, [compareMode, isMapLoaded, initializeCompareMap]);

  // Update map when parameters change
  useEffect(() => {
    if (isMapLoaded) {
      updateMapStyle();
    }
  }, [language, politicalView, location, isMapLoaded, updateMapStyle]);

  // Event handlers
  const handleLanguageChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  const handlePoliticalViewChange = (event: SelectChangeEvent) => {
    setPoliticalView(event.target.value);
  };

  if (error) {
    return (
      <Box sx={{ color: "error.main", p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Error loading map
        </Typography>
        <Typography paragraph>{error}</Typography>
        <Typography variant="body2">
          Please check:
          <ul>
            <li>API key validity</li>
            <li>Network connection</li>
            <li>Browser console for details</li>
          </ul>
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Control panel */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          p: 2,
          backgroundColor: "background.paper",
          boxShadow: 1,
          zIndex: 1,
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel id="language-select-label">Map Language</InputLabel>
          <Select
            labelId="language-select-label"
            value={language}
            label="Map Language"
            onChange={handleLanguageChange}
            disabled={isLoading}
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel id="political-view-select-label">
            Political View
          </InputLabel>
          <Select
            labelId="political-view-select-label"
            value={politicalView}
            label="Political View"
            onChange={handlePoliticalViewChange}
            disabled={isLoading || compareMode}
          >
            {SUPPORTED_POLITICAL_VIEWS.map((view) => (
              <MenuItem key={view.code || "default"} value={view.code}>
                {view.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel id="location-select-label">Location</InputLabel>
          <Select
            labelId="location-select-label"
            value={
              location === CYPRUS_CENTER
                ? "cyprus"
                : location === JAPAN_CENTER
                ? "japan"
                : "vietnam"
            }
            label="Location"
            onChange={(e) => handleLocationChange(e.target.value)}
            disabled={isLoading}
          >
            <MenuItem value="vietnam">Vietnam</MenuItem>
            <MenuItem value="japan">Japan</MenuItem>
            <MenuItem value="cyprus">Cyprus</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant={compareMode ? "contained" : "outlined"}
          onClick={toggleCompareMode}
          disabled={isLoading}
          startIcon={<CompareArrows />}
        >
          {compareMode ? "Exit Compare Mode" : "Compare Views"}
        </Button>

        {isLoading && <CircularProgress size={24} />}

        <Alert severity="info" sx={{ flexGrow: 1 }}>
          {compareMode
            ? "Comparing International view with Turkey's view of Cyprus"
            : politicalView
            ? `Showing ${
                SUPPORTED_POLITICAL_VIEWS.find((v) => v.code === politicalView)
                  ?.name
              } political view`
            : "Showing international view (default)"}
          {language !== "default" &&
            ` | Language: ${
              SUPPORTED_LANGUAGES.find((l) => l.code === language)?.name
            }`}
        </Alert>
      </Box>

      {/* Map container(s) */}
      <Box sx={{ flexGrow: 1, width: "100%", position: "relative" }}>
        {compareMode ? (
          <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
            {/* International View */}
            <Box
              sx={{
                flex: 1,
                height: "100%",
                position: "relative",
                borderRight: "1px solid #ccc",
              }}
            >
              <Box
                ref={mapContainer}
                sx={{ height: "100%", position: "relative" }}
              >
                {!isMapLoaded && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>
                      Loading international view...
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Turkey View */}
            <Box sx={{ flex: 1, height: "100%", position: "relative" }}>
              <Box
                ref={compareMapContainer}
                sx={{ height: "100%", position: "relative" }}
              >
                {compareMap.current === null && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                    }}
                  >
                    <CircularProgress />
                    <Typography sx={{ ml: 2 }}>
                      Loading Turkey's view...
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        ) : (
          <Box ref={mapContainer} sx={{ height: "100%", position: "relative" }}>
            {!isMapLoaded && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "rgba(255, 255, 255, 0.7)",
                }}
              >
                <CircularProgress />
                <Typography sx={{ ml: 2 }}>Loading map...</Typography>
              </Box>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
};
