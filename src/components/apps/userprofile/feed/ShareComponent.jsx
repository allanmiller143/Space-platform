/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTitle, IconButton, Slide, Typography, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';
import { IconShare } from '@tabler/icons';
import { Box } from '@mui/system';
import { Cancel } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShareComponent = ({ post, url }) => {
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Obtém a URL atual da página
  const shareUrl = `${window.location.origin}${url}${post.id}`;
  const title = 'Confira este link incrível!';

  const handleInstagramShare = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setSnackbarOpen(true); // Mostra alerta "Link copiado!"

      // Deep Link para abrir o Instagram Stories
      window.location.href = `https://www.instagram.com/stories/create/?url=${encodeURIComponent(shareUrl)}`;
    });
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            borderRadius: '10px', // Adiciona bordas arredondadas ao diálogo
            maxWidth: '400px', // Define a largura máxima do diálogo
          },
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center">
            <Typography variant="h4" component="span" style={{ flexGrow: 1 }}>
              Compartilhar
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleClose} aria-label="close">
              <Cancel />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <p>Você pode compartilhar este imóvel nas seguintes redes sociais:</p>
          <div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '20px' }}>
            <FacebookShareButton url={shareUrl} quote={title}>
              <FacebookIcon size={32} round={true} />
            </FacebookShareButton>

            <TwitterShareButton url={shareUrl} title={title}>
              <TwitterIcon size={32} round={true} />
            </TwitterShareButton>

            <LinkedinShareButton url={shareUrl} title={title} summary="Resumo do link">
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>

            <WhatsappShareButton url={shareUrl} title={title}>
              <WhatsappIcon size={32} round={true} />
            </WhatsappShareButton>

            {/* Instagram Stories */}
            <IconButton onClick={handleInstagramShare}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
              />
            </IconButton>
          </div>
        </DialogContent>
      </Dialog>

      {/* Botão de compartilhar */}
      <IconButton sx={{ ml: 'auto' }} onClick={handleClickOpen}>
        <IconShare size="16" />
      </IconButton>

      {/* Snackbar para feedback ao usuário */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Link copiado para a área de transferência!"
      />
    </div>
  );
};

export default ShareComponent;
