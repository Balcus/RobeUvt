import type { FC } from "react";
import { Routes, Route } from "react-router";
import App from "../App";
import { Login } from "../components/Login";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Dashboard } from "../components/Dashboard";
import Unauthorized from "../components/Unauthorized";
import Home from "../components/Home";
import { Profile } from "../components/Profile";
import { Admin } from "../components/Admin";

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<App />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="unauthorized" element={<Unauthorized />}></Route>
        <Route
          path="dashboard"
          element={
            <ProtectedRoute requiredRole={["Administrator", "Owner"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole={["Administrator", "Owner"]}>
              <Admin />
            </ProtectedRoute>
          }
        ></Route>
        <Route path={"*"} element={<div>Not found</div>} />
      </Route>
    </Routes>
  );
};
