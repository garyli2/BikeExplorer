import { PedalBike } from "@mui/icons-material";
import { Marker } from "react-map-gl/maplibre";
import { NetworkStation, NetworkModel } from "../models";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectIsNetworkSelected,
  selectSelectedNetwork,
  setPopupInfo,
} from "../store/networks";
import { useQuery } from "@tanstack/react-query";
import { fetchNetwork, fetchNetworks } from "../queryFns";
import { memo } from "react";
import PlaceIcon from "@mui/icons-material/Place";

const StationIcon = ({ station }: { station: NetworkStation }) => {
  let color: "success" | "warning" | "error";
  if (station.free_bikes && station.empty_slots) {
    color = "success";
  } else if (station.free_bikes || station.empty_slots) {
    color = "warning";
  } else {
    color = "error";
  }

  return <PlaceIcon color={color} />;
};

const MapPins = memo(() => {
  const isNetworkSelected = useAppSelector(selectIsNetworkSelected);
  const selectedNetwork = useAppSelector(selectSelectedNetwork);
  const id = selectedNetwork?.id;
  const { data: stationsData } = useQuery({
    queryKey: [id],
    queryFn: fetchNetwork(id),
    enabled: isNetworkSelected,
  });
  const { data: networksData } = useQuery({
    queryKey: [id],
    queryFn: fetchNetworks,
    enabled: !isNetworkSelected,
  });
  const dispatch = useAppDispatch();

  if (isNetworkSelected) {
    const stations: NetworkStation[] = stationsData?.network?.stations ?? [];
    return (
      <>
        {stations.map((station) => (
          <Marker
            key={station.id}
            longitude={station.longitude}
            latitude={station.latitude}
            anchor="bottom"
            onClick={(e) => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation();
              dispatch(setPopupInfo(station));
            }}
          >
            <StationIcon station={station} />
          </Marker>
        ))}
      </>
    );
  }

  const networks: NetworkModel[] = networksData?.networks ?? [];
  return (
    <>
      {networks.map((network) => (
        <Marker
          key={network.id}
          longitude={network.location.longitude}
          latitude={network.location.latitude}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            dispatch(setPopupInfo(network));
          }}
        >
          <PedalBike />
        </Marker>
      ))}
    </>
  );
});

export default MapPins;
