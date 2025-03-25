import { useContext, useEffect, useState } from 'react';
import { Button, Box, Drawer, useMediaQuery } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import ContactDetails from 'src/components/apps/contacts/ContactDetails';
import ContactList from 'src/components/apps/contacts/ContactList';
import ContactSearch from 'src/components/apps/contacts/ContactSearch';
import AppCard from 'src/components/shared/AppCard';
import ContactsContext from './ContactsContext/ContactsContext';
import { getData } from '../../../Services/Api';
import ContactFilter from 'src/components/apps/contacts/ContactFilter';

const secdrawerWidth = 320;
const drawerWidth = 240;

const Contacts = () => {
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const {test, list,setList,loading,setLoading,acceptedList,setAcceptedList, activeList, setActiveList,afterLoad,setAfterLoad,setActive} = useContext(ContactsContext);

  const token = localStorage.getItem('token');

  useEffect(() => {
    loadSharedProperties();
    loadSharedPropertiesAccepted();
  },[]);


  async function loadSharedProperties (){
    setLoading(true);
    try{
      const response = await getData(`properties/shared/find?status=pending`, token);
      if(response.status === 200 || response.status === 201){
        setList(response.userInfo.properties);
        setActiveList(response.userInfo.properties);
        console.log(response.userInfo.properties);

        if(afterLoad !== null){
          const notificationClick = response.userInfo.properties.find((item) => item.shared.id === afterLoad);
          setActive(notificationClick);
          setAfterLoad(null);
        }
      }else{
        console.log(response);
      }
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }

  async function loadSharedPropertiesAccepted (){
    setLoading(true);
    try{
      const response = await getData(`properties/shared/find?status=accepted`, token);
      if(response.status === 200 || response.status === 201){
        setAcceptedList(response.userInfo.properties);
        console.log(response.userInfo.properties);
      }else{
        console.log(response);
      }
    }catch(e){
      console.log(e);
    }finally{
      setLoading(false);
    }
  }


  return (
    <PageContainer title="Aplicativo de Contatos" description="Esta é a página de Contatos">
      <Breadcrumb title="Compartilhamentos" subtitle="Liste todos os seus pedidos de compartilhamento" />
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Left Part */}
        {/* ------------------------------------------- */}

        <Drawer
          open={isLeftSidebarOpen}
          onClose={() => setLeftSidebarOpen(false)}
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, position: 'relative', zIndex: 2 },
            flexShrink: 0,
          }}
          variant={lgUp ? 'permanent' : 'temporary'}
        >
          <ContactFilter />
        </Drawer>
        {/* ------------------------------------------- */}
        {/* Middle part */}
        {/* ------------------------------------------- */}
        <Box
          sx={{
            minWidth: secdrawerWidth,
            width: { xs: '100%', md: secdrawerWidth, lg: secdrawerWidth },
            flexShrink: 0,
          }}
        >
          <ContactSearch onClick={() => setLeftSidebarOpen(true)} />
          <ContactList showrightSidebar={() => setRightSidebarOpen(true)} />
        </Box>
        {/* ------------------------------------------- */}
        {/* Right part */}
        {/* ------------------------------------------- */}
        <Drawer
          anchor="right"
          open={isRightSidebarOpen}
          onClose={() => setRightSidebarOpen(false)}
          variant={mdUp ? 'permanent' : 'temporary'}
          sx={{
            width: mdUp ? secdrawerWidth : '100%',
            zIndex: lgUp ? 0 : 1,
            flex: mdUp ? 'auto' : '',
            [`& .MuiDrawer-paper`]: { width: '100%', position: 'relative' },
          }}
        >
          {/* back btn Part */}
          {mdUp ? (
            ''
          ) : (
            <Box sx={{ p: 3 }}>
              <Button
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => setRightSidebarOpen(false)}
                sx={{ mb: 3, display: { xs: 'block', md: 'none', lg: 'none' } }}
              >
                Back{' '}
              </Button>
            </Box>
          )}
          <ContactDetails />
        </Drawer>
      </AppCard>
    </PageContainer>
  );
};

export default Contacts;
