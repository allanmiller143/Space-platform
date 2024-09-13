/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Button, Stack, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import AuthSocialButtons from './AuthSocialButtons';
import { getData, postData } from '../../../Services/Api';
import {useNavigate} from 'react-router-dom';
import {toast} from 'sonner';
import Loading from '../../../components/Loading/Loading';

const AuthLogin = ({ title, subtitle, subtext }) => {
  // Definindo os estados para email e senha
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const handleLogin =  async (event) => {
    event.preventDefault(); 
    if(email === '' && password === ''){
      toast.error('por favor preencha todos os campos');
    }else{
      try{
        setLoading(true);
        const data =  {'email' : email, 'password': password};
        const response = await postData('login',data);
        if(response.status === 200 || response.status === 201){
          const token = response.data.token; 
          const user = response.data.user;
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
          toast.error('Email ou senha inválidos');
        }
      }catch(error){
        toast.error(error.message);
      }finally{
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading && <Loading data = {{open:loading}}/>}

      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}

      <AuthSocialButtons title="Sign in with" />
      <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            or sign in with
          </Typography>
        </Divider>
      </Box>

      <Stack component="form" onSubmit={handleLogin}>
        <Box>
          <CustomFormLabel htmlFor="email">Email</CustomFormLabel>
          <CustomTextField
            id="email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
          />
        </Box>
        <Box>
          <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
          />
        </Box>
        <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Remember this Device"
            />
          </FormGroup>
          <Typography
            component={Link}
            to="/auth/forgot-password"
            fontWeight="500"
            sx={{
              textDecoration: 'none',
              color: 'primary.main',
            }}
          >
            Forgot Password ?
          </Typography>
        </Stack>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit" // Define o botão como "submit"
          >
            Sign In
          </Button>
        </Box>
      </Stack>
      {subtitle}
    </>
  );
};

export default AuthLogin;
