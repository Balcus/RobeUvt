import type { FC } from "react";
import { Link } from "react-router-dom";
import "./Unauthorized.css";
import "../../index.css";

const Unauthorized: FC = () => {
  return (
    <div className="unauthorized-container">
      <h1>403 - Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/">Go back home</Link>
    </div>
  );
};

export default Unauthorized;
