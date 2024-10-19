/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Typography, Button, Avatar } from '@mui/material';
import { Box } from '@mui/system';
import { IconCheck } from '@tabler/icons';
import { useEffect, useState } from 'react';
import image from "../../../../assets/images/posters/imagem-26.jpg"
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
const AdvertiserCard = ({advertiser}) => {

  const [type, setType] = useState('');
  const navigate = useNavigate();
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString); // Parse para obter o objeto

  useEffect(() => {
    if (advertiser) {
      if(advertiser.type === 'realtor'){
        setType('Corretor')
      }else if(advertiser.type === 'realstate'){
        setType('Imobiliária')
      }else{
        setType('Vendedor')
      }
    }
  }, [advertiser])

  const toProfilePage = () => {
    if(currentUserls) {
      navigate(`/user-profile/${advertiser.email.replaceAll(/[.]/g, '-')}`);
    }else{
      toast.warning('Por favor, complete seu perfil para acessar esta página');
    }
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {advertiser && ( <>
            <Box sx={{
                p: 0,
                borderColor: '#e1e1e1',
                boxShadow: '0px 2px 4px #60606069',
                overflow: 'hidden',
                pt: '13px',
                mb: 3,
                backgroundColor: '#fff',
                borderRadius: '8px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid #e1e1e1'
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginBottom: '16px',
                    width: '100%'
                }}>
                    <Box sx={{
                        position: 'relative',
                        width: '100%',
                        height: 120,
                        backgroundImage: `url(${advertiser.banner ? advertiser.banner.url : image})`,
                        backgroundSize: 'cover',
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0
                    }}>

                        <Avatar 
                          sx={{
                            position: 'absolute',
                            bottom: -40,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            height: 60,
                            width: 60,
                            borderRadius: '50%',
                            zIndex: 1000,
                            marginBottom: '16px'
                          }}   
                          src={ advertiser.profile ? advertiser.profile.url : ''}                     
                        />
                    </Box>
                    <Typography variant="h6" component="h4" fontWeight="bold" sx={{ mt: 3,display: 'flex', alignItems: 'center' }}>
                        <IconCheck sx={{
                            mr: 1,
                            width: 14,
                            height: 14,
                            bottom: -1,
                            position: 'relative',
                            color: 'red'
                        }} />
                        {advertiser.name}
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: '8px',
                    width: '100%',
                    justifyContent: 'center'
                }}>
                    <Typography variant="body1" sx={{ marginRight: '8px', color: '#757575' }}>@{advertiser.handler}</Typography>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#e0e0e0',
                        borderRadius: '12px',
                        padding: '4px 10px',
                        color: '#757575',
                        fontSize: '12px'
                    }}>   
                        {type}
                    </Box>
                </Box>
                <Button variant="contained" color="secondary" onClick={toProfilePage} fullWidth sx={{
                    mt:1,
                    backgroundColor: '#f50057',
                    color: '#fff',
                    '&:hover': {
                        backgroundColor: '#c51162'
                    }
                }}>Ver perfil</Button>
            </Box>
            

            </>
          )}
    </Box>
  );
};

export default AdvertiserCard;


















