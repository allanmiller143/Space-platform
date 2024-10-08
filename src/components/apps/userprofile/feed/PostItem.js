/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {Stack,Avatar,Box,Typography,CardMedia,Grid,IconButton,Fab,Tooltip} from '@mui/material';
import { IconCircle, IconMessage2, IconShare, IconThumbUp } from '@tabler/icons';
import uniqueId from 'lodash/uniqueId';
import { useDispatch, useSelector } from 'react-redux';
import { likePosts, addComment } from 'src/store/apps/userProfile/UserProfileSlice';
import BlankCard from '../../../shared/BlankCard';
import { ptBR } from 'date-fns/locale';  // Importa o locale para português
import { formatDistanceToNowStrict } from 'date-fns';

const PostItem = ({ post }) => {
  const token = localStorage.getItem('token');
  const cuString = localStorage.getItem('currentUser');
  const currentUserls = JSON.parse(cuString);
  const dispatch = useDispatch();
  const customizer = useSelector((state) => state.customizer);
  const handleLike = async (postId) => {
    dispatch(likePosts(postId));
  };
  const [comText, setComText] = useState('');

  const onSubmit = async (id, comment) => {
    const commentId = uniqueId('#COMMENT_');
    const newComment = {
      id: commentId,
      profile: {
        id: uniqueId('#COMMENT_'),
        avatar: post?.profile.avatar,
        name: post?.profile.name,
        time: 'agora',
      },
      data: {
        comment: comment,
        likes: {
          like: false,
          value: 0,
        },
        replies: [],
      },
    };

    dispatch(addComment(id, newComment));
    setComText('');
  };

  return (
    <BlankCard>
      <Box p={3}  >
        <Stack direction={'row'} gap={2} alignItems="center">
          <Avatar alt="Fernando Dias" src={currentUserls.profile || currentUserls.profile.url ? currentUserls.profile.url : ''} />
          <Typography variant="h6">{currentUserls.name}</Typography>
          <Typography variant="caption" color="textSecondary">
            <IconCircle size="7" fill="" fillOpacity={'0.1'} strokeOpacity="0.1" />{' '}
            {formatDistanceToNowStrict(new Date(post.createdAt), {
                addSuffix: false,
                locale: ptBR,  // Define o locale para português
            })}{' '}
            atrás
         </Typography>
        </Stack>

        <Box py={2}>{post.text || ''}</Box>

        
        {post.PostMedia.length > 0 ? (
          <Box>
            <Grid container spacing={3} mb={2}>
              {post.PostMedia.map((photo) => {
                return (
                  <Grid item sm={12} key={photo.id}>
                    <CardMedia
                      component="img"
                      sx={{ borderRadius: customizer.borderRadius / 4, height: 360 }}
                      image={photo ? photo.url : ''}
                      alt="capa"
                      width={'100%'}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ) : (
          ''
        )}

        {/* 
        {post?.data.video ? (
          <CardMedia
            sx={{
              borderRadius: customizer.borderRadius / 4,
              height: 300,
              mb: 2,
            }}
            component="iframe"
            src={`https://www.youtube.com/embed/${post?.data.video}`}
          />
        ) : (
          ''
        )} */}


        <Box>
          <Stack direction="row" gap={1} alignItems="center">
            <Tooltip title="Curtir" placement="top">
              <Fab
                size="small"
              >
                <IconThumbUp size="16" />
              </Fab>
            </Tooltip>
            <Typography variant="body1" fontWeight={600}>
              3
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
        {/**Comentários, se houver**/}
        {/* <Box>
          {post?.data.comments ? (
            <>
              {post?.data.comments.map((comment) => {
                return <PostComments comment={comment} key={comment.id} post={post} />;
              })}
            </>
          ) : (
            ''
          )}
        </Box> */}
      </Box>
      {/* <Divider />
      <Box p={2}>
        <Stack direction={'row'} gap={2} alignItems="center">
          <Avatar
            alt="Fernando Dias"
            src={post?.profile.avatar}
            sx={{ width: '33px', height: '33px' }}
          />
          <TextField
            placeholder="Comentar"
            value={comText}
            onChange={(e) => setComText(e.target.value)}
            variant="outlined"
            fullWidth
          />
          <Button variant="contained" onClick={() => onSubmit(post?.id, comText)}>
            Comentar
          </Button>
        </Stack>
      </Box> */}
    </BlankCard>
  );
};


export default PostItem;
