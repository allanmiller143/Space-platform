/* eslint-disable react/prop-types */
import { useState,useRef } from 'react';
import { Stack, Avatar, Box, Typography, CardMedia, Grid, IconButton, Fab, Tooltip, Popover, MenuItem, TextField, Divider, Button, Pagination, CircularProgress } from '@mui/material';
import { IconCircle, IconMessage2, IconThumbUp, IconDotsVertical } from '@tabler/icons';
import { useSelector } from 'react-redux';
import {toast } from 'sonner';
import BlankCard from '../../../shared/BlankCard';
import { ptBR } from 'date-fns/locale';
import { formatDistanceToNowStrict } from 'date-fns';
import { deleteData, postData } from '../../../../Services/Api';
import PostComments from './PostComments';
import ShareComponent from './ShareComponent';
import { useNavigate } from 'react-router';

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
  const [showComments, setShowComments] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(post.PostComments.length);
  const scrollContainerRef = useRef(null);
  const commentsPerPage = 5; // Número de comentários por página
  const [loadingComment, setLoadingComment] = useState(false); // Novo estado para o carregamento
  const Navigate = useNavigate();

  const handleComment = async () => {
    if (comment === '') {
      return;
    }

    const data = {
      text: comment,
    };
    setLoadingComment(true); // Inicia o carregamento

    try {
      const response = await postData(`posts/comment/${post.id}`, data, token);
      if (response.status === 200 || response.status === 201) {
        console.log(response);
        // Adiciona o novo comentário no topo da lista de comentários
        setTotalItems(totalItems + 1);
        setMyPost(myPost.map((item) => (item.id === post.id 
          ? { 
              ...item, 
              PostComments: [response.data, ...item.PostComments] // Novo comentário na frente
            } 
          : item)));
        setComment('');
        setShowComments(true);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err);
    }finally {
      setLoadingComment(false); // Finaliza o carregamento
    }
  };

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

  const seePost = () => {
    console.log(post.id);
    Navigate(`/apps/post/${post.id}`);
  };

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.offsetTop, // Rolar para o topo da caixa de comentários
        behavior: 'smooth', // Rolagem suave
      });
    }
  };

  // Calcular os comentários a serem exibidos com base na página atual
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = post.PostComments.slice(indexOfFirstComment, indexOfLastComment);


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
          <Avatar alt="Fernando Dias" src={post.photo !== null ? post.photo : ''} />
          <Typography variant="h6">{post.name}</Typography>
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
              <MenuItem onClick={() => { handleClose(); seePost(); }}> Ver publicação </MenuItem>
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
          <Stack direction="row" gap={1} alignItems="center" justifyContent={'space-between'} > 
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Tooltip title="Curtir" placement="top" onClick={() => handleLike(post.id)}>
                <Fab size="small" color={postLiked ? 'primary' : 'default'}>
                  <IconThumbUp size="16"  />
                </Fab>
              </Tooltip>
              <Typography variant="body1" fontWeight={600} >
                {linkesLength}
              </Typography>

              <Tooltip title="Comentar" placement="top">
                <Fab sx={{ ml: 2 }} size="small" color="secondary" onClick={() => setShowComments(!showComments)}>
                  <IconMessage2 size="16" />
                </Fab>
              </Tooltip>
              <Typography variant="body1" fontWeight={600}>
                {post.PostComments.length}
              </Typography>
            </Box>
            <Tooltip title="Compartilhar" placement="top">
              <ShareComponent post={post} sx={{ ml: 'auto' }} />
            </Tooltip>
          </Stack>
        </Box>
      </Box>

      { <Box>
        {showComments ? (
          <Box ref={scrollContainerRef}>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography variant="h6" sx={{ mt: 2, ml: 2.5 }}>Comentários</Typography>
              <Typography variant="h6" sx={{ mt: 2, mr: 3 }}>{totalItems}</Typography>
            </Box>
            {currentComments.map((comment, index) => (
              <PostComments comment={comment} key={comment.id} post={post} isLast={index === currentComments.length - 1} />
            ))}
            {totalItems > commentsPerPage && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, mb: 4 }}>
                <Pagination
                  count={Math.ceil(totalItems / commentsPerPage)}
                  page={currentPage}
                  onChange={handleChangePage}
                />
              </Box>
            )}
          </Box>
        ) : (
          ''
        )}

        </Box>
       }
      <Divider/>
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleComment}
              disabled={loadingComment} // Desativa o botão durante o carregamento
            >
              {loadingComment ? <CircularProgress size={24} /> : 'Comentar'}
            </Button>
        </Stack>
      </Box>
    </BlankCard>
  );
};

export default PostItem;
