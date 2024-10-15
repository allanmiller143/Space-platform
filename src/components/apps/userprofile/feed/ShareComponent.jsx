/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTitle, IconButton, Slide, Tooltip, Typography } from '@mui/material';
import React, { useState } from 'react';
import {FacebookShareButton,FacebookIcon,TwitterShareButton,TwitterIcon,LinkedinShareButton,LinkedinIcon,WhatsappShareButton,WhatsappIcon,} from 'react-share';
import { IconShare } from '@tabler/icons';
import { Box } from '@mui/system';
import { Cancel } from '@mui/icons-material';

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
  //const shareUrl = `https://spaceimoveis.netlify.app/apps/post/${post.id}`;
  const shareUrl = `localhost:5173/apps/post/${post.id}`;

  const title = 'Confira este link incrível!';

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

            <a
              href={'https://www.instagram.com/'}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                alt="Instagram"
                style={{ width: '32px', height: '32px', borderRadius: '50%' }}
              />
            </a>

            {/* Adicione mais botões de compartilhamento conforme necessário */}
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
