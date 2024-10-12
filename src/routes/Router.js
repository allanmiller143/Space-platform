/* eslint-disable no-unused-vars */
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import CompleteRegister2 from '../views/authentication/auth2/CompleteRegister2';
import {io} from 'socket.io-client';
const socket = io('https://space-api-zsx7.onrender.com/');


/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* Pages */
const UserProfile = Loadable(lazy(() => import('../views/apps/user-profile/UserProfile')));
const InvoiceList = Loadable(lazy(() => import('../views/apps/invoice/List')));
const InvoiceCreate = Loadable(lazy(() => import('../views/apps/invoice/Create')));
const InvoiceDetail = Loadable(lazy(() => import('../views/apps/invoice/Detail')));
const InvoiceEdit = Loadable(lazy(() => import('../views/apps/invoice/Edit')));
const Kanban = Loadable(lazy(() => import('../views/apps/kanban/Kanban')));
const ImoveisList = Loadable(lazy(() => import('../views/apps/imoveis/List')));
const ImoveisEdit = Loadable(lazy(() => import('../views/apps/imoveis/CreateEdit')));
const AccountSetting = Loadable(lazy(() => import('../views/pages/account-setting/AccountSetting')));

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Login2 = Loadable(lazy(() => import('../views/authentication/auth2/Login2')));
const Register = Loadable(lazy(() => import('../views/authentication/auth1/Register')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register2')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const ForgotPassword2 = Loadable(lazy(() => import('../views/authentication/auth2/ForgotPassword2')));
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const TwoSteps2 = Loadable(lazy(() => import('../views/authentication/auth2/TwoSteps2')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Marketplace = Loadable(lazy(() => import('../views/apps/marketplace/Marketplace')));
const Homepage = Loadable(lazy(() => import('../views/pages/frontend-pages/Homepage')));

// *** Templates Erick ***
const Home = Loadable(lazy(() => import('../views/templates/home'))); 

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/marketplace" /> },
      { path: '/apps/imoveis/list', element: <ImoveisList /> },
      { path: '/apps/imoveis/edit', element: <ImoveisEdit /> },
      { path: '/apps/kanban', element: <Kanban /> },
      { path: '/apps/invoice/list', element: <InvoiceList /> },
      { path: '/apps/invoice/create', element: <InvoiceCreate /> },
      { path: '/apps/invoice/detail/:id', element: <InvoiceDetail /> },
      { path: '/apps/invoice/edit/:id', element: <InvoiceEdit /> },
      { path: '/user-profile/:email', element: <UserProfile socket={socket} /> },
      { path: '/pages/account-settings', element: <AccountSetting /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/login2', element: <Login2 /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/register2', element: <Register2 /> },
      { path: '/auth/complete-register2', element: <CompleteRegister2 /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/forgot-password2', element: <ForgotPassword2 /> },
      { path: '/auth/two-steps', element: <TwoSteps /> },
      { path: '/auth/two-steps2', element: <TwoSteps2 /> },
      { path: '/marketplace', element: <Marketplace /> },
      { path: '/frontend-pages/homepage', element: <Homepage /> },
      { path: '/templates/home', element: <Home /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
