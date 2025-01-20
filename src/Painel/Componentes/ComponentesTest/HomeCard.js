/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {Stack,Avatar,Typography,CardMedia,Chip,Tooltip,Box,Skeleton,} from '@mui/material';
import { IconEye, IconHeart, IconPoint } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import { getData } from '../../../Services/Api';

const HomeCard = ({ post }) => {
  const [isLoading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const navigate = useNavigate();

  useEffect(() => {
    loadAdvertiser();
  }, []);

  async function loadAdvertiser() {
    setLoading(true);
    try {
      const response = await getData(`find/${post.advertiserEmail}`);
      if (response.status === 200 || response.status === 201) {
        setUserData(response.userInfo);
      } else {
        navigate('/error');
      }
    } catch (err) {
      navigate('/error');
    } finally {
      setLoading(false);
    }
  }

  function formatPrice(price) {
    if (price) {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return '';
  }

  return (
    <>
      {isLoading ? (
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height={'320px'}
          sx={{ borderRadius: 2 }}
        />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'stretch',
            borderRadius: 2,
            boxShadow: 3,
            overflow: 'hidden',
            cursor: 'pointer',
            mb: 2,
          }}
          onClick={() => navigate(`/imovel/${post.id}`)}
        >
          <CardMedia
            component="img"
            sx={{
              width: { xs: '100%', sm: '35%' },
              height:  { xs: '200px', sm: '320px' },

              objectFit: 'cover',
            }}
            image={
              post.pictures && post.pictures.length > 0
                ? "https://i.pinimg.com/236x/c6/76/6e/c6766e9ae05d777370ef8de3d90f4660.jpg"
                : ''
            }
            alt="Imagem do imóvel"
          />
          <Box sx={{ flex: 1, p: 2 }}>
            <Stack direction="row" spacing={1} mb={1} alignItems="center">
              <Tooltip title="Anunciante" placement="top">
                <Avatar
                  src={userData.profile ? userData.profile.url : ''}
                  alt="Anunciante"
                />
              </Tooltip>
              <Typography variant="body2" color="textSecondary">
                {userData.name}
              </Typography>
              <Chip
                label={post.negotiable ? 'Negociável' : 'Não Negociável'}
                size="small"
                sx={{
                  ml: 'auto',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? theme.palette.background.dark
                      : 'white',
                }}
              />
            </Stack>
            <Typography variant="h6" gutterBottom>
              {post.address.street} - {post.address.number}, {post.address.city}{' '}
              - {post.address.state}
            </Typography>
            <Typography 
              variant="body1" 
              gutterBottom 
              sx={{
                display: {sm: '-webkit-box', xs: 'none'},
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                WebkitLineClamp: 3, // Define o número máximo de linhas
                textOverflow: 'ellipsis',
              }}
            >
              {post.description}
            </Typography>
           
            <Typography variant="body2" color="textSecondary" mb={1}>
              {post.size} m² · {post.bedrooms} quarto(s) · {post.parkingSpaces}{' '}
              vaga(s)
            </Typography>
            {(post.announcementType === 'both' || post.announcementType === 'sell') && (
              <Typography variant="h6" color="primary" fontWeight="bold">
                R$ {formatPrice(post.prices.sellPrice)}
              </Typography>
            )}
            {(post.announcementType === 'both' || post.announcementType === 'rent') && (
              <Typography variant="body1" color="primary" fontWeight="bold">
                R$ {formatPrice(post.prices.rentPrice)} / mês
              </Typography>
            )}
            <Stack direction="row" spacing={2} mt={2} alignItems="center">
              <Stack direction="row" spacing={1} alignItems="center">
                <IconEye size="18" /> {post.timesSeen}
              </Stack>
              <Stack direction="row" spacing={1} alignItems="center">
                <IconHeart size="18" /> 0
              </Stack>
              <Stack direction="row" spacing={1} ml="auto" alignItems="center">
                <IconPoint size="16" />
                <Typography variant="body2">
                  {format(new Date(post.createdAt), "d 'de' MMMM", {
                    locale: ptBR,
                  })}
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
      )}
    </>
  );
};

HomeCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default HomeCard;
