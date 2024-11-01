/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { Grid, Box, Typography, Button, Avatar, Stack, CardMedia, styled, Fab, Skeleton, Dialog, DialogContent, DialogActions, CircularProgress } from '@mui/material';
import profilecover from '/mobiliado/imagem-1.jpg';
import userimg from 'src/assets/images/profile/user-1.jpg';
import { IconBrandFacebook, IconBrandInstagram, IconBrandWhatsapp } from '@tabler/icons';
import ProfileTab from './ProfileTab';
import BlankCard from '../../../shared/BlankCard';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { deleteData, getData, postData, putFormData } from '../../../../Services/Api';
import Loading from '../../../Loading/Loading';



const ProfileBanner = ({userData,socket,myPost,setMyPost}) => {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const cuString = localStorage.getItem('currentUser');
  const token = localStorage.getItem('token');
  const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
  const [coverImageUrl, setCoverImageUrl] = useState(userData.banner && userData.banner.url ? userData.banner?.url : '/images/default-cover.jpg');
  const fileInputRefCover = useRef(null);
  const [following, setFollowing] = useState(false);
  const [loadFollowing, setLoadFollowing] = useState(false);

  useEffect(() => {
    if (currentUserls.email !== userData.email) {
      const isFollowing = currentUserls.follow.some(follow => follow.followedEmail === userData.email);
      setFollowing(isFollowing);
    }
  }, [currentUserls.follow, userData.email]);




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


  const follow = async () => {
    setLoadFollowing(true);
    try {
      setLoading(true);
      const response = await postData(`follow/${userData.email}`,{},token);
      if (response.status === 200 || response.status === 201) {
        toast.success('Seguido com sucesso');

        currentUserls.follow.push(response.data);
        localStorage.setItem('currentUser', JSON.stringify(currentUserls));
        setFollowing(true);


      } else {
        toast.error('Erro ao seguir');
      }
      console.log(response);
      setLoadFollowing(false);
    } catch (error) {
      toast.error('Erro ao seguir');
      setLoadFollowing(false);
    }
  }

  const unfollow = async () => {
    setLoadFollowing(true);
    try {
      setLoading(true);
      const response = await deleteData(`follow/${userData.email}`,token);
      if (response.status === 200 || response.status === 201) {
        toast.success('Deixou de Seguir com sucesso');
        currentUserls.follow = currentUserls.follow.filter(follow => follow.followedEmail !== userData.email);
        localStorage.setItem('currentUser', JSON.stringify(currentUserls));
      } else {
        toast.error('Erro ao deixar de seguir');
      }
      console.log(response);
      setLoadFollowing(false);
    } catch (error) {
      toast.error('Erro ao deixar de seguir');
      setLoadFollowing(false);
    }
  }

  const handleCoverFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewImage(objectUrl);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPreviewImage(null);
  };

  const uploadCoverImage = async (file) => {
    const formData = new FormData();
    formData.append('banner', file);

    try {
      setLoading(true);
      const response = await putFormData(`${currentUserls.type}/${currentUserls.email}`, formData, token);
      if (response.status === 200 || response.status === 201) {
        const responseUserData = await getData(`find/${currentUserls.email}`);
        if (responseUserData.status === 200) {
          const user = responseUserData.userInfo;
          localStorage.setItem('currentUser', JSON.stringify(user));
          setCoverImageUrl(user.banner?.url); // Atualiza a URL da imagem de perfil
          toast.success('Imagem inserida com sucesso');
        } else {
          toast.error(`Erro ao obter dados do usuário:\n ${responseUserData.message}`);
        }
      }
    } catch (error) {
      toast.error(`Erro ao inserir imagem:\n ${error.message}`);
    } finally {
      fileInputRefCover.current.value = null;
      setLoading(false);
      handleCloseDialog(); // Fechar o dialog após o envio
    }
  };

  const handleSubmitCoverImage = () => {
    const file = fileInputRefCover.current.files[0];
    if (file) {
      uploadCoverImage(file);
    }
  };


  return (
    <>
      <BlankCard>
        <Box
          sx={{
            height: '260px',
            backgroundImage: `url(${coverImageUrl})`,
            backgroundColor: '#d4d4d4',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            position: 'relative',
            borderBottomLeftRadius: '0px',
            borderBottomRightRadius: '0px'
          }}
        >
         <Stack direction="column" spacing={2} sx={{ position: 'absolute', top: 16, right: 16 }}>
            {userData.email === currentUserls.email ? 
              <Button variant="text" component="label" startIcon={<IconBrandInstagram size="18" />}>
                Enviar imagem de capa 
                <input type="file" accept="image/jpeg,image/png" onChange={handleCoverFileChange} style={{ display: 'none' }} ref={fileInputRefCover} />
              </Button> : null
            }
          </Stack>
        </Box>
        <Grid container spacing={0} justifyContent="center" alignItems="center">
          {/* Post | Followers | Following */}
          <Grid item lg={4} sm={12} md={5} xs={12} sx={{ order: { xs: '2', sm: '2', lg: '1' } }}>
            <Stack direction="row" textAlign="center" justifyContent="center" gap={6} m={3} sx={{ display: 'none' }}>
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
                  <Typography color="gray" variant="h6" fontWeight={400} mb={2}>{userData.name}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item lg={4} sm={12} xs={12} sx={{ order: { xs: '3', sm: '3', lg: '3' } }}>
            <Stack direction={'row'} gap={2} alignItems="center" justifyContent="end" my={2} mr={2}>
              <Box sx={{ display: userData.socials.length === 0 ? 'none' : 'flex', gap: 2 }}>
                <Fab
                  size="small"
                  color="primary"
                  sx={{ backgroundColor: '#1877F2', display: (userData.socials[0] && userData.socials[0].url === '.') ? 'none' : ' ' }}
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
                  sx={{ backgroundColor: '#25D366', display: (userData.socials[1] && userData.socials[1].url === '.') ? 'none' : ' '  }}
                  onClick={() => seePhone()}
                >
                  <IconBrandWhatsapp size="18" />
                </Fab>
                <Fab
                  size="small"
                  color="error"
                  sx={{ backgroundColor: '#E4405F', display: (userData.socials[0] && userData.socials[2].url === '.') ? 'none' : ' '  }}
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
              </Box>
              {userData.email === currentUserls.email ? 
                <Button color="primary" variant="contained" component={Link} to="/pages/account-settings">Editar Perfil</Button> 
                : 
                <Button 
                  disabled={loadFollowing}
                  color="primary"
                  variant="contained" 
                  onClick={ following ? unfollow : follow}>
                  {following ? 'Deixar de seguir' : 'Seguir'} {loadFollowing ? <span style={{ marginLeft: '5px', display: 'inline-flex', alignItems: 'center' }}>  <CircularProgress size={20} pl ={2} color="inherit" />  </span>: ''}
                </Button> 
              } 

            </Stack>
          </Grid>
        </Grid>

        {/** Tab Content **/} 
      </BlankCard>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        {loading && <Loading data={{ open: loading }} />}
        <DialogContent>
          {previewImage && <img src={previewImage} alt="Preview" style={{ width: '100%', height: 'auto' }} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancelar</Button>
          <Button onClick={handleSubmitCoverImage} color="primary">Enviar</Button>
        </DialogActions>
      </Dialog>
      <ProfileTab email={userData.email} socket={socket} myPost={myPost} setMyPost={setMyPost} userData = {userData} />
    </>
  );
};

export default ProfileBanner;
