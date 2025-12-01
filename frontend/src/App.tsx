import "./App.css";
import { Outlet } from "react-router";
import { useAuth } from "./api/context/AuthContext";
import { Navbar } from "./components/Navbar";
import { useState } from "react";

function App() {
  const { isAuthenticated } = useAuth();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  return (
    <>
      {isAuthenticated && (
        <Navbar 
          isExpanded={isSidebarExpanded} 
          setIsExpanded={setIsSidebarExpanded} 
        />
      )}
      <div 
        className={`main-content ${
          !isAuthenticated 
            ? "no-sidebar" 
            : isSidebarExpanded 
            ? "" 
            : "sidebar-collapsed"
        }`}
      >
        <Outlet />
      </div>
    </>
  );
}

export default App;