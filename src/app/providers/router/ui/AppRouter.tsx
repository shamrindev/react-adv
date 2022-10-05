import React, { Suspense } from 'react';
import { Route, Routes } from "react-router-dom";
import { routesConfig } from "app/providers/router/config";

const AppRouter = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {routesConfig.map(({element, path}) => (
          <Route key={path} path={path} element={element}/>
        ))}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
