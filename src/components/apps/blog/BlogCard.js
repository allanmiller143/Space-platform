import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {CardContent,Stack,Avatar,Typography,CardMedia,Chip,Tooltip,Box,Skeleton,} from '@mui/material';
import { IconEye, IconHeart, IconPoint } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';
import BlankCard from '../../shared/BlankCard';
import { getData } from '../../../Services/Api';

const BlogCard = ({ post }) => {
  const [isLoading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const navigate = useNavigate();

  useEffect(() => {
    loadAdvertiser()
  }, []);

  async function loadAdvertiser() {
    setLoading(true);
    try{
      const response = await getData(`find/${post.advertiserEmail}`);
      if (response.status === 200 || response.status === 201) {
        setUserData(response.userInfo);
      } else {
        navigate('/error');
      }
    }catch(err){
      navigate('/error');
    }finally{
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
            height={400}
            sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}
          ></Skeleton>
        </>
      ) : (
        <Box sx = {{ cursor: 'pointer' }} onClick={() => navigate(`/imovel/${post.id}`)} >
          <BlankCard className="hoverCard"    >

            <CardMedia component="img" height="240" image={(post.pictures && post.pictures.length > 0) ? post.pictures[0].url : ''}  alt="iguana verde" />
            <CardContent>
              <Stack direction="row" sx={{ marginTop: '-45px' }}>
                <Tooltip title='' placement="top">
                  <Avatar aria-label="receita" src={userData.profile  ? userData.profile.url : ''}></Avatar>
                </Tooltip>
                <Chip
                  sx={{ marginLeft: 'auto', marginTop: '-21px', backgroundColor: (theme) => theme.palette.mode === 'dark' ? theme.palette.background.dark : 'white', }}
                  label={post.negotiable ? 'Negociável' : 'Não Negociável'}
                  size="small"
                ></Chip>
              </Stack>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end'}}>
                <Chip  label = {post.propertyType === 'apartment' ? 'Apartamento' : post.propertyType === 'house' ? 'Casa' : post.propertyType === 'land' ? 'Terreno' : 'Fazenda/Chácara'}size="small" sx={{ marginTop: 2 }}></Chip>
                <Typography variant="body2" color="textSecondary">
                  {post.size} m² · {post.bedrooms} quarto · {post.parkingSpaces} vaga
                </Typography>   
              </Box>
              <Box my={1}>
                <Typography
                  gutterBottom
                  variant="h5"
                  color="inherit"
                  sx={{ textDecoration: 'none', }}
                >
                  {post.address.street} - {post.address.number}, {post.address.city} - {post.address.state}
                </Typography>

                  {(post.announcementType === 'both' || post.announcementType === 'sell') && (
                    <Typography variant="body1" component="div" sx={{ fontWeight: 'bold', my: 1 }}>
                        R$ {formatPrice(post.prices.sellPrice)}
                    </Typography>
                  )}
                  {(post.announcementType === 'both' || post.announcementType === 'rent') && (
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                        R$ {formatPrice(post.prices.rentPrice)} / mês
                    </Typography>
                  )}
              
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
                  <small>{format(new Date(post.createdAt), " d 'de' MMMM", { locale: ptBR })}</small>
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
