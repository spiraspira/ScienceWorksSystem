import AdminMainPage from "../pages/AdminMainPage";
import AdminUniversityPage from "../pages/AdminUniversityPage";

export const AdminRoutes = [
    {
        path: "/",
        Component: AdminMainPage,
    },
    {
        path: "/universities",
        Component: AdminUniversityPage,
    },
];