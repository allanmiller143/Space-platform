import React, { useEffect } from 'react';
import {
  Grid,
  Box,
  Typography,
  Button,
  Avatar,
  Stack,
  CardMedia,
  styled,
  Fab,
  Skeleton,
} from '@mui/material';
import profilecover from '/mobiliado/imagem-1.jpg';
import userimg from 'src/assets/images/profile/user-1.jpg';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
} from '@tabler/icons';
import ProfileTab from './ProfileTab';
import BlankCard from '../../../shared/BlankCard';
import { Link } from 'react-router-dom';

const ProfileBanner = () => {
  const ProfileImage = styled(Box)(() => ({
    borderRadius: '50%',
    width: '110px',
    height: '110px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto',
  }));
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
            sx={{
              height: '370px',
              objectFit: 'cover',
            }}
          />
        )}
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          {/* Post | Followers | Following */}
          <Grid
            item
            lg={4}
            sm={12}
            md={5}
            xs={12}
            sx={{
              order: {
                xs: '2',
                sm: '2',
                lg: '1',
              },
            }}
          >
            <Stack direction="row" textAlign="center" justifyContent="center" gap={6} m={3}>
              <Box>
                <Typography variant="h4" fontWeight="600">
                  0
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Publicações
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="600">
                  0
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Seguidores
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="600">
                  0
                </Typography>
                <Typography color="textSecondary" variant="h6" fontWeight={400}>
                  Seguindo
                </Typography>
              </Box>
            </Stack>
          </Grid>
          {/* about profile */}
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              order: {
                xs: '1',
                sm: '1',
                lg: '2',
              },
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              textAlign="center"
              justifyContent="center"
              sx={{
                mt: '-85px',
              }}
            >
              <Box>
                <ProfileImage>
                  <Avatar
                    src={userimg}
                    alt={userimg}
                    sx={{
                      borderRadius: '50%',
                      width: '100px',
                      height: '100px',
                      border: '4px solid #fff',
                    }}
                  />
                </ProfileImage>
                <Box mt={1}>
                  <Typography fontWeight={600} variant="h5">
                    Fernando Dias
                  </Typography>
                  <Typography color="gray" variant="h6" fontWeight={400}>
                    @fernandodias.corretor
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          {/* friends following buttons */}
          <Grid
            item
            lg={4}
            sm={12}
            xs={12}
            sx={{
              order: {
                xs: '3',
                sm: '3',
                lg: '3',
              },
            }}
          >
            <Stack direction={'row'} gap={2} alignItems="center" justifyContent="end" my={2} mr={2}>
              <Fab size="small" color="primary" sx={{ backgroundColor: '#1877F2' }}>
                <IconBrandFacebook size="16" />
              </Fab>
              <Fab size="small" color="success" sx={{ backgroundColor: '#25D366' }}>
                <IconBrandWhatsapp size="18" />
              </Fab>
              <Fab size="small" color="error" sx={{ backgroundColor: '#E4405F' }}>
                <IconBrandInstagram size="18" />
              </Fab>
              <Button color="primary" variant="contained" component={Link} to="/pages/account-settings">
                Editar Perfil
              </Button>
            </Stack>
          </Grid>
        </Grid>
        {/**TabbingPart**/}
        <ProfileTab />
      </BlankCard>
    </>
  );
};

export default ProfileBanner;
