import React, { useState } from 'react';
import { Button, Box, Drawer, useMediaQuery } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import ContactDetails from 'src/components/apps/contacts/ContactDetails';
import ContactList from 'src/components/apps/contacts/ContactList';
import ContactSearch from 'src/components/apps/contacts/ContactSearch';
import ContactFilter from 'src/components/apps/contacts/ContactFilter';
import AppCard from 'src/components/shared/AppCard';

const drawerWidth = 240;
const secdrawerWidth = 320;

const Contacts = () => {
  const [isLeftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [isRightSidebarOpen, setRightSidebarOpen] = useState(false);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  return (
    <PageContainer title="Aplicativo de Contatos" description="Esta é a página de Contatos">
      <Breadcrumb title="Aplicativo de Contatos" subtitle="Liste seus Contatos Imobiliários" />
      <AppCard>
        {/* ------------------------------------------- */}
        {/* Parte Esquerda */}
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
        {/* Parte do Meio */}
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
        {/* Parte Direita */}
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
          {/* Parte do botão voltar */}
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
                Voltar{' '}
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
