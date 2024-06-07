import { ListItemButton, ListItemText } from "@mui/material";
import {
  selectSearchTerm,
  selectSelectedNetwork,
  setSearchTerm,
  setSelectedNetwork,
} from "../../store/networks";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import type { NetworkModel } from "../../models";
import { useMap } from "react-map-gl";

export default function NetworkListItem({
  network,
  style,
}: {
  network: NetworkModel;
  style: React.CSSProperties;
}) {
  const dispatch = useAppDispatch();
  const map = useMap();
  const selectedNetwork = useAppSelector(selectSelectedNetwork);

  return (
    <ListItemButton
      selected={selectedNetwork?.id === network.id}
      onClick={() => {
        dispatch(setSearchTerm(""));
        map.current.flyTo({
          center: [network.location.longitude, network.location.latitude],
          zoom: 10,
        });
        dispatch(setSelectedNetwork(network));
      }}
      key={network.id}
      dense
      style={{ ...style, borderBottom: "1px solid #d6d6d6" }}
    >
      <ListItemText
        primary={network.name}
        secondary={
          (network.location?.city ?? "Unknown city") +
          ", " +
          (network.location?.country ?? "Unknown country")
        }
      />
    </ListItemButton>
  );
}
