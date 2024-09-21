
import  { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import Loading from 'src/components/Loading/Loading';
import { postData } from 'src/Services/Api';

const AuthForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Função para tratar o envio da recuperação de senha
  const handleForgotPassword = async () => {
    if (email.trim()) {
      setLoading(true);
      try {
        const data = {
          email: email,
        };
        const sendEmailResponse = await postData('rescue/password', data);
        if (sendEmailResponse.status === 200 || sendEmailResponse.status === 201) {
          toast.success('Email enviado com sucesso');
          navigate('/auth/two-steps', { state: { email: email } });
        } else {
          console.log(sendEmailResponse);
          toast.error('Ocorreu um erro ao enviar o e-mail, por favor tente novamente mais tarde');
        }
      } catch (error) {
        toast.error('Ocorreu um erro ao enviar o e-mail, por favor tente novamente mais tarde');
      } finally {
        setLoading(false);
      }
    } else {
      toast.error('Por favor, insira um endereço de email válido.');
    }
  };

  return (
    <>
      {loading && <Loading data={{ open: loading }} />}

      <Stack mt={4} spacing={2}>
        <CustomFormLabel htmlFor="reset-email">Endereço de Email</CustomFormLabel>
        <CustomTextField
          id="reset-email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
        />
        <Button
          color="primary"
          variant="contained"
          size="large"
          fullWidth
          onClick={handleForgotPassword} // Função chamada ao clicar no botão
        >
          Enviar código
        </Button>
        <Button color="primary" size="large" fullWidth component={Link} to="/auth/login">
          Voltar para o login
        </Button>
      </Stack>
    </>
  );
};

export default AuthForgotPassword;
