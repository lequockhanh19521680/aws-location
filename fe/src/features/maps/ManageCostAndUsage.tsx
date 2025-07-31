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

export const ManageMapCostAndUsage = () => {
  return (
    <Box p={4}>
      <Stack spacing={3}>
        <Typography variant="h4" gutterBottom>
          Manage Costs and Usage
        </Typography>

        <Typography variant="h5" color="primary">
          1. View a Customer Code Area
        </Typography>

        <Divider />

        <Box>
          <Typography variant="h5" gutterBottom>
            Amazon Location Service Pricing
          </Typography>
          <Typography>
            Beyond the Amazon Location Service free trial, you pay for the
            requests your application makes to the service outlined in the table
            below.
          </Typography>
          <Typography>
            Volume discounts are available for customers with a monthly usage
            exceeding $5,000. For more info, contact us.
          </Typography>
          <Typography>
            Price may vary based on request parameters. Please refer to the
            Pricing section in the developer guide.
          </Typography>
        </Box>

        <Divider />

        <Box>
          <Typography variant="h6" gutterBottom>
            Region: US East (N. Virginia)
          </Typography>
          <Typography>
            Some features are not available in all regions, please refer to
            Amazon Location Regions for details.
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
              <TableRow>
                <TableCell>Dynamic Maps</TableCell>
                <TableCell>Tiles</TableCell>
                <TableCell>$0.04</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Static Maps</TableCell>
                <TableCell>Static map images</TableCell>
                <TableCell>$0.05</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Open Data Dynamic Maps*</TableCell>
                <TableCell>Tiles</TableCell>
                <TableCell>$0.005</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        <Typography variant="body2" sx={{ fontStyle: "italic" }}>
          * Open Data Map tiles are built from Georchestrides COMO, Raven® Ems,
          and other open data sources.
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
            During this time, you will not be liable for monthly usage to the
            levels defined below.
          </Typography>
        </Box>

        <Paper sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Capability</TableCell>
                <TableCell>Monthly Free Tier (First 3 months)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Maps</TableCell>
                <TableCell>
                  50,000 Map Tile requests
                  <br />
                  5,000 Static Map requests
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Places</TableCell>
                <TableCell>
                  1,000 Autocomplete requests
                  <br />
                  5,000 Geocode requests (Reverse, Search)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Routes</TableCell>
                <TableCell>1,000 Routes calculated</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>

        <Button
          variant="outlined"
          href="https://us-east-1.console.aws.amazon.com/cloudwatch/home?region=us-east-1#alarmsV2:alarm/LocationExcute"
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<OpenInNewIcon />}
          sx={{ alignSelf: "flex-start", mt: 2 }}
        >
          View CloudWatch Alarm
        </Button>
      </Stack>
    </Box>
  );
};
