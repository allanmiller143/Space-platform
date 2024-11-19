/* eslint-disable no-unused-vars */
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import CompleteRegister2 from '../views/authentication/auth2/CompleteRegister2';
import {io} from 'socket.io-client';
//const socket = io('https://advanced-mosquito-usually.ngrok-free.app/');

const socket = io('https://spaceimoveis-api-dev.onrender.com/');

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
const EcommerceDetail = Loadable(lazy(() => import('../views/apps/eCommerce/EcommerceDetail')));


// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register2')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const ForgotPassword2 = Loadable(lazy(() => import('../views/authentication/auth2/ForgotPassword2')));
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const TwoSteps2 = Loadable(lazy(() => import('../views/authentication/auth2/TwoSteps2')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));

const Marketplace = Loadable(lazy(() => import('../views/apps/marketplace/Marketplace')));
const ImovelPage = Loadable(lazy(() => import('../views/apps/marketplace/imovelPage')));

const Homepage = Loadable(lazy(() => import('../views/pages/frontend-pages/Homepage')));
const ContatoPage = Loadable(lazy(() => import('../views/templates/contato/contato')));
const PrecosPage = Loadable(lazy(() => import('../views/templates/precos/precos')));
const SobreNosPage = Loadable(lazy(() => import('../views/templates/sobrenos/sobrenos')));
const ProdutosPage = Loadable(lazy(() => import('../views/templates/produtos/produtos')));
const FeedPage = Loadable(lazy(() => import('../views/templates/feed/feed')));

// *** Templates Erick ***
const Home = Loadable(lazy(() => import('../views/templates/home'))); 


// Apps
const Chats = Loadable(lazy(() => import('../views/apps/chat/Chat')));
const Notes = Loadable(lazy(() => import('../views/apps/notes/Notes')));
const Calendar = Loadable(lazy(() => import('../views/apps/calendar/BigCalendar')));
const Email = Loadable(lazy(() => import('../views/apps/email/Email')));
const Tickets = Loadable(lazy(() => import('../views/apps/tickets/Tickets')));
const Contacts = Loadable(lazy(() => import('../views/apps/contacts/Contacts')));


const Router = [
  {
    path: '/',
    element: <FullLayout socket={socket} />,
    children: [
      { path: '/', element: <Navigate to="/frontend-pages/homepage" /> },
      { path: '/apps/imoveis/list', element: <ImoveisList /> },
      { path: '/apps/imoveis/edit', element: <ImoveisEdit /> },

      { path: '/apps/kanban', element: <Kanban /> },

      { path: '/apps/invoice/list', element: <InvoiceList /> },
      { path: '/apps/invoice/create', element: <InvoiceCreate /> },
      { path: '/apps/invoice/detail/:id', element: <InvoiceDetail /> },
      { path: '/apps/invoice/edit/:id', element: <InvoiceEdit /> },

      { path: '/user-profile/:email', element: <UserProfile socket={socket} /> },
      { path: '/pages/account-settings', element: <AccountSetting /> },

      // Apps
      { path: '/apps/chats', element: <Chats socket={socket} /> },
      { path: '/apps/notes', element: <Notes /> },
      { path: '/apps/email', element: <Email /> },
      { path: '/apps/tickets', element: <Tickets /> },
      { path: '/apps/contacts', element: <Contacts /> },
      { path: '/apps/post/:id', element: <EcommerceDetail /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/register2', element: <Register2 /> },
      { path: '/auth/complete-register2', element: <CompleteRegister2 /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/forgot-password2', element: <ForgotPassword2 /> },
      { path: '/auth/two-steps', element: <TwoSteps /> },
      { path: '/auth/two-steps2', element: <TwoSteps2 /> },

      { path: '/marketplace', element: <Marketplace /> },
      { path: '/marketplace/imovel/:id', element: <ImovelPage socket={socket} /> },
      { path: '/frontend-pages/homepage', element: <Homepage /> },
      { path: '/apps/calendar', element: <Calendar /> },

      { path: '/templates/contato', element: <ContatoPage /> },
      { path: '/templates/home', element: <Home /> },
      { path: '/templates/precos', element: <PrecosPage /> },
      { path: '/templates/sobre', element: <SobreNosPage /> },
      { path: '/templates/produtos', element: <ProdutosPage /> },
      { path: '/templates/feed', element: <FeedPage /> },
      
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
