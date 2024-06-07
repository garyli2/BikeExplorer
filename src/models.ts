export type NetworkModel = {
  name: string;
  id: string;
  location: {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
  };
  company: string[];
};

export type NetworkStation = {
  name: string;
  id: string;
  latitude: number;
  longitude: number;
  free_bikes: number;
  empty_slots: number;
};
