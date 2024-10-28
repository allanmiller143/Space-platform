import  { useState } from 'react';
import { Box, Menu, Avatar, Typography, Divider, IconButton, Button } from '@mui/material';
import * as dropdownData from './data';
import { IconMail } from '@tabler/icons';
import { Stack } from '@mui/system';
import ProfileImg from 'src/assets/images/profile/user-1.jpg';
import unlimitedImg from 'src/assets/images/backgrounds/unlimited-bg.png';
import Scrollbar from 'src/components/custom-scroll/Scrollbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Profile = () => {
  const [anchorEl2, setAnchorEl2] = useState(null);
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString); // Parse para obter o objeto
  const [profileImageUrl] = useState( (currentUserls && currentUserls.type !== 'client' && currentUserls.profile) ? currentUserls.profile?.url : ''); // Estado para a URL da imagem do perfil
  const [name] = useState(!currentUserls ? '' : currentUserls.name || '');
  const [type] = useState( !currentUserls  ? '' : currentUserls.type === 'realstate' ? 'Imobiliária' : currentUserls.type === 'realtor' ? 'Corretor de imóveis' : currentUserls.type === 'owner' ? 'Vendedor' : 'Usuário');
  const [email] = useState(currentUserls ? currentUserls.email : '');
  const navigate = useNavigate();
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const toProfilePage = () => {
    if(currentUserls && currentUserls.type !== 'client') {
      navigate(`/user-profile/${email.replaceAll(/[.]/g, '-')}`);
    }else{
      navigate('/auth/complete-register2');

    }
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
    toast.success('Sessão encerrada com sucesso');
  }

  return (
    <Box display="flex"   alignItems="center">
      <Typography variant="caption"><strong>{name}</strong> </Typography>
      <IconButton
        size="large"
        aria-label="mostrar novas notificações"
        color="inherit"
        aria-controls="msgs-menu"
        aria-haspopup="true"
        sx={{
          ...(typeof anchorEl2 === 'object' && {
            color: 'primary.main',
          }),
        }}
        onClick={handleClick2}
      >
        <Avatar
          src={profileImageUrl}
          alt={ProfileImg}
          sx={{
            width: 35,
            height: 35,
          }}
        />
      </IconButton>
      
      <Menu
        id="msgs-menu"
        anchorEl={anchorEl2}
        keepMounted
        open={Boolean(anchorEl2)}
        onClose={handleClose2}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        sx={{
          '& .MuiMenu-paper': {
            width: '360px',
          },
        }}
      >
        <Scrollbar sx={{ height: '100%', maxHeight: '85vh' }}>
          <Box p={3}>
            <Typography variant="h5">Perfil</Typography>
            <Stack direction="row" py={3} spacing={2} alignItems="center">
              <Avatar src={profileImageUrl} alt={ProfileImg} sx={{ width: 95, height: 95 }} />
              <Box>
                <Typography variant="subtitle2" color="textPrimary" fontWeight={600}>
                  {name}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  {type}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  display="flex"
                  alignItems="center"
                  gap={1}
                >
                  <IconMail width={15} height={15} />
                  {email}
                </Typography>
              </Box>
            </Stack>
            
            <Divider />
            {
              currentUserls && currentUserls.type === 'client' ?
                <Box> 
                              {dropdownData.profileNoCompleted.map((profile) => (
              <Box key={profile.title}>
                <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
                <Box onClick={toProfilePage} >
                  <Stack direction="row" spacing={2}>
                      <Box
                        width="45px"
                        height="45px"
                        bgcolor="primary.light"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Avatar
                          src={profile.icon}
                          alt={profile.icon}
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
                          className="text-hover"
                          noWrap
                          sx={{
                            width: '240px',
                          }}
                        >
                          {profile.title}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          sx={{
                            width: '240px',
                          }}
                          noWrap
                        >
                          {profile.subtitle}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            ))}
                </Box> 
              :
              <Box> 
              {dropdownData.profile.map((profile) => (
              <Box key={profile.title}>
                <Box sx={{ py: 2, px: 0 }} className="hover-text-primary">
                <Box onClick={toProfilePage} >
                  <Stack direction="row" spacing={2}>
                      <Box
                        width="45px"
                        height="45px"
                        bgcolor="primary.light"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Avatar
                          src={profile.icon}
                          alt={profile.icon}
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
                          className="text-hover"
                          noWrap
                          sx={{
                            width: '240px',
                          }}
                        >
                          {profile.title}
                        </Typography>
                        <Typography
                          color="textSecondary"
                          variant="subtitle2"
                          sx={{
                            width: '240px',
                          }}
                          noWrap
                        >
                          {profile.subtitle}
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            ))}
            </Box>   
            }


            <Button  variant="outlined" color="error" onClick={logout} fullWidth sx={{ mt: 2, cursor: 'pointer'}}>
              <Typography> sair </Typography>
            </Button>

            <Box mt={2}>
              <Box bgcolor="primary.light" p={3} mb={3} overflow="hidden" position="relative">
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <Typography variant="h5" mb={2}>
                      Acesso <br />
                      Ilimitado
                    </Typography>
                    <Button variant="contained" color="primary">
                      Atualizar
                    </Button>
                  </Box>
                  <img src={unlimitedImg} alt="ilimitado" className="signup-bg"></img>
                </Box>
              </Box>
            </Box>

          </Box>
        </Scrollbar>
      </Menu>
    </Box>
  );
};

export default Profile;
