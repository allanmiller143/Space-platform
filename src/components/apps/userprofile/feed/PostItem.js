/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Stack, Avatar, Box, Typography, CardMedia, Grid, IconButton, Fab, Tooltip, Popover, MenuItem, TextField } from '@mui/material';
import { IconCircle, IconMessage2, IconShare, IconThumbUp, IconDotsVertical } from '@tabler/icons';
import { useSelector } from 'react-redux';
import {toast } from 'sonner';
import BlankCard from '../../../shared/BlankCard';
import { ptBR } from 'date-fns/locale';
import { formatDistanceToNowStrict } from 'date-fns';
import { deleteData, postData } from '../../../../Services/Api';
import { Button } from 'antd';

const PostItem = ({ post, setMyPost, myPost }) => {
  const token = localStorage.getItem('token');
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString);
  const customizer = useSelector((state) => state.customizer);
  const [anchorEl, setAnchorEl] = useState(null);
  const isPostLiked = post.PostLikes.some((item) => item.email === currentUserls.email);
  const [postLiked, setPostLiked] = useState(isPostLiked);
  const [linkesLength, setLinkesLength] = useState(post.likes);
  const [comment, setComment] = useState('');

  const handleLike = async (postId) => {
    setPostLiked(!postLiked);

    if (postLiked) {
      setLinkesLength(linkesLength - 1);
    } else {
      setLinkesLength(linkesLength + 1);
    }
    try {
      await postData(`posts/like/${postId}`, {}, token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePost = async () => {
    try {
      const response = await deleteData(`posts/${post.id}`, token);
      if (response.status === 204 || response.status === 201) {
        setMyPost(myPost.filter((item) => item.id !== post.id));
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <BlankCard
      sx={{
        backgroundColor: postLiked ? 'lightyellow' : 'white', // Altera a cor de fundo se o post estiver curtido
        border: postLiked ? '1px solid orange' : '1px solid transparent', // Altera a borda se o post estiver curtido
        transition: 'all 0.3s ease', // Transição suave
      }}
    >
      <Box p={3}>
        <Stack direction={'row'} gap={2} alignItems="center" position={'relative'}>
          <Avatar alt="Fernando Dias" src={currentUserls.profile && currentUserls.profile.url ? currentUserls.profile.url : ''} />
          <Typography variant="h6">{currentUserls.name}</Typography>
          <Typography variant="caption" color="textSecondary">
            <IconCircle size="7" fill="" fillOpacity={'0.1'} strokeOpacity="0.1" />{' '}
            {formatDistanceToNowStrict(new Date(post.createdAt), {
              addSuffix: false,
              locale: ptBR,
            })}{' '}
            atrás
          </Typography>

          <IconButton sx={{ position: 'absolute', right: 0 }} aria-describedby={id} onClick={handleClick}>
            <IconDotsVertical size="24" />
          </IconButton>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Box p={2}>
              <MenuItem onClick={() => { /* Função de Editar */ handleClose(); }}>Editar</MenuItem>
              <MenuItem onClick={() => { handleClose(); deletePost(); }}>Excluir</MenuItem>
            </Box>
          </Popover>
        </Stack>

        <Box py={2}>{post.text || ''}</Box>

        {post.PostMedia && post.PostMedia.length > 0 && (
          <Box>
            <Grid container spacing={3} mb={2}>
              {post.PostMedia.map((photo) => (
                <Grid item sm={12} key={photo.id}>
                  <CardMedia
                    component="img"
                    sx={{ borderRadius: customizer.borderRadius / 4, height: 360 }}
                    image={photo ? photo.url : ''}
                    alt="capa"
                    width={'100%'}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        <Box>
          <Stack direction="row" gap={1} alignItems="center">
            <Tooltip title="Curtir" placement="top" onClick={() => handleLike(post.id)}>
              <Fab size="small" color={postLiked ? 'primary' : 'default'}>
                <IconThumbUp size="16"  />
              </Fab>
            </Tooltip>
            <Typography variant="body1" fontWeight={600} >
              {linkesLength}
            </Typography>

            <Tooltip title="Comentar" placement="top">
              <Fab sx={{ ml: 2 }} size="small" color="secondary">
                <IconMessage2 size="16" />
              </Fab>
            </Tooltip>
            <Typography variant="body1" fontWeight={600}>
              0
            </Typography>
            <Tooltip title="Compartilhar" placement="top">
              <IconButton sx={{ ml: 'auto' }}>
                <IconShare size="16" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Box>
      <Box p={2}>
        <Stack direction={'row'} gap={2} alignItems="center">
          <Avatar
            src={currentUserls.profile && currentUserls.profile.url ? currentUserls.profile.url : ''}
            sx={{ width: '33px', height: '33px' }}
          />
          <TextField
            placeholder="Comentar"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="outlined"
            size='small'
            fullWidth
          />
          <Button variant="contained">
            Comentar
          </Button>
        </Stack>
      </Box>
    </BlankCard>
  );
};

export default PostItem;
