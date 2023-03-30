import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import FormBuilder from './formBuilderComponent';
import DashboardSidebar from './layouts/dashboard/DashboardSidebar';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Profile from './pages/Profile';
import object from './pages/object';
import Getforms from './formBuilderComponent/GetForms';
export default function Routess() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} exact />
        <Router>
          <Switch style={{ display: 'flex', justifyContent: 'center' }}>
            <Route path="/Category" component={Products} exact />
            <Route path="/users" component={User} exact />
            <Route path="/account" component={Profile} exact />
            <Route path="/object" component={object} exact />
            <Route path="/val" component={Getforms} exact />

            <Route path="/dashboard" component={DashboardApp} exact />
            <Route path="/addCategory" component={FormBuilder} exact />
          </Switch>
        </Router>
      </Switch>
    </Router>
  );
}
/* return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'Category', element: <Products /> },
        {path : 'FormBuilder', element :<FormBuilder/>},
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        

        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
*/
