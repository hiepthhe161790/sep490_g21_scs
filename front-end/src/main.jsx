import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/authContext";
import router from "./routes";
import { store, persistor } from "./redux/store";
import "./input.css";
import "slick-carousel/slick/slick.css";
import { PublicProvider } from "./contexts/publicContext";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
        <PublicProvider>
          <RouterProvider router={router} />
          </PublicProvider>
        </AuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
