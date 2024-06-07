import {
  Box,
  Button,
  CircularProgress,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useWindowSize } from "@uidotdev/usehooks";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import { Logout } from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import { fetchNetwork, fetchNetworks } from "../queryFns";
import {
  selectIsNetworkSelected,
  selectSearchTerm,
  selectSelectedNetwork,
  setSearchTerm,
  setSelectedNetwork,
} from "../store/networks";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { NetworkModel, NetworkStation } from "../models";
import NetworkListItem from "./networks/networks-list-item";
import StationsListItem from "./stations/stations-list-item";
import { useMap } from "react-map-gl";

const getNetworkSearchKey = (network: NetworkModel) =>
  `${network.name ?? ""}${network.location?.city ?? "Unknown city"}, ${
    network.location?.country ?? "Unknown country"
  }`.toLowerCase();

const getStationSearchKey = (network: NetworkStation) =>
  `${network.name ?? ""}}`.toLowerCase();

const MapControl = () => {
  const {
    isPending: isNetworksPending,
    error: networksError,
    data: networksData,
  } = useQuery({
    queryKey: ["networks"],
    queryFn: fetchNetworks,
  });
  const { height } = useWindowSize();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector(selectSearchTerm);
  const selectedNetwork = useAppSelector(selectSelectedNetwork);
  const isNetworkSelected = useAppSelector(selectIsNetworkSelected);
  const id = selectedNetwork?.id;
  const {
    isPending: isStationsPending,
    error: stationsError,
    data: stationsData,
  } = useQuery({
    queryKey: [id],
    queryFn: fetchNetwork(id),
    enabled: isNetworkSelected,
  });
  const map = useMap();

  if (
    (isNetworksPending && !isNetworkSelected) ||
    (isStationsPending && isNetworkSelected)
  ) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={3}
        height={height - 400}
      >
        <CircularProgress />
        <Typography>Loading data</Typography>
      </Box>
    );
  }

  if (networksError || stationsError) {
    return <h1>Error loading!</h1>;
  }

  let arr: NetworkStation[] | NetworkModel[] = [];
  let filteredArr: NetworkStation[] | NetworkModel[] = [];
  let renderRow;

  if (isNetworkSelected) {
    arr = stationsData.network.stations as NetworkStation[];
    filteredArr = arr.filter((station) =>
      getStationSearchKey(station).includes(searchTerm)
    ) as NetworkStation[];
    renderRow = (props: ListChildComponentProps) => {
      const { index: i, style } = props;
      const station = filteredArr[i] as NetworkStation;
      return <StationsListItem station={station} style={style} />;
    };
  } else {
    arr = networksData.networks as NetworkModel[];
    filteredArr = arr.filter((network) =>
      getNetworkSearchKey(network).includes(searchTerm)
    ) as NetworkModel[];
    renderRow = (props: ListChildComponentProps) => {
      const { index: i, style } = props;
      const network = filteredArr[i] as NetworkModel;
      return <NetworkListItem network={network} style={style} />;
    };
  }

  return (
    <Box display="flex" gap={2} flexDirection="column" padding={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={3}
      >
        <Typography variant="h5" style={{ flexGrow: 1, fontWeight: "bolder" }}>
          {isNetworkSelected ? selectedNetwork.name : "Select a bike network"}
        </Typography>
        {isNetworkSelected && (
          <Button
            variant="contained"
            startIcon={<Logout />}
            onClick={() => {
              map.current.flyTo({ center: [0, 0], zoom: 1 });
              dispatch(setSearchTerm(""));
              dispatch(setSelectedNetwork(null));
            }}
          >
            Back
          </Button>
        )}
      </Box>
      <Input
        placeholder={
          isNetworkSelected
            ? "Search for station names"
            : "Search for network names or locations"
        }
        startAdornment={
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        }
        onChange={(e) => dispatch(setSearchTerm(e.target.value.toLowerCase()))}
        style={{ flexGrow: 2 }}
        value={searchTerm}
      />

      <FixedSizeList
        height={Math.max(300, height / 3)}
        width="100%"
        itemSize={50}
        itemCount={filteredArr.length}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
};

export default MapControl;
