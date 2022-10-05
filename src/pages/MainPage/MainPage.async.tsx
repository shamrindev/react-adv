import {lazy} from "react";

const MainPageAsync = lazy(() => new Promise(resolve => {
  // @ts-ignore
  setTimeout(() => resolve(import('./MainPage')), 1500)
}));

export default MainPageAsync;
