/* eslint-disable react/prop-types */
import  { useState, useRef } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import Loading from 'src/components/Loading/Loading';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { postData } from 'src/Services/Api';

const AuthTwoSteps = ({ email }) => {
  const [code, setCode] = useState(['', '', '', '']);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (value, index) => {
    const newCode = [...code];

    // Handle deletion
    if (value === '' && index > 0) {
      newCode[index] = '';
      setCode(newCode);
      inputsRef.current[index - 1]?.focus();
    } else if (value === '' && index === 0) {
      newCode[index] = ''; // Clear the first digit
      setCode(newCode);
    }

    // Handle digit input
    if (value.match(/^[0-9]$/)) {
      newCode[index] = value;
      setCode(newCode);

      if (index < 3 && inputsRef.current[index + 1]) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleVerifyCode = async () => {
    const verificationCode = code.join('');
    if (password !== confirmPassword) {
      toast.error('As senhas devem ser iguais');
    } else if (verificationCode.length === 4) {
      try {
        setLoading(true);
        const data = {
          email: email,
          otp: verificationCode,
          password: password,
        };
        console.log(data);
        const sendEmailResponse = await postData('reset/password', data);
        if (sendEmailResponse.status === 200 || sendEmailResponse.status === 201) {
          toast.success('Senha alterada com sucesso');
          navigate('/auth/login'); // Redireciona após sucesso
        } else {
          toast.error(sendEmailResponse.message);
        }
      } catch (error) {
        toast.error('Ocorreu um erro inesperado, por favor tente novamente mais tarde');
      } finally {
        setLoading(false);
        setPassword('');
        setCode(['', '', '', '']);
        setConfirmPassword('');
      }
    } else {
      toast.error('Por favor, insira o código de verificação correto');
    }
  };

  return (
    <>
      {loading && <Loading data={{ open: loading }} />}
      <Stack mb={2}>
        <CustomFormLabel htmlFor="code">Enter the verification code</CustomFormLabel>
        <Stack spacing={1} direction="row">
          {code.map((digit, index) => (
            <CustomTextField
              key={index}
              id={`code-${index}`}
              variant="outlined"
              fullWidth
              inputProps={{
                maxLength: 1,
                style: { textAlign: 'center' }
              }}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              inputRef={(el) => (inputsRef.current[index] = el)}
            />
          ))}
        </Stack>
      </Stack>
      <Box mb={2}>
        <CustomFormLabel htmlFor="password">New Password</CustomFormLabel>
        <CustomTextField
          id="password"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Box>
      <Box mb={3}>
        <CustomFormLabel htmlFor="confirm-password">Confirm Password</CustomFormLabel>
        <CustomTextField
          id="confirm-password"
          type="password"
          variant="outlined"
          fullWidth
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </Box>
      <Typography color="textSecondary" fontWeight="400" fontSize={12} mb={1}>
        Your new password must be at least 8 characters long, with at least one uppercase, one lowercase letter, and one special character.
      </Typography>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        onClick={handleVerifyCode}
      >
        Change password
      </Button>
    </>
  );
};

export default AuthTwoSteps;
