import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AuthForm from "../Screen/Auth/AuthForm";
import BaseLayout from "../Layout/BaseLayout";
import Dashboard from "../Screen/Dashboard";
import ExperienceCategory from "../Screen/Experience/Exp_Category";
import Edu_Category from "../Screen/Education/Edu_Category";
import Pro_Category from "../Screen/Project/Pro_Category";
import Skill_Category from "../Screen/Skill/Skill_Category";
import Blog_Category from "../Screen/Blog/Blog_Category";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <AuthForm />,
      },
      {
        path: "/",
        element: <BaseLayout />, // BaseLayout containing Outlet
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "experience_category",
            element: <ExperienceCategory />,
          },
          {
            path: "porject_category",
            element: <Pro_Category />,
          },
          {
            path: "education_category",
            element: <Edu_Category />,
          },
          {
            path: "skill_category",
            element: <Skill_Category />,
          },
          {
            path: "blog_category",
            element: <Blog_Category/>,
          },

        ],
      },
    ],
  },
]);

export default routes;
