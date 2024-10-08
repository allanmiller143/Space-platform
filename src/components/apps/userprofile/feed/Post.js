/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Grid, Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import PostItem from './PostItem';
import { PostTextBox } from './PostTextBox';
import { getData } from '../../../../Services/Api';
import { Box } from '@mui/system';

const Post = ({ loading, setLoading, progress, setProgress,myPost, setMyPost,loadingData, setLoadingData }) => {
  const token = localStorage.getItem('token');
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString);

  const GetPosts = async () => {
    setLoadingData(true);
    try {
      const response = await getData(`posts/${currentUserls.email}`, token);
      if (response.status === 200 || response.status === 201) {
        setMyPost(response.userInfo); // Aqui salva os posts no estado
        console.log(response.userInfo);
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
    GetPosts();
  }, []);

  // Array de skeletons, pode ajustar o tamanho conforme necessário
  const skeletonArray = Array.from({ length: 3 }); // Exibe 3 skeletons

  return (
    <Grid container spacing={3}>
      <Grid item sm={12}>
        <PostTextBox loading={loading} setLoading={setLoading} progress={progress} setProgress={setProgress} />
      </Grid>

      <Grid item sm={12} lg={12}>
        {loadingData ? (
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
        ) : (
          // Exibe os posts quando carregar
          myPost.map((post) => (
            <Box key={post.id} sx={{ mb: 3 }}>
              <PostItem post={post} />
            </Box>
          ))
        )}
      </Grid>
    </Grid>
  );
};

export default Post;
