/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Typography, Button, Divider, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Importar o ícone de voltar
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { Stack } from '@mui/system';
import AuthSocialButtons from './AuthSocialButtons';
import { toast } from 'sonner';
import { postData, postFormData } from '../../../Services/Api';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import GoogleSignIn from './AuthGoogleSignIn';

const AuthSimpleRegister = ({ title, subtitle, subtext, onBack }) => {
  const [name, setName] = useState('allan');
  const [email, setEmail] = useState('miller@gmail.com');
  const [password, setPassword] = useState('32172528A');
  const [confirmPassword, setConfirmPassword] = useState('32172528A');
  const Navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Por favor, preencha todos os campos.');
      return;
    }
    if (password !== confirmPassword) {
      toast.error('As senhas não conferem.');
      return;
    }
    setLoading(true);
    try {
        const postDataExample = {
          'name': name,
          'email': email,
          'password': password,
          'phone': '',
          'type': 'client'
        };

        const form = new FormData();
        form.append('data', JSON.stringify(postDataExample));
        const response = await postFormData('clients', form);
        if (response.status === 201 || response.status === 200) {
          const data = { 'email': email, 'password': password };
          const loginResponse = await postData('login', data);
          if (loginResponse.status === 200 || loginResponse.status === 201){
            const token = loginResponse.data.accessToken;
            const user = loginResponse.data.user;
            localStorage.setItem('token', token);
            localStorage.setItem('currentUser', JSON.stringify(user));
            Navigate('/');
            toast.success('Conta criada e login feito com sucesso');
          } else {
            toast.error(loginResponse.message);
          }
        } else {
          toast.error(response.message);
          console.log(response);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
  };

  return (
    <>
      {loading && <Loading data={{ open: loading }} />}

      {title ? (
        <Typography fontWeight="700" variant="h3" mb={1}>
          {title}
        </Typography>
      ) : null}

      {subtext}
      <Box mt={3} sx={{ minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
        <Box flex={1}>
          <Stack mb={3}>
            <CustomFormLabel htmlFor="name">Nome</CustomFormLabel>
            <CustomTextField
              id="name"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <CustomFormLabel htmlFor="email">Endereço de Email</CustomFormLabel>
            <CustomTextField
              id="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <CustomFormLabel htmlFor="password">Senha</CustomFormLabel>
            <CustomTextField
              id="password"
              variant="outlined"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <CustomFormLabel htmlFor="confirmPassword">Confirmar Senha</CustomFormLabel>
            <CustomTextField
              id="confirmPassword"
              variant="outlined"
              fullWidth
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Typography variant="body2" color="textSecondary" textAlign="left" mt={2}>
                A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um número e um caractere especial
            </Typography>
          </Stack>

          {/* Botão de Finalizar Cadastro */}
          <Box mt={2} sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handleRegister}>
              Finalizar Cadastro
            </Button>
          </Box>

          {/* Divider e Botões Sociais */}
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
                ou cadastre-se com
              </Typography>
            </Divider>
          </Box>

          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <GoogleSignIn />
          </Box>
        </Box>
      </Box>

      {subtitle}
    </>
  );
};

export default AuthSimpleRegister;
