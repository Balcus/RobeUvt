import { Button } from "@mui/material";
import { useState, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import "../../index.css";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useAuth } from "../../api/context/AuthContext";

export const Navbar: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { hasRole } = useAuth();
  const [isExpanded, setIsExpanded] = useState(true);

  const allNavItems = [
    { name: "Home", path: "/", icon: <HomeOutlinedIcon /> },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <BarChartOutlinedIcon />,
      allowedRoles: ["Administrator", "Owner"],
    },
    {
      name: "Administration",
      path: "/admin",
      icon: <SettingsOutlinedIcon />,
      allowedRoles: ["Administrator", "Owner"],
    },
    {
      name: "Payments",
      path: "/payments",
      icon: <AccountBalanceIcon />,
    },
    { name: "Profile", path: "/profile", icon: <AccountCircleOutlinedIcon /> },
  ] as const;

  const navItems = allNavItems.filter(
    (item) => !("allowedRoles" in item) || hasRole((item as any).allowedRoles)
  );

  return (
    <nav className={`sidebar ${isExpanded ? "expanded" : "collapsed"}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <span className="robe">Robe</span>
          <span className="uvt">UVT</span>
        </div>
        <Button
          disableRipple
          disableFocusRipple
          className="sidebar-toggle"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <MenuOpenIcon /> : <MenuIcon />}
        </Button>
      </div>
      <div className="sidebar-nav">
        <ul>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={location.pathname === item.path ? "active" : ""}
            >
              <Button
                onClick={() => navigate(item.path)}
                disableRipple
                disableFocusRipple
                title={item.name}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.name}</span>
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div className="sidebar-footer">
        <img src="uvt-logo.png" alt="UVT Logo" />
      </div>
    </nav>
  );
};
