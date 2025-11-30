import "./App.css";
import { Outlet } from "react-router";
import { useAuth } from "./api/context/AuthContext";
import { Navbar } from "./components/Navbar";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      {isAuthenticated && <Navbar />}
      <div className={`main-content ${!isAuthenticated ? "no-sidebar" : ""}`}>
        <Outlet />
      </div>
    </>
  );
}

export default App;
