import {
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Popup } from "react-map-gl/maplibre";
import {
  selectPopupInfo,
  setPopupInfo,
} from "../../store/networks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const StatusIcon = ({ data }: { data: number }) => {
  return data ? (
    <CheckCircleIcon color="success" />
  ) : (
    <CancelIcon color="error" />
  );
};

const StationPopup = () => {
  const dispatch = useAppDispatch();
  const popupInfo = useAppSelector(selectPopupInfo);

  if (!(popupInfo && "longitude" in popupInfo)) return null;

  // station popup
  return (
    <Popup
      anchor="top"
      longitude={popupInfo.longitude}
      latitude={popupInfo.latitude}
      onClose={() => {
        dispatch(setPopupInfo(null));
      }}
    >
      <Grid container spacing={2} padding={1}>
        <Grid item xs={12}>
          <Typography textAlign="center" fontWeight="bold">
            {popupInfo.name}
          </Typography>
          <Divider />
        </Grid>
        {/* Free bikes */}
        <Grid item xs={6}>
          <Typography>Free bikes</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{popupInfo.free_bikes}</Typography>
        </Grid>
        <Grid item xs={3}>
          <StatusIcon data={popupInfo.free_bikes} />
        </Grid>
        {/* Free bikes */}
        <Grid item xs={6}>
          <Typography>Empty Slots</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography>{popupInfo.empty_slots}</Typography>
        </Grid>
        <Grid item xs={3}>
          <StatusIcon data={popupInfo.empty_slots} />
        </Grid>
      </Grid>
    </Popup>
  );
};

export default StationPopup;
