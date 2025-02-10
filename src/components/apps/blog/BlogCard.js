import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  CardContent,
  Stack,
  Avatar,
  Typography,
  CardMedia,
  Chip,
  Tooltip,
  Box,
  Skeleton,
} from '@mui/material';
import { IconEye, IconHeart, IconPoint } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import BlankCard from '../../shared/BlankCard';
import { getData } from '../../../Services/Api';

const BlogCard = ({ post }) => {
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
        <>
          <Skeleton
            animation="wave"
            variant="square"
            width="100%"
            height={440}
            sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}
          ></Skeleton>
        </>
      ) : (
        <Box sx={{ cursor: 'pointer', width: '100%' }} onClick={() => {
          window.open(`/imovel/${post.id}`, '_blank'); // Abre em uma nova aba
        }}>
          <BlankCard className="hoverCard">
            <Box sx = {{display: 'flex', justifyContent: 'center', position: 'relative'}}>
              <CardMedia
                component="img"
                sx={{
                  height: 240, // Altura fixa
                  width: '100%',
                  objectFit: 'cover', // Garante que a imagem cubra o espaço sem distorcer
                }}
                image={post.pictures && post.pictures.length > 0 ? post.pictures[0].url : ''}
                alt="Imagem do imóvel"
              />
              <Chip sx={{position: 'absolute', bottom: '5px',right:'10px',backgroundColor: (theme) =>theme.palette.mode === 'dark' ? theme.palette.background.dark : 'white',}}label={post.negotiable ? 'Negociável' : 'Não Negociável'} size="small"/>
              <Chip 
                sx={{
                  display: post.highlighted ? 'flex' : 'none',
                  position: 'absolute', 
                  top: '10px', 
                  left: '10px',
                  backgroundImage: 'linear-gradient(135deg, #E0F7FA, #FFFFFF, #B3E5FC, #E1F5FE, #FFFFFF)', 
                  color: '#211b15', 
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  boxShadow: '0px 2px 10px rgba(255, 255, 255, 0.6), 0px 2px 5px rgba(0, 0, 0, 0.2)', 
                  border: '1px solid rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(4px)', 
                  animation: 'zoomInOut 3s infinite ease-in-out', // Adicionando a animação
                  '@keyframes zoomInOut': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' } // Aumenta levemente e volta ao normal
                  }
                }} 
                label={'Destaque'} 
                size="small"
              />




              
            </Box>
            <CardContent>
              <Stack direction="row" sx={{ marginTop: '-45px' }}>
                <Tooltip title="" placement="top">
                  <Avatar aria-label="receita" src={userData.profile ? userData.profile.url : ''}></Avatar>
                </Tooltip>
                  
                    
                    
                    
                
              </Stack>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                <Box display={'flex'} flexDirection={'row'} alignItems={'center'} gap={1}>
                  <Chip
                    label={
                      post.propertyType === 'apartment'
                        ? 'Apartamento'
                        : post.propertyType === 'house'
                        ? 'Casa'
                        : post.propertyType === 'land'
                        ? 'Terreno'
                        : 'Fazenda/Chácara'
                    }
                    size="small"
                    sx={{ marginTop: 2 }}
                  ></Chip>
                  <Chip
                    label={
                      post.announcementType === 'both'
                        ? 'Ambos'
                        : post.announcementType === 'sell'
                        ? 'Venda'
                        : 'aluguel'
                    }
                    size="small"
                    sx={{ marginTop: 2 }}
                  ></Chip>
                </Box>

                <Typography variant="body2" color="textSecondary">
                  {post.size} m² · {post.bedrooms} quarto · {post.parkingSpaces} vaga
                </Typography>
              </Box>
              <Box my={1}>
                <Typography
                  gutterBottom
                  variant="h6"
                  color="inherit"
                  sx={{ textDecoration: 'none' }}
                >
                  {post.address.street} - {post.address.number}, {post.address.city} -{' '}
                  {post.address.state}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {/* Preço de Venda */}
                  {(post.announcementType === 'both' || post.announcementType === 'sell') && (
                    <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
                      R$ {formatPrice(post.prices.sellPrice)}
                    </Typography>
                  )}

                  {/* Separador */}
                  {(post.announcementType === 'both' || post.announcementType === 'sell') &&
                    (post.announcementType === 'both' || post.announcementType === 'rent') && (
                      <Typography variant="body1" sx={{ mx: 1 }}>
                        |
                      </Typography>
                    )}

                  {/* Preço de Aluguel */}
                  {(post.announcementType === 'both' || post.announcementType === 'rent') && (
                    <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
                      R$ {formatPrice(post.prices.rentPrice)} / mês
                    </Typography>
                  )}
                </Box>
              </Box>
              <Stack direction="row" gap={3} alignItems="center">
                <Stack direction="row" gap={1} alignItems="center">
                  <IconEye size="18" /> {post.timesSeen}
                </Stack>
                <Stack direction="row" gap={1} alignItems="center">
                  <IconHeart size="18" /> 0
                </Stack>

                <Stack direction="row" ml="auto" alignItems="center">
                  <IconPoint size="16" />
                  <small>
                    {format(new Date(post.createdAt), " d 'de' MMMM", { locale: ptBR })}
                  </small>
                </Stack>
              </Stack>
            </CardContent>
          </BlankCard>
        </Box>
      )}
    </>
  );
};

BlogCard.propTypes = {
  post: PropTypes.object.isRequired,
};

export default BlogCard;