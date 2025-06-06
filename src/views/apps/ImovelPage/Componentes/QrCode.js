import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import QRCode from 'qrcode';
import { 
  QrCode as QrCodeIcon, 
  Share, 
  Download, 
  Close,
  WhatsApp
} from '@mui/icons-material';

const QRCodeDialog = ({ url }) => {
  const [open, setOpen] = useState(false);
  const [qrCodeImage, setQrCodeImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (url && open) {
      setIsLoading(true);
      QRCode.toDataURL(url, { 
        width: 300, 
        margin: 2,
        color: {
          dark: '#763EBD', // Cor azul do Material-UI primary
          light: '#ffffff'
        }
      }, (error, qrCodeUrl) => {
        setIsLoading(false);
        if (error) {
          console.error('Erro ao gerar QR Code:', error);
        } else {
          setQrCodeImage(qrCodeUrl);
        }
      });
    }
  }, [open, url]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setQrCodeImage('');
  };

  const handleDownload = () => {
    if (!qrCodeImage) return;
    
    const link = document.createElement('a');
    link.href = qrCodeImage;
    link.download = `qrcode-${new Date().getTime()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareWhatsApp = () => {
    if (!url) return;
    
    const message = `Confira este link: ${url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <Tooltip title="Gerar QR Code">
        <IconButton onClick={handleOpen} color="primary">
          <QrCodeIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'end' }}>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" p={2}>
            {isLoading ? (
              <Box 
                width={300} 
                height={300} 
                display="flex" 
                justifyContent="center" 
                alignItems="center"
                bgcolor="#f5f5f5"
                borderRadius={1}
              >
                <Typography variant="body2">Gerando QR Code...</Typography>
              </Box>
            ) : qrCodeImage ? (
              <>
                <img
                  src={qrCodeImage}
                  alt="QR Code"
                  width="300"
                  height="300"
                  style={{ 
                    border: '1px solid #e0e0e0',
                    borderRadius: 4
                  }}
                />
              </>
            ) : (
              <Typography variant="body2">Erro ao gerar QR Code</Typography>
            )}
          </Box>
        </DialogContent>
        
        
        <DialogActions sx={{ justifyContent: 'end', p: 2 }}>
          <Box>
            <Tooltip title="Compartilhar no WhatsApp">
              <IconButton 
                onClick={handleShareWhatsApp} 
                color="success"
                disabled={!url}
              >
                <WhatsApp />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Download PNG">
              <IconButton 
                onClick={handleDownload} 
                color="primary"
                disabled={!qrCodeImage}
                sx={{ ml: 1 }}
              >
                <Download />
              </IconButton>
            </Tooltip>
          </Box>
          
        </DialogActions>
      </Dialog>
    </>
  );
};

export default QRCodeDialog;