import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export const ManageRouteCostAndUsage = () => {
  return (
    <Box p={4}>
      <Stack spacing={3}>
        <Typography variant="h4" gutterBottom>
          Manage Costs and Usage
        </Typography>

        <Box>
          <Typography variant="h5" gutterBottom>
            Amazon Location Service Pricing
          </Typography>
          <Typography>
            Discover Amazon Location Service's affordable pricing for maps,
            places, routing, tracking & geofencing. No upfront costs - pay only
            for what you use.
          </Typography>
          <Typography>
            Beyond the Amazon Location Service free trial, you pay for the
            requests your application makes to the service outlined in the table
            below.
          </Typography>
          <Typography>
            Volume discounts are available for customers with a monthly usage
            exceeding $5,000.{" "}
            <Typography
              component="a"
              href="https://aws.amazon.com/contact-us/"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              sx={{ textDecoration: "underline" }}
            >
              For more info Contact us.
            </Typography>
          </Typography>
          <Typography>
            Price may vary based on request parameters, please refer to the
            Pricing section in the developer guide.
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Region: US East (Ohio)
          </Typography>
          <Typography>
            Some features are not available in all regions, please refer to{" "}
            <Typography
              component="a"
              href="https://docs.aws.amazon.com/location/latest/developerguide/what-is.html#what-is-regions"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              sx={{ textDecoration: "underline" }}
            >
              Amazon Location Regions
            </Typography>{" "}
            for details.
          </Typography>
        </Box>

        <Paper sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Feature</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Price (per 1,000 requests)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Calculate Routes */}
              <TableRow>
                <TableCell rowSpan={3}>Calculate Routes</TableCell>
                <TableCell>Core (car, truck, or pedestrian mode)</TableCell>
                <TableCell>$0.50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Advanced (all other travel modes such as scooter)
                </TableCell>
                <TableCell>$1.50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Premium (including Toll Cost calculation)</TableCell>
                <TableCell>$4.00</TableCell>
              </TableRow>

              {/* Calculate Route Matrix */}
              <TableRow>
                <TableCell rowSpan={2}>Calculate Route Matrix*</TableCell>
                <TableCell>Core (car, truck, or pedestrian mode)</TableCell>
                <TableCell>$0.50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Advanced (all other travel modes such as scooter)
                </TableCell>
                <TableCell>$1.50</TableCell>
              </TableRow>

              {/* Snap to Roads */}
              <TableRow>
                <TableCell rowSpan={2}>Snap to Roads</TableCell>
                <TableCell>
                  Advanced (up to 200 GPS points; car, truck, or pedestrian
                  mode)**
                </TableCell>
                <TableCell>$1.50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Premium (up to 5,000 GPS points; no restriction on travel
                  mode)
                </TableCell>
                <TableCell>$4.00</TableCell>
              </TableRow>

              {/* Optimize Waypoints */}
              <TableRow>
                <TableCell rowSpan={2}>Optimize Waypoints</TableCell>
                <TableCell>
                  Advanced (up to 30 waypoints; car, truck, and pedestrian mode;
                  no optional parameter)**
                </TableCell>
                <TableCell>$1.50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Premium (up to 50 waypoints; no restriction on travel mode;
                  with optional parameters)
                </TableCell>
                <TableCell>$4.00</TableCell>
              </TableRow>

              {/* Calculate Isolines */}
              <TableRow>
                <TableCell rowSpan={2}>Calculate Isolines***</TableCell>
                <TableCell>
                  Advanced (up to 60 min or 100KM travel distance; car, truck,
                  or pedestrian mode)**
                </TableCell>
                <TableCell>$1.50</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  Premium (up to 180 min or 300KM travel distance; no
                  restriction on travel mode)
                </TableCell>
                <TableCell>$4.00</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          * When using the Matrix Routing API, the number of routes calculated
          in each request = number of origins x number of destination. For
          example, when using a 25 matrix size of 300 origins by 100
          destinations, the total number of routes calculated is 30,000 (300 x
          100).
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          ** Other constraints may apply for Advanced Snap to Roads, Optimize
          Waypoints, and Calculate Isolines, please refer to Routes Pricing for
          details.
        </Typography>
        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          *** Calculate Isolines price is based on per isoline returned. Each
          isoline returned is considered one calculation.
        </Typography>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Amazon Location Service Free Trial
          </Typography>
          <Typography>
            You can evaluate Amazon Location Service using the free trial during
            your first three months of usage.
          </Typography>
          <Typography>
            During that time, you will not be billed for monthly usage to the
            levels defined for listed APIs in the table below. If your usage
            exceeds the free trial levels or includes Advanced, Premium or
            Stored features, you will be billed for the additional usage
            according to paid tier rates.
          </Typography>
        </Box>

        <Paper sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Capabilities</TableCell>
                <TableCell>Included monthly, for 3 months</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Maps</TableCell>
                <TableCell>
                  500,000 Map Tile requests (vector or raster)
                  <br />
                  5,000 Static Map requests
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Places</TableCell>
                <TableCell>
                  10,000 Autocomplete or Suggest requests (Label)
                  <br />
                  20,000 Geocode, Reverse Geocode, Search Text, Search Nearby,
                  or Get Place requests (Core)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Routes</TableCell>
                <TableCell>
                  10,000 Routes calculated in Routes or Route Matrix (Core)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Trackers</TableCell>
                <TableCell>
                  200,000 Positions written
                  <br />
                  10,000 Batch position reads
                  <br />
                  5,000 Devices deleted
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Geofences</TableCell>
                <TableCell>
                  200,000 Positions evaluated
                  <br />
                  10,000 Geofences created, deleted or described
                  <br />
                  10,000 Geofence list requests
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Service Resources</TableCell>
                <TableCell>
                  10,000 Resource create, read, update, delete, or list requests
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            href="https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1#alarmsV2:alarm/LocationExcute"
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNewIcon />}
          >
            View CloudWatch Alarm
          </Button>
          <Button
            variant="contained"
            href="https://aws.amazon.com/contact-us/"
            target="_blank"
            rel="noopener noreferrer"
            endIcon={<OpenInNewIcon />}
          >
            Request a quote
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
