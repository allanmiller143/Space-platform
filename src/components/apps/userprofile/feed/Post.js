/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Grid, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { PostTextBox } from './PostTextBox';
import { getData } from '../../../../Services/Api';
import { Box } from '@mui/system';

const Post = ({ loading, setLoading, progress, setProgress, myPost, setMyPost, loadingData, setLoadingData, userData }) => {
  const token = localStorage.getItem('token');
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString);
  
  const [page, setPage] = useState(1); // Controle da página atual
  
  const [hasMore, setHasMore] = useState(true); // Controle de mais dados
  // useEffect(() => {
  //   setMyPost([]); // Limpa o estado de post quando o componente e renderizado
  // },[])
  
  const GetPosts = async (page) => {
    setLoadingData(true);
    try {
      const response = await getData(`posts/${userData.email}?page=${page}&limit=3`, token); // Adicionando paginação
      if (response.status === 200 || response.status === 201) {
        console.log(response);
        if (response.userInfo.result.length === 0) {
          setHasMore(false); // Se não há mais dados
        } else {
          setMyPost((prevPosts) => [...prevPosts, ...response.userInfo.result]); // Adiciona novos posts ao estado
        }
      } else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    GetPosts(page); // Chama a API na primeira vez
  }, [page]); // Atualiza quando a página mudar

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && hasMore && !loadingData) {
      setPage((prevPage) => prevPage + 1); // Incrementa a página quando o usuário chega ao fim
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // Remove o event listener quando o componente desmontar
  }, [loadingData, hasMore]); // Atualiza o listener quando loadingData ou hasMore mudar

  // Array de skeletons, pode ajustar o tamanho conforme necessário
  const skeletonArray = Array.from({ length: 3 }); // Exibe 3 skeletons

  return (
    <Grid container spacing={3}>
      
      {
        currentUserls.email === userData.email ?
        <Grid item sm={12}>
          <PostTextBox loading={loading} setLoading={setLoading} progress={progress} setProgress={setProgress} myPost={myPost} setMyPost={setMyPost} userData={userData}/>
        </Grid> : null
      }
      <Grid item sm={12} lg={12}>
        {myPost.map((post) => (
          <Box key={post.id} sx={{ mb: 3 }}>
            <PostItem post={post} setMyPost={setMyPost} myPost={myPost} userData={userData} />
          </Box>
        ))}

        {loadingData && (
          // Exibe múltiplos skeletons enquanto está carregando
          skeletonArray.map((_, index) => (
            <Box key={index} sx={{ mb: 3 }}>
              <Skeleton variant="rectangular" height={250} style={{ marginBottom: '0.5rem', borderRadius: '10px' }} />
              <Skeleton variant="text" width="60%" height={40} />
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Skeleton variant="circular" width="30px" height="30px" />
                <Skeleton variant="circular" width="30px" height="30px" />
              </Box>
            </Box>
          ))
        )}
      </Grid>
    </Grid>
  );
};

export default Post;
