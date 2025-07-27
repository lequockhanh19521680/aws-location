import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

type SelectedItem = {
  group: string;
  label: string;
};

interface DefaultServiceComponentProps {
  selectedItem?: SelectedItem; // Make prop optional
}

export const DefaultServiceComponent = ({
  selectedItem,
}: DefaultServiceComponentProps) => {
  // Return early if no item is selected
  if (!selectedItem) {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          No service selected
        </Typography>
        <Typography paragraph>
          Please select a service from the navigation menu.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Service Details
      </Typography>
      <Typography paragraph>
        {`AWS Location Service ${
          selectedItem.group
        } provides ${selectedItem.label.toLowerCase()} functionality for your applications.`}
      </Typography>
    </Box>
  );
};
