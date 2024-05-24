import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { AdminRoutes } from "./AdminRoutes";
import { UserRoutes } from "./UserRoutes";
import NotFoundPage from "../pages/NotFoundPage";
import LoginPage from "../pages/LoginPage";
import AdminLoginPage from "../pages/AdminLoginPage";

const AppRouter = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [tokenSession, setTokenSession] = useState(sessionStorage.getItem("token"));
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));
    const navigate = useNavigate();

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(localStorage.getItem("token"));
            setTokenSession(sessionStorage.getItem("token"));
            setIsAdmin(sessionStorage.getItem("isAdmin"));
            navigate("/");
        };

        window.addEventListener("storage", handleStorageChange);
    }, [navigate]);

    if (token || tokenSession) {
        return (
            <Routes>
                {
                    isAdmin
                        ? AdminRoutes.map(({ path, Component }) => (
                            <Route key={path} path={path} element={<Component />} exact />
                        ))
                        : UserRoutes.map(({ path, Component }) => (
                            <Route key={path} path={path} element={<Component />} exact />
                        ))
                }
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        );
    }

    if (!token || !tokenSession) {
        return (
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/login/admin" element={<AdminLoginPage />} />
                <Route key="*" path="*" element={<Navigate to={"/login"} />} />
            </Routes>
        );
    }
};

export default AppRouter;