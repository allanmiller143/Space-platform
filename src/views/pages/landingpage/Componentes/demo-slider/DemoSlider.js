import React from 'react';
import { Box, Container, Button, styled, Typography, Grid, Avatar, Chip } from '@mui/material';

import DemoTitle from './DemoTitle';

// images
import mainDemo from 'src/assets/images/landingpage/demos/demo-main.jpg';
import darkDemo from 'src/assets/images/landingpage/demos/demo-dark.jpg';
import horizontalDemo from 'src/assets/images/landingpage/demos/demo-horizontal.jpg';
import minisidebarDemo from 'src/assets/images/landingpage/demos/demo-firebase.jpg';
import rtlDemo from 'src/assets/images/landingpage/demos/demo-rtl.jpg';

import app1 from 'src/assets/images/landingpage/apps/app-calendar.jpg';
import app2 from 'src/assets/images/landingpage/apps/app-chat.jpg';
import app3 from 'src/assets/images/landingpage/apps/app-contact.jpg';
import app4 from 'src/assets/images/landingpage/apps/app-email.jpg';
import app5 from 'src/assets/images/landingpage/apps/app-note.jpg';
import app6 from 'src/assets/images/landingpage/apps/app-user-profile.jpg';
import app7 from 'src/assets/images/landingpage/apps/app-blog.jpg';
import app8 from 'src/assets/images/landingpage/apps/app-ticket.jpg';
import app9 from 'src/assets/images/landingpage/apps/app-ecommerce-shop.jpg';
import app10 from 'src/assets/images/landingpage/apps/app-ecommerce-detail.jpg';
import app11 from 'src/assets/images/landingpage/apps/app-ecommerce-checkout.jpg';
import app12 from 'src/assets/images/landingpage/apps/app-ecommerce-list.jpg';
import app13 from 'src/assets/images/landingpage/apps/app-blog-detail.jpg';
import app14 from 'src/assets/images/landingpage/apps/app-kanban.jpg';
import app15 from 'src/assets/images/landingpage/apps/app-invoice.jpg';

const StyledBox = styled(Box)(() => ({
  overflow: 'auto',
  position: 'relative',
  '.MuiButton-root': {
    display: 'none',
  },
  '&:hover': {
    '.MuiButton-root': {
      display: 'block',
      transform: 'translate(-50%,-50%)',
      position: 'absolute',
      left: '50%',
      right: '50%',
      top: '50%',
      minWidth: '100px',
      zIndex: '9',
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      top: '0',
      left: ' 0',
      width: '100%',
      height: '100%',
      zIndex: '8',
      backgroundColor: 'rgba(55,114,255,.2)',
    },
  },
}));

const demos = [
  {
    link: 'https://modernize-react-main.netlify.app/dashboards/modern',
    img: mainDemo,
    title: 'Main',
  },
  {
    link: 'https://modernize-react-dark.netlify.app/dashboards/ecommerce',
    img: darkDemo,
    title: 'Dark',
  },
  {
    link: 'https://modernize-react-horizontal.netlify.app/dashboards/modern',
    img: horizontalDemo,
    title: 'Horizontal',
  },
  {
    link: 'https://modernize-react-firebase.netlify.app/auth/login',
    img: minisidebarDemo,
    title: 'Firebase',
  },
  {
    link: 'https://modernize-react-rtl.netlify.app/dashboards/modern',
    img: rtlDemo,
    title: 'RTL',
  },
];

const apps = [
  {
    link: 'https://modernize-nextjs.adminmart.com/apps/kanban',
    img: app14,
    hot: true,
    title: 'Kanban App',
  },
  {
    link: 'https://modernize-nextjs.adminmart.com/apps/invoice/list',
    img: app15,
    hot: true,
    title: 'Invoice App',
  },
  {
    link: '/apps/calendar',
    img: app1,
    title: 'Calendar App',
  },
  {
    link: '/apps/chats',
    img: app2,
    title: 'Chat App',
  },
  {
    link: 'apps/contacts',
    img: app3,
    title: 'Contact App',
  },
  {
    link: 'apps/email',
    img: app4,
    title: 'Email App',
  },
  {
    link: '/apps/notes',
    img: app5,
    title: 'Note App',
  },
  {
    link: '/apps/user-profile',
    img: app6,
    title: 'User Profile App',
  },
  {
    link: '/apps/blog/posts',
    img: app7,
    title: 'Blog App',
  },
  {
    link: '/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
    img: app13,
    title: 'Blog Detail App',
  },
  {
    link: '/apps/tickets',
    img: app8,
    title: 'Ticket App',
  },
  {
    link: '/apps/ecommerce/shop',
    img: app9,
    title: 'eCommerce Shop App',
  },
  {
    link: '/apps/ecommerce/detail/1',
    img: app10,
    title: 'eCommerce Detail App',
  },
  {
    link: '/apps/ecommerce/eco-checkout',
    img: app11,
    title: 'eCommerce Checkout App',
  },
  {
    link: '/apps/ecommerce/eco-product-list',
    img: app12,
    title: 'eCommerce List App',
  },
];

const DemoSlider = () => {
  return (
    <Box
      pb="140px"
      overflow="hidden"
      sx={{
        pt: {
          sm: '60px',
          lg: '0',
        },
      }}
    >
      <Container maxWidth="lg">

        <Box mt={9}></Box>
        
      </Container>
    </Box>
  );
};

export default DemoSlider;
