import ScrollTop from '@components/ScrollTop';
import Layout from '@layouts/Layout';
import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate
import LoadingSpinner from '../components/loading';
import AdminLayout from '../layouts/AdminLayout';
import SellerLayout from '../layouts/SellerLayout';
import ForbiddenPage from '../pages/pageError/page403';
import NotFoundPage from '../pages/pageError/page404';
import { getIsAuth } from '../reducers/auth';
import { fetchCart } from '../reducers/carts';
import { getUserRequest } from '../reducers/user';
import { routes_here } from './routes';

const layoutMap = {
  admin: AdminLayout,
  user: Layout,
  seller: SellerLayout,
  customer: Layout,
};

const AppRoutes = () => {
  const dispatch = useDispatch();

  // Lấy trạng thái xác thực và vai trò người dùng từ Redux
  const isAuth = useSelector((state) => state.authenticate.isAuth);
  const userRole = useSelector((state) => {
    const roles = state.user.role;
    if (!roles || !roles.length) return null;

    if (roles.includes('Admin')) return 'Admin';
    if (roles.includes('Seller')) return 'Seller';
    if (roles.includes('Customer')) return 'Customer';

    return roles[0]?.name;
  });
  const userId = useSelector((state) => state.user._id);
  const token = localStorage.getItem('access_token');

  // Kiểm tra xác thực
  useEffect(() => {
    dispatch(getIsAuth());
  }, [dispatch]);

  // Lấy thông tin người dùng khi xác thực thành công
  useEffect(() => {
    if (isAuth && token) {
      dispatch(getUserRequest());
      dispatch(fetchCart());
    }
  }, [isAuth, dispatch, token]);

  // Xác định quyền truy cập
  const hasAccess = (layout) => {
    if (layout === 'Admin' && userRole !== 'Admin') return false;
    if (layout === 'Customer' && userRole !== 'Customer') return false;
    if (layout === 'Shop' && userRole !== 'Shop') return false;
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
            if (userRole === 'Admin' && layout !== 'admin') {
              return <Route key={key} path={path} element={<Navigate to="/admin" />} />;
            }
            if (!hasAccess(layout) && isPrivate) {
              return <Route key={key} path={path} element={<ForbiddenPage />} />;
            }

            return <Route key={key} path={path} element={getLayout(layout, element)} />;
          })}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </>
    </Suspense>
  );
};

export default AppRoutes;
