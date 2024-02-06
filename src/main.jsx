import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Study } from "./Study";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <Study />
  </StrictMode>
);
