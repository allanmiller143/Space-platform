import {Grid} from '@mui/material';
import { useParams } from 'react-router';
import ProductCarousel from 'src/components/apps/ecommerce/productDetail/ProductCarousel';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import ProductDetail from 'src/components/apps/ecommerce/productDetail/ProductDetail';
import ChildCard from 'src/components/shared/ChildCard';
import { useEffect, useState } from 'react';
import { getData } from '../../../Services/Api';
import Spinner from '../../spinner/Spinner';

const EcommerceDetail = () => {
  const [loading, setLoading] = useState(false);
  const [myPost, setMyPost] = useState(null); // Inicia como null para diferenciar dados ausentes
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
      <Breadcrumb title="Detalhes do post" />

      {loading ? (
        <Spinner height="80vh" />
      ) : myPost ? ( // Verifica se myPost não é null antes de renderizar os componentes
        <Grid container spacing={3} sx={{ maxWidth: { lg: '1055px', xl: '1200px' } }}>
          <Grid item xs={12} sm={12} lg={12}>
            <ChildCard>
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
      ) : (
        <p>No data available</p> // Mensagem opcional se não houver dados
      )}
    </PageContainer>
  );
};

export default EcommerceDetail;
