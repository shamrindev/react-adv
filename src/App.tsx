import React, { Suspense } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import MainPageAsync from "./pages/MainPage/MainPage.async";
import AboutPageAsync from "./pages/AboutPage/AboutPage.async";
import useTheme from "./theme/useTheme";
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
          <Route path="/" element={<MainPageAsync />} />
          <Route path="/about" element={<AboutPageAsync />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
