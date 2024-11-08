import { Grid } from '@mui/material';
import { useParams } from 'react-router';
import ProductCarousel from 'src/components/apps/ecommerce/productDetail/ProductCarousel';
import PageContainer from '../../../components/container/PageContainer';
import ProductDetail from 'src/components/apps/ecommerce/productDetail/ProductDetail';
import ChildCard from 'src/components/shared/ChildCard';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async'; // Importa o Helmet
import { getData } from '../../../Services/Api';
import Spinner from '../../spinner/Spinner';

const EcommerceDetail = () => {
  const [loading, setLoading] = useState(false);
  const [myPost, setMyPost] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    loadPostInfo();
  }, []);

  const loadPostInfo = async () => {
    setLoading(true);
    try {
      const response = await getData(`posts/id/${id}`, {});
      if (response.status === 200 || response.status === 201) {
        console.log(response.userInfo);
        setMyPost(response.userInfo);
      } else {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer title="Shop List" description="this is Shop List page">
      {loading ? (
        <Spinner height="80vh" />
      ) : myPost ? (
        <>
          {/* Meta tags para redes sociais */}
          <Helmet>
            <title>{myPost.title}</title>
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`https://spaceimoveis.netlify.app/apps/post/${id}`} />
            <meta property="og:title" content={myPost.title} />
            <meta property="og:description" content={myPost.description} />
            <meta property="og:image" content={myPost.postMedia.length > 0 ? myPost.postMedia[0].url : 'URL_da_imagem_do_imóvel'} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={`https://spaceimoveis.netlify.app/apps/post/${id}`} />
            <meta name="twitter:title" content={myPost.title} />
            <meta name="twitter:description" content={myPost.description} />
            <meta name="twitter:image" content={myPost.postMedia.length > 0 ? myPost.postMedia[0].url : 'URL_da_imagem_do_imóvel'} />
          </Helmet>

          <Grid container spacing={3} sx={{ maxWidth: { lg: '1055px', xl: '1200px' } }}>
            <Grid item xs={12} sm={12} lg={12}>
              <ChildCard title="Detalhes do post">
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12} lg={6}>
                    <ProductCarousel post={myPost} />
                  </Grid>
                  <Grid item xs={12} sm={12} lg={6}>
                    <ProductDetail post={myPost} />
                  </Grid>
                </Grid>
              </ChildCard>
            </Grid>
          </Grid>
        </>
      ) : (
        <p>No data available</p>
      )}
    </PageContainer>
  );
};

export default EcommerceDetail;
