import { useState, type ChangeEvent, type FC, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../api/context/AuthContext";
import "./Login.css";
import "../../index.css";
import { Box, TextField } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const Login: FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [userCode, setUserCode] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(userCode, email);

    if (result.success) {
      navigate("/dashboard");
    } else {
      setError(result.error || "Login failed");
    }

    setIsLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-form">
        <div className="form-left">
          <img src="uvt-logo.png" alt="UVT" />
        </div>

        <div className="form-right">
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ "& .MuiTextField-root": { m: 1, width: "28ch" } }}
            noValidate
            autoComplete="off"
          >
            <div className="form-header">
              <AccountCircleIcon className="header-icon" />
            </div>

            <TextField
              label="User Code"
              value={userCode}
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUserCode(e.target.value)
              }
            />

            <TextField
              label="Email Address"
              type="email"
              value={email}
              required
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
            />

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <div className="register">
              <a href="#" onClick={() => {}}>
                No account? Request access
              </a>
            </div>

            {error && <p className="error">{error}</p>}
          </Box>
        </div>
      </div>
    </div>
  );
};
