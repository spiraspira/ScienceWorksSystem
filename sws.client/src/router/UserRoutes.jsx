import MainPage from "../pages/MainPage";
import ContestPage from "../pages/ContestPage";

export const UserRoutes = [
    {
        path: "/",
        Component: MainPage,
    },
    {
        path: "/contest/:contestId",
        Component: ContestPage,
    },
];