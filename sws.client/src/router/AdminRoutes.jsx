import AdminMainPage from "../pages/AdminMainPage";
import AdminUniversityPage from "../pages/AdminUniversityPage";
import AdminUserPage from "../pages/AdminUserPage";
import AdminTeamPage from "../pages/AdminTeamPage";
import AdminCommitteePage from "../pages/AdminCommitteePage";
import AdminCommitteeMemberPage from "../pages/AdminCommitteeMemberPage";
import AdminContestPage from "../pages/AdminContestPage";
import AdminNominationPage from "../pages/AdminNominationPage";

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
    {
        path: "/committeeMembers",
        Component: AdminCommitteeMemberPage,
    },
    {
        path: "/contests",
        Component: AdminContestPage,
    },
    {
        path: "/nominations",
        Component: AdminNominationPage,
    },
];