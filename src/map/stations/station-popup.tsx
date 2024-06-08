import { Divider, Grid, Tooltip, Typography } from "@mui/material";
import { Popup } from "react-map-gl/maplibre";
import { selectPopupInfo, setPopupInfo } from "../../store/networks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import type { NetworkStation } from "../../models";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const StatusIcon = ({ data }: { data: number }) => {
  return data ? (
    <CheckCircleIcon color="success" />
  ) : (
    <CancelIcon color="error" />
  );
};

const getEbikes = (station: NetworkStation) => {
  return station?.extra?.ebikes;
};

const hasEbikes = (station: NetworkStation) => {
  return station?.extra?.has_ebikes || getEbikes(station) !== undefined;
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
      <Grid container padding={1}>
        <Grid item xs={12} marginBottom={1}>
          <Typography textAlign="center" variant="body1">
            {popupInfo.name}
          </Typography>
          <Divider />
        </Grid>
        {/* Free bikes */}
        <Grid item xs={6}>
          <Typography textAlign="right">Free bikes</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography textAlign="right">{popupInfo.free_bikes}</Typography>
        </Grid>
        <Grid item xs={3} paddingLeft={1}>
          <StatusIcon data={popupInfo.free_bikes} />
        </Grid>

        {/* Free bikes */}
        <Grid item xs={6}>
          <Typography textAlign="right">Empty Slots</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography textAlign="right">{popupInfo.empty_slots}</Typography>
        </Grid>
        <Grid item xs={3} paddingLeft={1}>
          <StatusIcon data={popupInfo.empty_slots} />
        </Grid>

        {hasEbikes(popupInfo) && (
          <>
            <Grid item xs={6}>
              <Typography textAlign="right">E-bikes</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography textAlign="right">{getEbikes(popupInfo)}</Typography>
            </Grid>
            <Grid item xs={3} paddingLeft={1}>
              <StatusIcon data={getEbikes(popupInfo)} />
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Tooltip title={popupInfo.timestamp} placement="bottom-end">
            <Typography textAlign="right" variant="caption" display="block">
              {dayjs(popupInfo.timestamp).fromNow()}
            </Typography>
          </Tooltip>
        </Grid>
      </Grid>
    </Popup>
  );
};

export default StationPopup;
