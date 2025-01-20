import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import ScrollToTop from './components/shared/ScrollToTop';
import Router from './routes/Router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { HelmetProvider } from 'react-helmet-async';
import '../src/App.css';
import '../src/index.css'
import ChatContextProvider from './components/apps/chats/ChatContext/ChatContextProvider';
import NotificationContextProvider from './Services/Notification/NotificationContext/NotificationContextProvider';
import MarketplaceContextProvider from './views/apps/marketplace/MarketplaceContext/MarketplaceContextProvider';

function App() {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.customizer);


  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <NotificationContextProvider>
          <ChatContextProvider>
            <MarketplaceContextProvider>
            <RTL direction={customizer.activeDir}>
              <CssBaseline />
              <ScrollToTop>{routing}</ScrollToTop>
            </RTL>
            </MarketplaceContextProvider> 
          </ChatContextProvider>
        </NotificationContextProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App
