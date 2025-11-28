import { useAuth } from "../../api/context/AuthContext";
import "./Profile.css"
import "../../index.css"
import type { FC } from "react";
import { TextField } from "@mui/material";

const Profile: FC = () => {
    const { user, isAuthenticated } = useAuth();
    const tableHeader = ["date", "amount", "method", "status"];


    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-avatar">
                    <img src="pfp.jpg" alt="Profile" />
                </div>
                <div className="profile-title">
                    <h1>{user!.name}</h1>
                    <p className="profile-id">{user?.id || "ID"}</p>
                </div>
            </div>

            {isAuthenticated && user ? (
                <>
                    <div className="about-section">
                        <h2>About</h2>
                        <div className="about-form">
                            <TextField
                                label="Email"
                                value={user.mail}
                                fullWidth
                                disabled
                            />
                            <TextField
                                label="Name"
                                value={user.name}
                                fullWidth
                                disabled
                            />
                            <TextField
                                label="Role"
                                value={user.role}
                                fullWidth
                                disabled
                            />
                        </div>
                    </div>
                    
                    <div className="payment-section">
                        <div className="section-header">
                            <h2>Payment information</h2>
                        </div>
                        <table className="payment-table">
                            <thead>
                                <tr>
                                    {tableHeader.map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Nov 15, 2024</td>
                                    <td>$1,250.00</td>
                                    <td>Bank Transfer</td>
                                    <td><span className="status-completed">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>Oct 28, 2024</td>
                                    <td>$890.50</td>
                                    <td>Credit Card</td>
                                    <td><span className="status-completed">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>Oct 15, 2024</td>
                                    <td>$2,100.00</td>
                                    <td>PayPal</td>
                                    <td><span className="status-pending">Pending</span></td>
                                </tr>
                                <tr>
                                    <td>Sep 30, 2024</td>
                                    <td>$750.25</td>
                                    <td>Bank Transfer</td>
                                    <td><span className="status-completed">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>Sep 12, 2024</td>
                                    <td>$450.00</td>
                                    <td>Stripe</td>
                                    <td><span className="status-failed">Failed</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </>
            ) : (
                <div className="login-message">
                    <p>Please log in to view your profile information.</p>
                </div>
            )}
        </div>
    );
}

export default Profile;