import { useEffect, useRef, useState, useCallback } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";

// Định nghĩa json object chứa các center theo key quốc gia
const COUNTRY_CENTERS: Record<string, [number, number]> = {
  cyprus: [33.0714561, 35.1052139],
  japan: [139.76694, 35.68085],
  vietnam: [105.853333, 21.028333],
  south_korea: [127.7669, 35.9078],
  france: [2.2137, 46.2276],
  usa: [-95.7129, 37.0902],
  germany: [10.4515, 51.1657],
  uk: [-3.435973, 55.378051],
  brazil: [-51.9253, -14.235],
  canada: [-106.3468, 56.1304],
  australia: [133.7751, -25.2744],
  thailand: [100.9925, 15.87],
};

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

const fetchStyleObject = async (styleUrl: string) => {
  const response = await fetch(styleUrl);
  if (!response.ok) throw new Error("Cannot fetch style");
  return await response.json();
};

const setPreferredLanguage = (style: any, language: string) => {
  let nextStyle = { ...style };
  nextStyle.layers = nextStyle.layers.map((l: any) => {
    if (l.type !== "symbol" || !l?.layout?.["text-field"]) return l;
    return updateLayer(l, /^name:([A-Za-z\-\_]+)$/g, `name:${language}`);
  });
  return nextStyle;
};

function updateLayer(
  layer: any,
  prevPropertyRegex: RegExp,
  nextProperty: string
) {
  return {
    ...layer,
    layout: {
      ...layer.layout,
      "text-field": recurseExpression(
        layer.layout["text-field"],
        prevPropertyRegex,
        nextProperty
      ),
    },
  };
}

function recurseExpression(
  exp: any,
  prevPropertyRegex: RegExp,
  nextProperty: string
): any {
  if (!Array.isArray(exp)) return exp;
  if (exp[0] !== "coalesce")
    return exp.map((v: any) =>
      recurseExpression(v, prevPropertyRegex, nextProperty)
    );

  const first = exp[1];
  const second = exp[2];
  let isMatch =
    Array.isArray(first) &&
    first[0] === "get" &&
    !!first[1].match(prevPropertyRegex)?.[0];

  isMatch = isMatch && Array.isArray(second) && second[0] === "get";
  isMatch = isMatch && !exp?.[4];

  if (!isMatch)
    return exp.map((v: any) =>
      recurseExpression(v, prevPropertyRegex, nextProperty)
    );

  return [
    "coalesce",
    ["get", nextProperty],
    ["get", "name:en"],
    ["get", "name"],
  ];
}

const getStyleWithPreferredLanguage = async (
  styleUrl: string,
  preferredLanguage: string
) => {
  const styleObject = await fetchStyleObject(styleUrl);
  if (
    preferredLanguage &&
    preferredLanguage !== "default" &&
    preferredLanguage !== "en"
  ) {
    return setPreferredLanguage(styleObject, preferredLanguage);
  }
  return styleObject;
};

export const LocalizationInternationalization = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const map = useRef<maplibregl.Map | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState("default");
  // Khởi tạo location mặc định ở Việt Nam
  const [location, setLocation] = useState<[number, number]>(
    COUNTRY_CENTERS["vietnam"]
  );
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isStyleUpdating, setIsStyleUpdating] = useState(false);

  const getMapUrl = useCallback(() => {
    const apiUrl = new URL(
      `https://maps.geo.${
        import.meta.env.VITE_MAP_REGION
      }.amazonaws.com/v2/styles/${import.meta.env.VITE_MAP_STYLE}/descriptor`
    );
    apiUrl.searchParams.append("key", import.meta.env.VITE_MAP_API_KEY);
    return apiUrl.toString();
  }, []);

  const initializeMap = useCallback(async () => {
    if (map.current || !mapContainer.current) return;
    setIsLoading(true);
    setError(null);
    try {
      const mapUrl = getMapUrl();
      const styleObj = await getStyleWithPreferredLanguage(mapUrl, language);
      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: styleObj,
        center: location,
        zoom: 5,
      });
      map.current.on("load", () => {
        setIsMapLoaded(true);
        setIsLoading(false);
        setError(null);
        map.current?.addControl(new maplibregl.NavigationControl(), "top-left");
      });
      map.current.on("error", (e: any) => {
        setError(`Map load error: ${e.error?.message || "Unknown error"}`);
        setIsLoading(false);
      });
    } catch (err: any) {
      setError(`Failed to initialize map: ${err.message}`);
      setIsLoading(false);
    }
  }, [getMapUrl, language, location]);

  const updateMapStyle = useCallback(async () => {
    if (!map.current || isStyleUpdating) return;
    setIsStyleUpdating(true);
    const mapUrl = getMapUrl();
    try {
      const styleObj = await getStyleWithPreferredLanguage(mapUrl, language);
      map.current.once("style.load", () => {
        setIsStyleUpdating(false);
      });
      map.current.setStyle(styleObj);
    } catch (err: any) {
      setError(`Failed to update map: ${err.message}`);
      setIsStyleUpdating(false);
    }
  }, [getMapUrl, isStyleUpdating, language]);

  // Xử lý thay đổi location bằng cách lấy ra tọa độ từ JSON COUNTRY_CENTERS
  const handleLocationChange = (loc: string) => {
    if (COUNTRY_CENTERS[loc]) {
      setLocation(COUNTRY_CENTERS[loc]);
    } else {
      setLocation(COUNTRY_CENTERS["vietnam"]);
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;
    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [initializeMap]);

  useEffect(() => {
    if (isMapLoaded) {
      updateMapStyle();
    }
  }, [language, location, isMapLoaded, updateMapStyle]);

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value as string);
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
          <InputLabel id="location-select-label">Location</InputLabel>
          <Select
            labelId="location-select-label"
            value={
              Object.keys(COUNTRY_CENTERS).find(
                (key) =>
                  COUNTRY_CENTERS[key][0] === location[0] &&
                  COUNTRY_CENTERS[key][1] === location[1]
              ) || "vietnam"
            }
            label="Location"
            onChange={(e) =>
              handleLocationChange((e.target as HTMLInputElement).value)
            }
            disabled={isLoading}
          >
            {Object.entries(COUNTRY_CENTERS).map(([key]) => (
              <MenuItem key={key} value={key}>
                {key
                  .split("_")
                  .map(
                    (w) => w.charAt(0).toUpperCase() + w.slice(1) // Viết hoa mỗi từ
                  )
                  .join(" ")}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Alert severity="info" sx={{ flexGrow: 1 }}>
          Showing international view (default)
          {language !== "default" &&
            ` | Language: ${
              SUPPORTED_LANGUAGES.find((l) => l.code === language)?.name
            }`}
        </Alert>
      </Box>
      <Box sx={{ flexGrow: 1, width: "100%", position: "relative" }}>
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
                backgroundColor: "rgba(255,255,255,0.7)",
              }}
            >
              <CircularProgress />
              <Typography sx={{ ml: 2 }}>Loading map...</Typography>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
