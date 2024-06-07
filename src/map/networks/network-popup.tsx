import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Popup } from "react-map-gl/maplibre";
import {
  selectPopupInfo,
  setPopupInfo,
  setSelectedNetwork,
} from "../../store/networks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import BusinessIcon from "@mui/icons-material/Business";
import { useMap } from "react-map-gl";

const NetworkPopup = () => {
  const dispatch = useAppDispatch();
  const popupInfo = useAppSelector(selectPopupInfo);

  if (!popupInfo || !("location" in popupInfo)) return null;

  // station popup
  return (
    <Popup
      anchor="top"
      longitude={popupInfo.location.longitude}
      latitude={popupInfo.location.latitude}
      onClose={() => dispatch(setPopupInfo(null))}
      style={{ padding: 3 }}
    >
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography fontWeight="bold">{popupInfo.name}</Typography>
        <Divider />
        <List dense>
          {popupInfo.company.map((company) => (
            <ListItem key={company}>
              <ListItemIcon>
                <BusinessIcon />
              </ListItemIcon>
              <ListItemText primary={company} />
            </ListItem>
          ))}
        </List>

        <Button
          onClick={() => dispatch(setSelectedNetwork(popupInfo))}
          variant="contained"
        >
          Select
        </Button>
      </Box>
    </Popup>
  );
}

export default NetworkPopup;