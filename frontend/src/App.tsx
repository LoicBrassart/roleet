import { Outlet } from "react-router-dom";
import "./globals.css";

function App() {
  return (
    <main className="w-8/12 m-auto dark">
      <Outlet />
    </main>
  );
}

export default App;
