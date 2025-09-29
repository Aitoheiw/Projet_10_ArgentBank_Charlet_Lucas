import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./assets/css/main.css";
import App from "./App.tsx";
import { rehydrateFromStorage, fetchProfile } from "./redux/authSlice";

store.dispatch(rehydrateFromStorage());
if (localStorage.getItem("token")) {
  store.dispatch(fetchProfile());
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
