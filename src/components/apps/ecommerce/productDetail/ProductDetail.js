/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  Pagination,
  TextField,
  Typography,
} from '@mui/material';

import PostComments from '../../userprofile/feed/PostComments';
import { useRef, useState } from 'react';
import { Stack } from '@mui/system';
import { postData } from '../../../../Services/Api';
import { toast } from 'sonner';
const ProductDetail = ({post}) => {
  const scrollContainerRef = useRef(null);
  const commentsPerPage = 5; // Número de comentários por página
  const [loadingComment, setLoadingComment] = useState(false); // Novo estado para o carregamento
  const [totalItems, setTotalItems] = useState(post.PostComments.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [comment, setComment] = useState('');
  const token = localStorage.getItem('token');
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString);

  // Calcular os comentários a serem exibidos com base na página atual
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = post.PostComments.slice(indexOfFirstComment, indexOfLastComment);


  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.offsetTop, // Rolar para o topo da caixa de comentários
        behavior: 'smooth', // Rolagem suave
      });
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
        // Adiciona o novo comentário no topo da lista de comentários
        setTotalItems(totalItems + 1);
        // setMyPost(myPost.map((item) => (item.id === post.id 
        //   ? { 
        //       ...item, 
        //       PostComments: [response.data, ...item.PostComments] // Novo comentário na frente
        //     } 
        //   : item)));
        setComment('');
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      console.log(err);
    }finally {
      setLoadingComment(false); // Finaliza o carregamento
    }
  };

  return (
    <Box p={2}>    
      <Typography variant="h2"> Detalhes do post</Typography>
      <Box pt={2} pb={2}>
        <Typography variant="body1">{post.text}</Typography>
      </Box>
      <Box ref={scrollContainerRef} p={-2}>
      <Box display={'flex'} justifyContent={'space-between'}>
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
   </Box>
  );
};

export default ProductDetail;
