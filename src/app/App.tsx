import React from 'react';
import { Link } from "react-router-dom";
import { useTheme } from "app/providers/theme";
import { AppRouter } from "app/providers/router";
import { RoutesPaths } from "./providers/router/config";

import './styles/index.scss';

const App = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <div className="app" data-theme={theme}>
      <Link to={RoutesPaths.MAIN}>Главная</Link>
      <Link to={RoutesPaths.ABOUT}>О компании</Link>

      <button onClick={changeTheme}>Сменить тему</button>

      <AppRouter />
    </div>
  );
};

export default App;
