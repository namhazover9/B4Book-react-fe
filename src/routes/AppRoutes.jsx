import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@layouts/Layout';
import AdminLayout from '../layouts/AdminLayout';
import { routes_here } from './routes';
import ScrollTop from '@components/ScrollTop';
import NotFoundPage from '../pages/pageError/page404';
import ForbiddenPage from '../pages/pageError/page403';
import LoadingSpinner from '../components/loading';

const layoutMap = {
  admin: AdminLayout,
  //   sale: SaleLayout,
  user: Layout,
};

const AppRoutes = () => {
  const isAuthenticated = true;
  const userRole = 'user';

  const hasAccess = (layout) => {
    if (layout === 'admin' && userRole !== 'admin') return false;
    if (layout === 'sale' && userRole !== 'sale') return false;
    if (layout === 'user' && userRole !== 'user') return false;
    return true;
  };

  const getLayout = (layout, element) => {
    const LayoutComponent = layoutMap[layout] || React.Fragment;
    return <LayoutComponent>{element}</LayoutComponent>;
  };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <>
        <ScrollTop />
        <Routes>
          {routes_here.map(({ path, element, layout, isPrivate }, key) => {
            if (isPrivate && !isAuthenticated) {
              return <Route key={key} path={path} element={<Navigate to='/login' />} />;
            }

            if (!hasAccess(layout)) {
              return <Route key={key} path={path} element={<ForbiddenPage />} />;
            }

            return <Route key={key} path={path} element={getLayout(layout, element)} />;
          })}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </>
    </Suspense>
  );
};

export default AppRoutes;
