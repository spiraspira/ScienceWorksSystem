import AdminMainPage from "../pages/AdminMainPage";
import AdminUniversityPage from "../pages/AdminUniversityPage";
import AdminUserPage from "../pages/AdminUserPage";
import AdminTeamPage from "../pages/AdminTeamPage";
import AdminCommitteePage from "../pages/AdminCommitteePage";

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
    {
        path: "/committees",
        Component: AdminCommitteePage,
    },
];