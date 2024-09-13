import { useState } from 'react';
import icon1 from 'src/assets/images/svgs/google-icon.svg';
import { auth, provider } from '../../../Services/FirebaseConfig';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import {toast} from 'sonner';
import {useNavigate} from 'react-router-dom';
import { getData, postData } from '../../../Services/Api';
import Loading from '../../../components/Loading/Loading';
import { Avatar, Box, Stack } from '@mui/material';
import CustomSocialButton from '../../../components/forms/theme-elements/CustomSocialButton';

function GoogleSignIn() {
  const [loading,setLoading] = useState(false);
  const Navigate = useNavigate();


  const handleSocialLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.idToken;
      const user = result.user;
      
      const userData = {
        'name': user.displayName,
        'email': user.email,
        'phone': user.phoneNumber,
      };

      setLoading(true);
      const getResponse = await getData(`find/${userData.email}`);
      if(getResponse.status === 200 || getResponse.status === 201){
        const tokenData = { 'googleToken': token };
        console.log(tokenData);
        const loginResponse = await postData('google', tokenData);
        
        if(loginResponse.status === 200 || loginResponse.status === 201){
          const token = loginResponse.data.token;
          const user = loginResponse.data.user;
          localStorage.setItem('token', token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          const favoritesResponse = await getData(`favorites/${user.email}`,token);
          if(favoritesResponse.status === 200 || favoritesResponse.status === 201){
            localStorage.setItem('currentUserFavorites', JSON.stringify(favoritesResponse.userInfo));
            Navigate('/');
            toast.success('Login efetuado com sucesso');
          }
          else{
            toast.error('Ocorreu um erro inesperado, por favor tente novamente mais tarde');
          }
        }else{
          toast.error(loginResponse.message);
        }
      }
      
      else{
        const response = await postData('clients', userData);
        console.log(userData);
        if(response.status === 200 || response.status === 201){
          const tokenData = { 'googleToken': token };
          const loginResponse = await postData('google', tokenData);
          if(response.status === 200 || response.status === 201){
            const token = loginResponse.data.token;
            const user = loginResponse.data.user;
            localStorage.setItem('token', token);
            localStorage.setItem('currentUser', JSON.stringify(user));
            localStorage.setItem('currentUserFavorites',JSON.stringify([]));
            Navigate('/see-package');
            toast.success('Conta criada e login feito com sucesso');
          }else{
            toast.error(loginResponse.message);
          }
        }
        else{
          toast.error(response.message);
        }
      }
    } catch (error) {
      toast.error('Ocorreu um erro inesperado');
    }finally {
      setLoading(false);
    }

  };
  return (
    <div className="GoogleSignIn__div">
      {loading && <Loading data={{ open: loading }} />}
      <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
      <CustomSocialButton onClick={handleSocialLogin}>
        <Avatar
          src={icon1}
          alt="Google Icon"
          sx={{
            width: 16,
            height: 16,
            borderRadius: 0,
            mr: 1,
          }}
        />
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, whiteSpace: 'nowrap', mr: { sm: '3px' } }}>
          Sign in with 
        </Box>{' '}
        Google
      </CustomSocialButton>
    </Stack>
    </div>

  );
}

export default GoogleSignIn;
