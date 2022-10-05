import { RouteObject } from "react-router-dom";
import { AboutPage } from "pages/about";
import { MainPage } from "pages/main";

export enum RoutesPaths {
  MAIN = '/',
  ABOUT = '/about',
}

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
