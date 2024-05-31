import AdminMainPage from "../pages/AdminMainPage";
import AdminUniversityPage from "../pages/AdminUniversityPage";
import AdminUserPage from "../pages/AdminUserPage";
import AdminTeamPage from "../pages/AdminTeamPage";

export const AdminRoutes = [
    {
        path: "/",
        Component: AdminMainPage,
    },
    {
        path: "/universities",
        Component: AdminUniversityPage,
    },
    {
        path: "/users",
        Component: AdminUserPage,
    },
    {
        path: "/teams",
        Component: AdminTeamPage,
    },
];