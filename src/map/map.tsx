import Map, {
  GeolocateControl,
  FullscreenControl,
  NavigationControl,
  ScaleControl,
} from "react-map-gl/maplibre";

import "maplibre-gl/dist/maplibre-gl.css";
import { Box, Fab, Paper } from "@mui/material";
import {
  selectIsControlOpen,
  selectIsNetworkSelected,
  selectSelectedNetwork,
  setIsControlOpen,
} from "../store/networks";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import MapControl from "./map-control";
import MapPopup from "./networks/network-popup";
import MapPins from "./map-pins";
import NetworkPopup from "./networks/network-popup";
import StationPopup from "./stations/station-popup";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";

export default function NetworkMap() {
  const selectedNetwork = useAppSelector(selectSelectedNetwork);
  const isNetworkSelected = useAppSelector(selectIsNetworkSelected);
  const isControlOpen = useAppSelector(selectIsControlOpen);
  const dispatch = useAppDispatch();

  return (
    <Box display="flex" flexGrow={1} height="100vh">
      <Map
        initialViewState={{
          latitude: selectedNetwork?.lat ?? 0,
          longitude: selectedNetwork?.lon ?? 0,
          zoom: 3.5,
          bearing: 0,
          pitch: 0,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="https://raw.githubusercontent.com/go2garret/maps/main/src/assets/json/openStreetMap.json"
      >
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        <MapPins />
        {isNetworkSelected ? <StationPopup /> : <NetworkPopup />}

        <Box
          style={{
            position: "absolute",
            right: 0,
          }}
        >
          {isControlOpen ? (
            <Paper style={{ minWidth: "25vw", marginTop: 10, marginRight: 10 }}>
              <MapControl />
            </Paper>
          ) : (
            <Fab
              variant="extended"
              onClick={() => dispatch(setIsControlOpen(true))}
              style={{ marginTop: 10, marginRight: 10 }}
            >
              <SettingsIcon sx={{ mr: 1 }} />
              Map Control
            </Fab>
          )}
        </Box>
      </Map>
    </Box>
  );
}
