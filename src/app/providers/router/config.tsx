import { RouteObject } from "react-router-dom";
import { AboutPage } from "pages/about";
import { MainPage } from "pages/main";
import { RoutesPaths } from "shared/constants/routes";

export const routesConfig: RouteObject[] = [
  {
    path: RoutesPaths.MAIN,
    element: <MainPage />,
  },
  {
    path: RoutesPaths.ABOUT,
    element: <AboutPage />,
  }
]
