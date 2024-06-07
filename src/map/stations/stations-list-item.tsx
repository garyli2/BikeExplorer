import { ListItemButton, ListItemText } from "@mui/material";
import { NetworkStation } from "../../models";
import { memo } from "react";
import { useMap } from "react-map-gl";

const StationsListItem = memo(
  ({
    station,
    style,
  }: {
    station: NetworkStation;
    style: React.CSSProperties;
  }) => {
    const map = useMap();
    
    return (
      <ListItemButton key={station.id} dense style={style} onClick={() => map.current.flyTo({center: [station.longitude, station.latitude], zoom: 14})}>
        <ListItemText primary={station.name} />
      </ListItemButton>
    );
  }
);

export default StationsListItem;
