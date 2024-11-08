/* eslint-disable react/prop-types */
import {Avatar,Box,Button,CircularProgress,Divider,Fab,Pagination,TextField,Tooltip,Typography,} from '@mui/material';
import PostComments from '../../userprofile/feed/PostComments';
import { useRef, useState } from 'react';
import { Stack } from '@mui/system';
import { postData } from '../../../../Services/Api';
import { toast } from 'sonner';
import { IconThumbUp } from '@tabler/icons';
import ShareComponent from '../../userprofile/feed/ShareComponent';

const ProductDetail = ({ post }) => {
  const scrollContainerRef = useRef(null);
  const commentsPerPage = 5; // Número de comentários por página
  const [loadingComment, setLoadingComment] = useState(false); // Novo estado para o carregamento
  const [totalItems, setTotalItems] = useState(post.PostComments.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [comment, setComment] = useState('');
  const [postComments, setPostComments] = useState(post.PostComments); // Estado para os comentários
  const token = localStorage.getItem('token');
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString);
  const isPostLiked = post.PostLikes.some((item) => item.email === currentUserls.email);
  const [postLiked, setPostLiked] = useState(isPostLiked);
  const [linkesLength, setLinkesLength] = useState(post.likes);

  // Calcular os comentários a serem exibidos com base na página atual
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = postComments.slice(indexOfFirstComment, indexOfLastComment);

  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.offsetTop, // Rolar para o topo da caixa de comentários
        behavior: 'smooth', // Rolagem suave
      });
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
        const newComment = response.data; // Pegue o novo comentário da resposta
        setPostComments([newComment, ...postComments]); // Adiciona o novo comentário ao topo da lista
        setTotalItems(totalItems + 1); // Atualiza o total de comentários
        setComment(''); // Limpa o campo de comentário
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingComment(false); // Finaliza o carregamento
    }
  };

  return (
    <Box p={2} height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
      <Box>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}> 
          <Typography variant="h2">Detalhes do post</Typography>
          <Box display={'flex'} gap={3}  >
            <Box>
              <Tooltip title="Compartilhar" placement="top">
                <ShareComponent post={post} sx={{ ml: 'auto' }} />
              </Tooltip>
            </Box>
            <Box display={'flex'} alignItems={'center'} gap={1}>
              <Tooltip title="Curtir" placement="top" onClick={() => handleLike(post.id)}>
                <Fab size="small" color={postLiked ? 'primary' : 'default'}>
                    <IconThumbUp size="16"  />
                </Fab>
              </Tooltip>
              <Typography variant="body1" fontWeight={600} >
                {linkesLength}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box pt={2} pb={2}>
          <Typography variant="body1">{post.text}</Typography>
        </Box>
        <Divider/>
        <Box pt={2}></Box>
        <Box ref={scrollContainerRef} p={-2}>
          <Box display={'flex'} justifyContent={'space-between'} pb={2}>
            <Typography variant="h6">Comentários</Typography>
            <Typography variant="h6">{totalItems}</Typography>
          </Box>
          {currentComments.map((comment, index) => (
            <PostComments
              comment={comment}
              key={comment.id}
              isLast={index === currentComments.length - 1} // Verifica se é o último comentário
            />
          ))}
          {currentComments.length === 0 && (
            <Box
              pt={2}
              pb={2}
              height={'100%'}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexGrow={1}
              backgroundColor={'#f6f6f6'}
            >
              {' '}
              <Typography variant="body1">Nenhum comentário, seja o primeiro a comentar</Typography>{' '}
            </Box>
          )}

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
      </Box>

      <Box py={2}>
        <Stack direction="column" gap={2}>
          {/* Box com Avatar e TextField */}
          <Box display="flex" alignItems="start" gap={2}>
            <Avatar
              src={currentUserls.profile && currentUserls.profile.url ? currentUserls.profile.url : ''}
              sx={{ width: '33px', height: '33px', my: 1 }}

            />
            <Box sx={{ flexGrow: 1, display : 'flex',flexDirection : 'column', alignItems : 'end' }}>
              <TextField
                placeholder="Comentar"
                value={comment}
                onChange={(e) => setComment(e.target.value.slice(0, 400))} // Limita a 400 caracteres
                variant="outlined"
                size="small"
                multiline
                maxRows={4}
                fullWidth
                sx={{ flexGrow: 1 }} // Ocupa o máximo de espaço disponível
              />
              <Typography width={'100%'} variant="caption" color="textSecondary" align="right"> 
                {comment.length}/400
              </Typography>

            </Box>
            
          </Box>

          {/* Box com o botão */}
          <Box display="flex" justifyContent={ 'flex-end'}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleComment}
              disabled={loadingComment}
              sx={{ width: 'auto' }} // Botão em largura total em telas pequenas
            >
              {loadingComment ? <CircularProgress size={24} /> : 'Comentar'}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductDetail;
