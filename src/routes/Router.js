/* eslint-disable no-unused-vars */
import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import CompleteRegister2 from '../views/authentication/auth2/CompleteRegister2';
import Dash from '../views/apps/Dash/Dash';
import DefinirHorariosDisponibilidade from '../Services/GoogleCalendar/Horarios/DefinirHorariosDisponibilidade';
import CalendarioDisponibilidade from '../Services/GoogleCalendar/Horarios/Calendar';
import SharePropertyForm from '../views/apps/Share/SharePropertyForm';
import CatchError from '../views/apps/CatchError/CatchError';
import Ecommerce from '../views/dashboard/Ecommerce';
import PaidImovelPage from '../views/apps/ImovelPage/PaidImovelPage';
import Anunciar from '../views/pages/Anunciar/Anunciar';


import SobreNosPage from '../views/pages/sobrenos/sobrenos'
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

const FormWizard = Loadable(lazy(() => import('../views/apps/Share/FormWizard')));

// authentication
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));
const Register2 = Loadable(lazy(() => import('../views/authentication/auth2/Register2')));
const ForgotPassword = Loadable(lazy(() => import('../views/authentication/auth1/ForgotPassword')));
const ForgotPassword2 = Loadable(lazy(() => import('../views/authentication/auth2/ForgotPassword2')));
const TwoSteps = Loadable(lazy(() => import('../views/authentication/auth1/TwoSteps')));
const TwoSteps2 = Loadable(lazy(() => import('../views/authentication/auth2/TwoSteps2')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Marketplace = Loadable(lazy(() => import('../views/apps/marketplace/Marketplace')));
const Homepage = Loadable(lazy(() => import('../views/pages/Home/Homepage')));
const ContatoPage = Loadable(lazy(() => import('../views/pages/FaleConosco/contato')));

// *** Templates Erick ***


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
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/frontend-pages/homepage" /> },
      { path: '/apps/imoveis/list', element: <ImoveisList /> },
      { path: '/apps/imoveis/edit', element: <ImoveisEdit /> },
      { path: '/apps/dash', element: <Dash /> },
      { path: 'apps/share/:id', element: <SharePropertyForm/> },
      { path: '/apps/p', element: <Ecommerce /> },
      { path: '/apps/agenda', element: <DefinirHorariosDisponibilidade /> },
      { path: '/apps/horarios', element: <CalendarioDisponibilidade /> },
      { path: '/apps/kanban', element: <Kanban /> },
      { path: '/apps/invoice/list', element: <InvoiceList /> },
      { path: '/apps/invoice/create', element: <InvoiceCreate /> },
      { path: '/apps/invoice/detail/:id', element: <InvoiceDetail /> },
      { path: '/apps/invoice/edit/:id', element: <InvoiceEdit /> },
      { path: '/user-profile/:email', element: <UserProfile /> },
      { path: '/pages/account-settings', element: <AccountSetting /> },
      { path: '/forms/form-wizard', element: <FormWizard /> },
      // Apps
      { path: '/apps/notes', element: <Notes /> },
      { path: '/apps/email', element: <Email /> },
      { path: '/apps/tickets', element: <Tickets /> },
      { path: '/apps/contacts', element: <Contacts /> },
      { path: '/apps/post/:id', element: <EcommerceDetail /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
      { path: '/error', element: <CatchError /> },
      { path: '/imovel/:id', element: <PaidImovelPage /> },


      
    ],
  },
  {
    path: '/',
    element: <BlankLayout />,
    children: [
      { path: '/auth/404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/apps/chats', element: <Chats /> },
      { path: '/apps/ecommerce/shop',element : <Ecommerce/> },
      { path: '/auth/register2', element: <Register2 /> },
      { path: '/auth/complete-register2', element: <CompleteRegister2 /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/forgot-password2', element: <ForgotPassword2 /> },
      { path: '/auth/two-steps', element: <TwoSteps /> },
      { path: '/auth/two-steps2', element: <TwoSteps2 /> },
      { path: '/marketplace', element: <Marketplace /> },
      { path: '/frontend-pages/homepage', element: <Homepage /> },
      { path: '/anunciar', element: <Anunciar/> },

      

      { path: '/apps/calendar', element: <Calendar /> },
      { path: '/templates/contato', element: <ContatoPage /> },
      { path: '/templates/sobre', element: <SobreNosPage /> },

      
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
