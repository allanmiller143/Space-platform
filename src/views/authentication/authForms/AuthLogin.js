/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from 'react';
import { Box, Typography, FormGroup, FormControlLabel, Button, Stack, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import CustomCheckbox from '../../../components/forms/theme-elements/CustomCheckbox';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { getData, postData } from '../../../Services/Api';
import {useNavigate} from 'react-router-dom';
import {toast} from 'sonner';
import Loading from '../../../components/Loading/Loading';
import GoogleSignIn from './AuthGoogleSignIn';
import { openNotification } from '../../../Services/Notification/NotificationApi';
import NotificationContext from '../../../Services/Notification/NotificationContext/NotificationContext';

const AuthLogin = ({ title, subtitle, subtext }) => {
  // Definindo os estados para email e senha
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();
  const {notificationSocket, notifications, setNotifications } = useContext(NotificationContext);

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
          const token = response.data.accessToken; 
          const user = response.data.user;
          localStorage.setItem('token', token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          Navigate('/');
          toast.success('Login efetuado com sucesso');

        }else{
          toast.error('Email ou senha inválidos');
        }
      }catch(error){
        Navigate('/error');
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

      {/* <GoogleSignIn/> */}
      {/* <Box mt={3}>
        <Divider>
          <Typography
            component="span"
            color="textSecondary"
            variant="h6"
            fontWeight="400"
            position="relative"
            px={2}
          >
            ou faça login com
          </Typography>
        </Divider>
      </Box> */}

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
          <CustomFormLabel htmlFor="password">Senha</CustomFormLabel>
          <CustomTextField
            id="password"
            type="password"
            variant="outlined"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
          />
        </Box>
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            sx={{ my: 2 }}
          >
            Iniciar sessão
          </Button>
        </Box>
        <Stack direction="column" spacing={2} sx={{ my: 2 }}>
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label="Lembre-se deste dispositivo"
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
            Esqueceu sua senha?
          </Typography>
        </Stack>
      </Stack>
      {subtitle}
    </>
  );
};

export default AuthLogin;
