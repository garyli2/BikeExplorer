import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import type { NetworkModel, NetworkStation } from "../models";

export interface NetworkStore {
  selectedNetwork: {
    id: string;
    name: string;
    lat: number;
    lon: number;
  };
  popupInfo: NetworkModel | NetworkStation;
  searchTerm: string;
  isControlOpen: boolean;
}

const initialState: NetworkStore = {
  selectedNetwork: null,
  popupInfo: null,
  searchTerm: "",
  isControlOpen: true,
};

export const networkSlice = createSlice({
  name: "network",
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSelectedNetwork: (state, action: PayloadAction<NetworkModel>) => {
      if (!action.payload) {
        state.selectedNetwork = null;
      } else {
        state.selectedNetwork = {
          id: action.payload.id,
          name: action.payload.name,
          lat: action.payload.location.latitude,
          lon: action.payload.location.longitude,
        };
      }

      // reset popup so there isn't any lingering
      state.popupInfo = null;
    },
    setPopupInfo: (
      state,
      action: PayloadAction<NetworkModel | NetworkStation>
    ) => {
      state.popupInfo = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setIsControlOpen: (state, action: PayloadAction<boolean>) => {
      state.isControlOpen = action.payload;
    },
  },
});

export const {
  setSelectedNetwork,
  setPopupInfo,
  setSearchTerm,
  setIsControlOpen,
} = networkSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectSelectedNetwork = (state: RootState) =>
  state.networks.selectedNetwork;
export const selectIsNetworkSelected = (state: RootState) =>
  state.networks.selectedNetwork !== null;
export const selectPopupInfo = (state: RootState) => state.networks.popupInfo;
export const selectSearchTerm = (state: RootState) => state.networks.searchTerm;
export const selectIsControlOpen = (state: RootState) =>
  state.networks.isControlOpen;

export default networkSlice.reducer;
