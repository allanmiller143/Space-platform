/* eslint-disable react/prop-types */
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
import { getData } from '../../../../Services/Api';
import { use } from 'i18next';

const ProfileBanner = ({userData,socket}) => {

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
    if(userData.socials.length === 0 ||  userData.socials[1].url === '.'){
      toast.error('Este perfil ainda não possui telefone cadastrado!');
      return;
    }

      const phoneNumber = userData.socials[1].url.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
      window.open(`https://wa.me/55${phoneNumber}`, '_blank');

  };

  return (
    <>
      <BlankCard>
      
        <CardMedia
          component="img"
          image={profilecover}
          alt="Imagem de capa do perfil"
          sx={{ height: '370px', objectFit: 'cover' }}
        />
        
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          {/* Post | Followers | Following */}
          <Grid item lg={4} sm={12} md={5} xs={12} sx={{ order: { xs: '2', sm: '2', lg: '1' } }}>
            <Stack direction="row" textAlign="center" justifyContent="center" gap={6} m={3}>
              <Box>
                <Typography variant="h4" fontWeight="600">0</Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>Publicações</Typography>
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="600">{userData.followers.length}</Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>Seguidores</Typography>
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="600">{userData.follow.length}</Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>Seguindo</Typography>
              </Box>
            </Stack>
          </Grid>

          <Grid item lg={4} sm={12} xs={12} sx={{ order: { xs: '1', sm: '1', lg: '2' } }}>
            <Box display="flex" alignItems="center" textAlign="center" justifyContent="center" sx={{ mt: '-85px' }}>
              <Box>
                <ProfileImage>
                  <Avatar
                    src={userData.profile && userData.profile.url}
                    alt={userimg}
                    sx={{ borderRadius: '50%', width: '100px', height: '100px', border: '4px solid #fff' }}
                  />
                </ProfileImage>
                <Box mt={1}>
                  <Typography fontWeight={600} variant="h5">@{userData.handler}</Typography>
                  <Typography color="gray" variant="h6" fontWeight={400}>{userData.name}</Typography>
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
                onClick={() => {
                  if(userData.socials[0].url === '.'){
                    toast.error('Este perfil ainda não possui Facebook cadastrado!');
                    return;
                  }
                  window.open(`https://www.facebook.com/${userData.socials[0].url.replace('@', '')}`, '_blank')}
                }
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
                onClick={() =>{
                  if(userData.socials[2].url === '.'){
                    toast.error('Este perfil ainda não possui Instagram cadastrado!');
                    return;
                  }
                  window.open(`https://www.instagram.com/${userData.socials[2].url.replace('@', '')}`, '_blank')}
                } 
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
      </BlankCard>
      <ProfileTab email={userData.email} socket={socket} />
    </>
  );
};

export default ProfileBanner;
