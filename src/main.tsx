import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import "./assets/css/main.css";
import App from "./App.tsx";
import { rehydrateFromStorage } from "./redux/authSlice";

store.dispatch(rehydrateFromStorage());

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
