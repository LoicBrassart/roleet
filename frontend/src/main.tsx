import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Button } from "./lib/shadcn/generated/ui/button";

function Toto() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Button variant={"outline"}>Click me</Button>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Toto />
  </StrictMode>,
);
