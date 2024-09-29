/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { Grid, Box, Typography, Button, Avatar, Stack, CardMedia, styled, Fab, Skeleton } from '@mui/material';
import profilecover from '/mobiliado/imagem-1.jpg';
import userimg from 'src/assets/images/profile/user-1.jpg';
import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp } from '@tabler/icons';
import ProfileTab from './ProfileTab';
import BlankCard from '../../../shared/BlankCard';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const ProfileBanner = () => {
  const token = localStorage.getItem('token') || '';
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = cuString ? JSON.parse(cuString) : null;

  const ProfileImage = styled(Box)(() => ({
    borderRadius: '50%',
    width: '110px',
    height: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  }));

  const seePhone = () => {
    if (currentUserls) {
      const phoneNumber = currentUserls.info.phone.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
      // Redirecionar para o link do WhatsApp
      window.open(`https://wa.me/55${phoneNumber}`, '_blank');
    } else {
      toast.success('Faça um cadastro para enviar uma mensagem');
    }
  };

  const [isLoading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <BlankCard>
        {isLoading ? (
          <>
            <Skeleton variant="rectangular" animation="wave" width="100%" height={330}></Skeleton>
          </>
        ) : (
          <CardMedia
            component="img"
            image={profilecover}
            alt="Imagem de capa do perfil"
            sx={{ height: '370px', objectFit: 'cover' }}
          />
        )}
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          {/* Post | Followers | Following */}
          <Grid item lg={4} sm={12} md={5} xs={12} sx={{ order: { xs: '2', sm: '2', lg: '1' } }}>
            <Stack direction="row" textAlign="center" justifyContent="center" gap={6} m={3}>
              <Box>
                <Typography variant="h4" fontWeight="600">0</Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>Publicações</Typography>
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="600">{currentUserls.followers.length}</Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>Seguidores</Typography>
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="600">{currentUserls.follow.length}</Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>Seguindo</Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item lg={4} sm={12} xs={12} sx={{ order: { xs: '1', sm: '1', lg: '2' } }}>
            <Box display="flex" alignItems="center" textAlign="center" justifyContent="center" sx={{ mt: '-85px' }}>
              <Box>
                <ProfileImage>
                  <Avatar
                    src={currentUserls.profile.url}
                    alt={userimg}
                    sx={{ borderRadius: '50%', width: '100px', height: '100px', border: '4px solid #fff' }}
                  />
                </ProfileImage>
                <Box mt={1}>
                  <Typography fontWeight={600} variant="h5">@{currentUserls.handler}</Typography>
                  <Typography color="gray" variant="h6" fontWeight={400}>{currentUserls.name}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Friends following buttons */}
          <Grid item lg={4} sm={12} xs={12} sx={{ order: { xs: '3', sm: '3', lg: '3' } }}>
            <Stack direction={'row'} gap={2} alignItems="center" justifyContent="end" my={2} mr={2}>
              <Fab
                size="small"
                color="primary"
                sx={{ backgroundColor: '#1877F2' }}
                onClick={() => window.open(currentUserls.social.facebook, '_blank')}
              >
                <IconBrandFacebook size="16" />
              </Fab>
              <Fab
                size="small"
                color="success"
                sx={{ backgroundColor: '#25D366' }}
                onClick={() => seePhone()}
              >
                <IconBrandWhatsapp size="18" />
              </Fab>
              <Fab
                size="small"
                color="error"
                sx={{ backgroundColor: '#E4405F' }}
                onClick={() => window.open(currentUserls.social.instagram, '_blank')}
              >
                <IconBrandInstagram size="18" />
              </Fab>
              <Button color="primary" variant="contained" component={Link} to="/pages/account-settings">
                Editar Perfil
              </Button>
            </Stack>
          </Grid>
        </Grid>

        {/** Tab Content **/}
        <ProfileTab />
      </BlankCard>
    </>
  );
};

export default ProfileBanner;
