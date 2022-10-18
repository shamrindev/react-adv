import React from 'react';
import { useTheme } from "app/providers/theme";
import { AppRouter } from "app/providers/router";
import { Navbar } from "widgets/navbar";
import './styles/index.scss';

const App = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <div className="app" data-theme={theme}>
      <Navbar />
      <button onClick={changeTheme}>Сменить тему</button>
      <AppRouter />
    </div>
  );
};

export default App;
