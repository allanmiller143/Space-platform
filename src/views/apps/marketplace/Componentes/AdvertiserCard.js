/* eslint-disable react/prop-types */
import { Typography, Button, Avatar } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const AdvertiserCard = ({ advertiser }) => {
  const [type, setType] = useState('');
  const navigate = useNavigate();
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString);

  useEffect(() => {
    if (advertiser) {
      if (advertiser.type === 'realtor') {
        setType('Corretor');
      } else if (advertiser.type === 'realstate') {
        setType('Imobiliária');
      } else {
        setType('Vendedor');
      }
    }
  }, [advertiser]);

  const toProfilePage = () => {
    if (currentUserls) {
      navigate(`/user-profile/${advertiser.email.replaceAll(/[.]/g, '-')}`);
    } else {
      toast.warning('Por favor, complete seu perfil para acessar esta página');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: '10px',
        width: '100%',
        maxWidth: '400px',
      }}
    >
      {advertiser && (
        <>
          {/* Avatar */}
          <Avatar
            sx={{
              height: 72,
              width: 72,
              border: '2px solid #e0e0e0',
              flexShrink: 0,
            }}
            src={advertiser.profile ? advertiser.profile.url : ''}
          />

          {/* Content */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
            }}
          >
            {/* Name */}
            <Typography
              variant="h6"
              component="h4"
              fontWeight="500"
              sx={{ color: '#333' }}
            >
              {advertiser.name}
            </Typography>

            {/* Handler and Type */}
            <Typography
              variant="body2"
              sx={{ color: '#757575', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              @{advertiser.handler}

            </Typography>
          </Box>

          {/* Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={toProfilePage}
            sx={{
              textTransform: 'none',
              backgroundColor: 'primary',
              color: '#fff',
              whiteSpace: 'nowrap',
            }}
          >
            Ver perfil
          </Button>
        </>
      )}
    </Box>
  );
};

export default AdvertiserCard;
