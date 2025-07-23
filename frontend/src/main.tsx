import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

function Toto() {
  return <p>Seems to work</p>;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toto />
  </StrictMode>,
);
