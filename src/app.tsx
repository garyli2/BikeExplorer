import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createHashRouter,
  createMemoryRouter,
  RouterProvider,
} from "react-router-dom";
import MapControl from "./map/map-control";
import NetworkMap from "./map/map";
import { Provider } from "react-redux";
import { store } from "./store/store";

const router = createMemoryRouter([
  {
    path: "/",
    element: <NetworkMap />,
  },
]);

const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>
  );
};

const root = createRoot(document.getElementById("react"));
root.render(<App />);
