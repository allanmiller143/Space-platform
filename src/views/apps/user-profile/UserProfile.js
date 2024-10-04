import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import ProfileBanner from 'src/components/apps/userprofile/feed/ProfileBanner';

import { useParams } from 'react-router-dom';
import { getData } from '../../../Services/Api';
import { toast } from 'sonner';
import Spinner from '../../spinner/Spinner';

const UserProfile = () => {
  const [loadingUserData, setLoadingUserData] = useState(true); // Inicializando como true
  const { email } = useParams(); // Captura o email da URL
  const [userData, setUserData] = useState({});

  useEffect(() => {
    loadUserInfo();
  }, []);

  const loadUserInfo = async () => {
    setLoadingUserData(true); // Ativando o estado de carregamento

    try {
      const response = await getData(`find/${email}`);
      if (response.status === 200 || response.status === 201) {
        setUserData(response.userInfo);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error('Ocorreu um erro inesperado! Por favor, tente novamente mais tarde ou entre em contato com o suporte.');
    } finally {
      setLoadingUserData(false); // Desativando o estado de carregamento
    }
  };

  // Exibe o componente de Loading enquanto carrega os dados do usuário
  if (loadingUserData) {
    return <Spinner/>
  }
  
  return (
    <PageContainer title="User Profile" description="this is User Profile page">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <ProfileBanner userData={userData} />
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
