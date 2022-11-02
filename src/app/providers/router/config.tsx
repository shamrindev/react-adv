import { RouteObject } from 'react-router-dom';
import { RoutesPaths } from '@/shared/constants/routes';
import { AboutPage } from '@/pages/AboutPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

export const routesConfig: RouteObject[] = [
  {
    path: RoutesPaths.MAIN,
    element: <MainPage />,
  },
  {
    path: RoutesPaths.ABOUT,
    element: <AboutPage />,
  },
  {
    path: RoutesPaths.NOT_FOUND,
    element: <NotFoundPage />,
  },

];
