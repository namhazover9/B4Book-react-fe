import ScrollTop from '@components/ScrollTop';
import Layout from '@layouts/Layout';
import React, { Suspense, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoadingSpinner from '../components/loading';
import { userAPI } from '../hooks/useLogin';
import AdminLayout from '../layouts/AdminLayout';
import ForbiddenPage from '../pages/pageError/page403';
import NotFoundPage from '../pages/pageError/page404';
import { routes_here } from './routes';

const layoutMap = {
  admin: AdminLayout,
  //   sale: SaleLayout,
  user: Layout,
};

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [userRole, setUserRole] = useState('user');

  // useEffect(() => {
  //   const checkGoogleToken = async () => {
  //     try {
  //       const response = await userAPI.loginUserGG();
  //       if (response.data.isValid) {
  //         setIsAuthenticated(true);
  //         setUserRole(response.data.role);
  //       } else {
  //         setIsAuthenticated(false);
  //         setUserRole('guest');
  //       }
  //     } catch (error) {
  //       console.error('Token verification failed:', error);
  //       setIsAuthenticated(false);
  //       setUserRole('guest');
  //     }
  //   };

  //   checkGoogleToken();
  // }, []);

  console.log('isAuthenticated:', isAuthenticated);
  console.log('userRole:', userRole);

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
