import { useState } from 'react';
import { Box, Button, Stepper, Step, StepLabel, TextField, Typography, Container, CardContent, Grid } from '@mui/material';
import { toast } from 'sonner';
import BlankCard from '../../../shared/BlankCard';
import { postData } from '../../../../Services/Api';
import { useNavigate } from 'react-router-dom';

//import { sendVerificationCode, resetPassword } from '../../../../Services/Api';

const TrocarSenha = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem('currentUser')).email || '');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendingEmail, setResendingEmail] = useState(false);
  const steps = ['Verificação de E-mail', 'Redefinir Senha', 'Confirmação'];
  const user = JSON.parse(localStorage.getItem('currentUser'));


  const handleSendCode = async () => {
    if (email.trim()) {
      setResendingEmail(true);
      try {
        const data = {
          email: email,
        };
        const sendEmailResponse = await postData('rescue/password', data);
        if (sendEmailResponse.status === 200 || sendEmailResponse.status === 201) {
          console.log(sendEmailResponse)
          toast.success('Email enviado com sucesso');
          setStep(1);
        } else {
          console.log(sendEmailResponse);
          toast.error('Ocorreu um erro ao enviar o e-mail, por favor tente novamente mais tarde');
        }
      } catch (error) {
        toast.error('Ocorreu um erro ao enviar o e-mail, por favor tente novamente mais tarde');
      } finally {
        setResendingEmail(false);
      }
    } else {
      toast.error('Por favor, insira um endereço de email válido.');
    }
  };
  const handleResetPassword = async () => {
    if (code.length === 4) {
      try {
        setLoading(true);
        console.log(code);
        const data = {
          email: email,
          otp: code,
          password: newPassword,
        };
        console.log(data);
        const sendEmailResponse = await postData('reset/password', data);
        if (sendEmailResponse.status === 200 || sendEmailResponse.status === 201) {
          toast.success('Senha alterada com sucesso');
                  setStep(2);
      setEmail('');
      setCode('');
      setNewPassword('');
        } else {
          toast.error(sendEmailResponse.message);
        }
      } catch (error) {
        toast.error('Ocorreu um erro inesperado, por favor tente novamente mais tarde');
      } finally {
        setLoading(false);
        setNewPassword('');
      }
    } else {
      toast.error('Por favor, insira o código de verificação correto');
    }
  };
  

  return (
    <Grid item xs={12} md={7}>
      <BlankCard>
        <CardContent>
        <Typography variant="h4" mb={3} textAlign="center">Trocar Senha</Typography>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box mt={4}>
          {step === 0 && (
            <>
              <Typography variant='body1' mb={2}>Digite seu e-mail para receber um código de verificação.</Typography>
              <TextField fullWidth variant="outlined" label="E-mail" value={email} disabled onChange={(e) => setEmail(e.target.value)} />
              <Button variant="contained" color="primary" onClick={handleSendCode} disabled={!email || loading} sx={{ mt: 2 }}>
                {resendingEmail ? 'Enviando...' : 'Enviar Código'}
              </Button>
            </>
          )}
          {step === 1 && (
            <>
              <Typography variant='body1' mb={2}>Digite o código de verificação recebido e sua nova senha.</Typography>
              <TextField fullWidth variant="outlined" label="Código de Verificação" value={code} onChange={(e) => setCode(e.target.value)} />
              <TextField fullWidth variant="outlined" label="Nova Senha" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} sx={{ mt: 2 }} />
              <Button variant="contained" color="primary" onClick={handleResetPassword} disabled={!code || !newPassword || resendingEmail}  sx={{ mt: 2 }}>
                {loading ? 'Redefinindo...' : (resendingEmail) ? "Redefinir Senha" :  'Redefinir Senha'}
              </Button>

              <Button variant="contained" color="primary" onClick={handleSendCode}  sx={{ mt: 2, ml: 2 }} disabled={resendingEmail || loading}>
                {resendingEmail ? 'enviando' : 'reenviar código'}
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <Typography variant='h5' mb={2} textAlign="center">Senha alterada com sucesso!</Typography>
              <Typography variant='body1' textAlign="center">Agora você pode fazer login com sua nova senha.</Typography>
            </>
          )}
        </Box>
        </CardContent>
      </BlankCard>
    </Grid>
  );
};

export default TrocarSenha;
