import { createBrowserRouter } from "react-router-dom";

import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import PageNotFound from "@/pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageNotFound />,
  },
  {
    path: `/:roomName`,
    element: <Home />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/auth",
    element: <Auth />,
    errorElement: <PageNotFound />,
  },
]);

export default router;
