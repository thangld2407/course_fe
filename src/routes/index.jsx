import LayoutIndex from "@/components/common/Layout";
import LayoutClass from "@/components/common/Layout/LayoutClass";
import PageNotFound from "@/pages/404";
import BlogPage from "@/pages/Blog";
import MyBlog from "@/pages/Blog/my-blog";
import ClassPage from "@/pages/Class";
import DetailClass from "@/pages/Class/DetailClass/DetailClass";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import UserPage from "@/pages/User";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LayoutIndex,
    ErrorBoundary: PageNotFound,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/my-class",
        Component: ClassPage,
      },
      {
        path: "/manage-class",
        Component: ClassPage,
      },
      {
        path: "/manage-account",
        Component: UserPage,
      },
      {
        path: "/blog",
        Component: BlogPage,
      },
      {
        path: "/my-blog",
        Component: MyBlog,
      },
      {
        path: "/profile",
        Component: Profile,
      },
    ],
  },
  {
    path: "/class",
    Component: LayoutClass,
    children: [
      {
        path: ":id",
        Component: DetailClass,
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
    ErrorBoundary: PageNotFound,
  },
  {
    path: "*",
    Component: PageNotFound,
  },
]);
