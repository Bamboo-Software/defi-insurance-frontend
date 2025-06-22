import { routesPaths } from '@/types/constants/routes';
import { createBrowserRouter } from 'react-router-dom';

// import AuthLayout from '@/app/layouts/AuthLayout';
import PageLayout from '@/app/layouts/PageLayout';
import ErrorPage from '@/pages/common/ErrorPage';
import Home from '@/pages/home';
import LoadingPage from '@/pages/common/LoadingPage';
// import { PrivateRoute } from './components/PrivateRoute';
// import { PublicRoute } from './components/PublicRoute';

// Lazy load pages for better performance
import { lazy, Suspense } from 'react';
const InsurancePlans = lazy(() => import('@/pages/insurance-plans'));
const MyInsurance = lazy(() => import('@/pages/my-insurance'));

const {
  ROOT,
  INSURANCE_PLANS,
  MY_INSURANCE,
} = routesPaths;


const routes = createBrowserRouter([
  {
    path: ROOT,
    element: <PageLayout />,
    children: [
      { index: true, element: <Home /> },
      { 
        path: INSURANCE_PLANS, 
        element: (
          <Suspense fallback={<LoadingPage />}>
            <InsurancePlans />
          </Suspense>
        ) 
      },
      { 
        path: MY_INSURANCE, 
        element: (
          <Suspense fallback={<LoadingPage />}>
            <MyInsurance />
          </Suspense>
        ) 
      },
    ],
  },

  { path: '*', element: <ErrorPage /> },
]);

export default routes;