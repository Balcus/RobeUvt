import type { FC } from "react";
import { Routes, Route } from "react-router";
import App from "../App";
import { Login } from "../components/Login";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { Dashboard } from "../components/Dashboard";
import Profile from "../components/Profile";

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path={"/"} element={<App />}>
        <Route path="login" element={<Login />}></Route>
        <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}></Route>
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
        <Route path={"*"} element={<div>Not found</div>} />
      </Route>
    </Routes>
  );
};