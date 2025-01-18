import {Box,Typography,Container,Grid,} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import BannerTopLeft from 'src/assets/images/frontend-pages/homepage/banner-top-left.svg';
import BannerBottomPart from 'src/assets/images/frontend-pages/homepage/bottom-part.svg';
import BannerTopRight from 'src/assets/images/frontend-pages/homepage/banner-top-right.svg';

const Banner = () => {
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  return (
    <Box pt={7}>
      <Container
        sx={{
          maxWidth: '1400px !important',
          position: 'relative',
          mb : {md : -4, lg : 0},
        }}
      >
        <Grid container spacing={3} justifyContent="center" mb={4}>
          {lgUp ? (
            <Grid item xs={12} lg={2} alignItems="end" display="flex">
              <img
                src={BannerTopLeft}
                className="animted-img-2"
                alt="banner"
                width={360}
                height={200}
                style={{
                  borderRadius: '16px',
                  position: 'absolute',
                  left: '24px',
                  boxShadow: (theme) => theme.shadows[10],
                  height: 'auto',
                  width: 'auto',
                }}
              />
            </Grid>
          ) : null}

          <Grid item xs={12} lg={5} textAlign="center">
            <Typography
              variant="h1"
              fontWeight={700}
              lineHeight="1.2"
              mb={7}
              sx={{
                fontSize: {
                  xs: '40px',
                  sm: '56px',
                },
              }}
            >
              Mais{' '}
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: '40px',
                    sm: '56px',
                  },
                }}
                fontWeight={700}
                component="span"
                color="primary.main"
              >
                Controle
              </Typography>{' '}
              e{' '}
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    xs: '40px',
                    sm: '56px',
                  },
                }}
                fontWeight={700}
                component="span"
                color="primary.main"
              >
                Produtividade,
              </Typography>{' '}
              Conheça o Space Imoveis
            </Typography>
          </Grid>
          {lgUp ? (
            <Grid item xs={12} lg={2} alignItems="end" display="flex">
              <img
                src={BannerTopRight}
                className="animted-img-2"
                alt="banner"
                width={350}
                height={220}
                style={{
                  borderRadius: '16px',
                  position: 'absolute',
                  right: '24px',
                  boxShadow: (theme) => theme.shadows[10],
                  height: 'auto',
                  width: 'auto',
                }}
              />
            </Grid>
          ) : null}
        </Grid>

        {lgUp ? (
          <img
            src={BannerBottomPart}
            alt="banner"
            width={500}
            height={300}
            style={{
              width: '100%',
              marginBottom: '-11px',
            }}
          />
        ) : null}
      </Container>
    </Box>
  );
};

export default Banner;
