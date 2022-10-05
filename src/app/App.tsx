import React, { Suspense } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import {useTheme} from "app/providers/ThemeProvider";
import { MainPage } from "pages/MainPage";
import { AboutPage } from "pages/AboutPage";
import './styles/index.scss';

const App = () => {
  const { theme, changeTheme } = useTheme();

  return (
    <div className="app" data-theme={theme}>
      <Link to="/">Главная</Link>
      <Link to="/about">О компании</Link>

      <button onClick={changeTheme}>Сменить тему</button>

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
