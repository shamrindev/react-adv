import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routesConfig } from '@/app/providers/router/config';
import { Loader } from '@/shared/ui/Loader';

export const AppRouter = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      {routesConfig.map(({ element, path }) => (
        <Route
          key={path}
          path={path}
          element={(
            <main className="page-wrapper">
              {element}
            </main>
            )}
        />
      ))}
    </Routes>
  </Suspense>
);
