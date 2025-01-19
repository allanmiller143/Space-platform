/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  TextField,
  Tooltip,Divider
} from '@mui/material';
import { CopyAll, Cancel, CheckCircleOutline, ErrorOutline } from '@mui/icons-material';
import { postData, getData } from '../Api'; // postData para criar o PIX, getData para consultar status

const PaymentButton = ({ data, close }) => {
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [base64, setBase64] = useState(null);
  const [code, setCode] = useState(null);

  const handlePost = async () => {
    setLoading(true);
    setOpenDialog(true);

    try {
      const response = await postData('criar-pix', data);
      if (response.status === 200 || response.status === 201) {
        setBase64(response.data.point_of_interaction.transaction_data.qr_code_base64);
        setCode(response.data.point_of_interaction.transaction_data.qr_code);
        setPaymentId(response.data.id);
      } else {
        console.error(response);
      }
    } catch (e) {
      console.error('Erro ao gerar o pagamento:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let statusInterval;
    if (paymentId) {
      statusInterval = setInterval(async () => {
        try {
          const response = await getData(`payment-status/${paymentId}`);
          if (response.status === 200) {
            setPaymentStatus(response.userInfo.status);
            if (response.userInfo.status === 'approved' || response.userInfo.status === 'rejected') {
              clearInterval(statusInterval);
            }
          }
        } catch (e) {
          console.error('Erro ao consultar o status do pagamento:', e);
        }
      }, 5000);
    }
    return () => clearInterval(statusInterval);
  }, [paymentId]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setBase64(null);
    setCode(null);
    setPaymentStatus('pending');
    setPaymentId(null);
    close();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <>
      <Button onClick={handlePost} disabled={loading} variant="contained" color="primary">
        {loading ? 'Gerando PIX...' : 'Pagar'}
      </Button>

      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Para pagar escolha uma dessas opções
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleCloseDialog} aria-label="close">
              <Cancel />
            </IconButton>
          </Box>
        </DialogTitle>
        <Divider/>

        <DialogContent>
          {loading && (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <Typography>Gerando QR Code...</Typography>
            </Box>
          )}

          {(!loading && paymentStatus === 'pending') && (
            <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
              <Typography alignSelf={'start'} variant="body2">QR Code</Typography>
              {base64 && (
                <Box
                  component="img"
                  src={`data:image/png;base64,${base64}`}
                  alt="QR Code"
                  width={200}
                  height={200}
                  sx={{ border: '1px solid #ccc', borderRadius: 2 }}
                />
              )}
              <Box display="flex" alignItems="center" gap={2} width="100%">
                <TextField
                  label="Código de pagamento"
                  value={code || ''}
                  fullWidth
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Tooltip title="Copiar código">
                  <IconButton onClick={handleCopy} color="primary">
                    <CopyAll />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          )}
         
          {(!loading && paymentStatus) && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                textAlign: 'center',
                gap: 2,
              }}
            >
              {paymentStatus === 'approved' ? (
                <>
                  <Box sx={{ color: 'success.main', fontSize: 64 }}>
                    <CheckCircleOutline fontSize="inherit" />
                  </Box>
                  <Typography variant="h5" color="success.main" fontWeight="bold">
                    Pagamento bem-sucedido!
                  </Typography>
                  <Typography variant="body1">
                    Seu novo limite de imóveis para postar foi aumentado.
                  </Typography>
                </>
              ) : paymentStatus === 'rejected' ? (
                <>
                  <Box sx={{ color: 'error.main', fontSize: 64 }}>
                    <ErrorOutline fontSize="inherit" />
                  </Box>
                  <Typography variant="h5" color="error.main" fontWeight="bold">
                    Pagamento rejeitado.
                  </Typography>
                  <Typography variant="body1">
                    Infelizmente, o pagamento não pôde ser aprovado. Por favor, tente novamente em alguns instantes.
                  </Typography>
                </>
              ) : (
                <>
                  <Typography variant="h5" color="text.primary" fontWeight="bold" pt = {2}>
                    Aguardando pagamento...
                  </Typography>
                </>
              )}

            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentButton;
