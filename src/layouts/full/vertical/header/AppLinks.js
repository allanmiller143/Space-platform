import { Avatar, Box, Typography, Grid, Stack } from '@mui/material';
import icon3 from 'src/assets/images/svgs/icon-tasks.svg';
import ddIcon1 from 'src/assets/images/svgs/icon-dd-chat.svg';
import ddIcon3 from 'src/assets/images/svgs/icon-dd-invoice.svg';
import ddIcon4 from 'src/assets/images/svgs/icon-dd-date.svg';
import ddIcon5 from 'src/assets/images/svgs/icon-dd-mobile.svg';
import ddIcon6 from 'src/assets/images/svgs/icon-dd-cart.svg';
import { useNavigate } from 'react-router-dom';
const AppLinks = ({ close }) => {
  const navigate = useNavigate();

  const handleLinkClick = (href) => {
    close(); // Executa a função close
    navigate(href); // Navega para o link
  };
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const appsLink = [
  
    ...(currentUser?.type === 'realtor' || currentUser?.type === 'realstate'
      ? [
          {
            href: '/apps/dash',
            title: 'Dashboard',
            subtext: 'Veja dados dos seus imóveis',
            avatar: icon3,
          },
        ]
      : []),
    {
      href: '/apps/imoveis/list',
      title: 'Gestão de Imóveis',
      subtext: 'Gestão de imóveis',
      avatar: ddIcon3,
    },
  
    {
      href: '/apps/chats',
      title: 'Mensagens',
      subtext: 'Chat com corretores e clientes',
      avatar: ddIcon1,
    },
  
    {
      href: '/apps/meus-anuncios',
      title: 'Anúncios',
      subtext: 'Gerencie seus anúncios',
      avatar: ddIcon6,
    },
    {
      href: '/apps/calendar',
      title: 'Calendário',
      subtext: 'Agendamentos e visitas',
      avatar: ddIcon4,
    },
    // Adiciona o item de "Contacts" apenas se a condição for verdadeira
    ...(currentUser?.type === 'realtor' || currentUser?.type === 'realstate'
      ? [
          {
            href: '/apps/contacts',
            title: 'Compartilhamento',
            subtext: 'Veja pedidos de compartilhamento pendentes',
            avatar: ddIcon5,
          },
        ]
      : []),
  ];

  return (
    <Grid container spacing={2}>
      {appsLink.map((links, index) => (
        <Grid item lg={12} key={index} mb={2}>
          <Box
            onClick={() => handleLinkClick(links.href)}
            className="hover-text-primary"
            sx={{ cursor: 'pointer' }}
          >
            <Stack direction="row" spacing={2}>
              <Box
                minWidth="45px"
                height="45px"
                bgcolor="grey.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Avatar
                  src={links.avatar}
                  alt={links.avatar}
                  sx={{
                    width: 24,
                    height: 24,
                    borderRadius: 0,
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  color="textPrimary"
                  noWrap
                  className="text-hover"
                  sx={{
                    width: '240px',
                  }}
                >
                  {links.title}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  fontSize="12px"
                  sx={{
                    width: '240px',
                  }}
                  noWrap
                >
                  {links.subtext}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default AppLinks;
