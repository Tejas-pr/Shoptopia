import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
import ShopContextProvider from "./context/ShapContext.jsx";

createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
  </RecoilRoot>
);
