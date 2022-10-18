import React from 'react';
import { useTheme } from "app/providers/theme";
import { AppRouter } from "app/providers/router";
import { Navbar } from "widgets/navbar";

import './styles/index.scss';
import ThemeSwitcher from "shared/ui/ThemeSwitcher/ThemeSwitcher";

const App = () => {
  const { theme } = useTheme();

  return (
    <div className="app" data-theme={theme}>
      <Navbar />
      <ThemeSwitcher />
      <AppRouter />
    </div>
  );
};

export default App;
