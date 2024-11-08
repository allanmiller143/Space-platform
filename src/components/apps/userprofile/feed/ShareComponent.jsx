/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTitle, IconButton, Slide, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinShareButton, LinkedinIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';
import { IconShare } from '@tabler/icons';
import { Box } from '@mui/system';
import { Cancel } from '@mui/icons-material';
import { Helmet } from 'react-helmet-async';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShareComponent = ({ post }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  // Obtém a URL atual da página
  const shareUrl = `https://spaceimoveis.netlify.app/apps/post/${post.id}`; // a URL do post
  const title =  'Confira este link incrível!';
  const description = 'post';
  const imageUrl = post.PostMedia.length > 0 ? post.PostMedia[0].url : 'URL_da_imagem_do_imóvel';

  return (
    <div>
      <Helmet>
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* Outras meta tags que você deseja adicionar */}
      </Helmet>

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
          </div>
        </DialogContent>
      </Dialog>

      <IconButton sx={{ ml: 'auto' }} onClick={handleClickOpen}>
        <IconShare size="16" />
      </IconButton>
    </div>
  );
};

export default ShareComponent;
