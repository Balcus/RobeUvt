import { Button } from "@mui/material";
import { useState, type FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css"
import "../../index.css"
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const Navbar: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isExpanded, setIsExpanded] = useState(true);

    const navItems = [
        { name: "Home", path: "/", icon: <HomeOutlinedIcon /> },
        { name: "Dashboard", path: "/dashboard", icon: <BarChartOutlinedIcon /> },
        { name: "Profile", path: "/profile", icon: <AccountCircleOutlinedIcon /> },
    ];

    return (
        <nav className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
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
                        <li key={index} className={location.pathname === item.path ? "active" : ""}>
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
}

export default Navbar;