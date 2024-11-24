import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@layouts/Layout';
import AdminLayout from '../layouts/AdminLayout';
import { routes_here } from './routes';
import ScrollTop from '@components/ScrollTop';
import NotFoundPage from '../pages/pageError/page404';
import ForbiddenPage from '../pages/pageError/page403';
import LoadingSpinner from '../components/loading';
import { getIsAuth } from '../reducers/auth';
import { getUserRequest } from '../reducers/user';

const layoutMap = {
  admin: AdminLayout,
  user: Layout,
};

const AppRoutes = () => {
  const dispatch = useDispatch();

  // Lấy trạng thái xác thực và vai trò người dùng từ Redux
  const isAuth = useSelector((state) => state.authenticate.isAuth);
  const userRole = useSelector((state) => state.user.role);

  // Kiểm tra xác thực
  useEffect(() => {
    dispatch(getIsAuth());
  }, [dispatch]);

  // Lấy thông tin người dùng khi xác thực thành công
  useEffect(() => {
    if (isAuth) {
      dispatch(getUserRequest());
    }
  }, [isAuth, dispatch]);

  // Xác định quyền truy cập
  const hasAccess = (layout) => {
    if (layout === 'admin' && userRole !== 'admin') return false;
    if (layout === 'user' && userRole !== 'user') return false;
    return true;
  };

  const getLayout = (layout, element) => {
    const LayoutComponent = layoutMap[layout] || React.Fragment;
    return <LayoutComponent>{element}</LayoutComponent>;
  };

  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <>
        <ScrollTop />
        <Routes>
          {routes_here.map(({ path, element, layout, isPrivate }, key) => {
            if (isPrivate && !isAuth) {
              return <Route key={key} path={path} element={<Navigate to='/login' />} />;
            }

            if (!hasAccess(layout) && isPrivate) {
              return <Route key={key} path={path} element={<ForbiddenPage />} />;
            }

            return <Route key={key} path={path} element={getLayout(layout, element)} />;
          })}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </>
    </React.Suspense>
  );
};

export default AppRoutes;
