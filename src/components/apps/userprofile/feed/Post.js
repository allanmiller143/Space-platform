/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Grid } from '@mui/material';
import  { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from 'src/store/apps/userProfile/UserProfileSlice';
import PostItem from './PostItem';
import { PostTextBox } from './PostTextBox';

const Post = ( {loading, setLoading,progress, setProgress}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const getPosts = useSelector((state) => state.userpostsReducer.posts);

  return (
    <Grid container spacing={3}>
      <Grid item sm={12}>
        <PostTextBox loading={loading} setLoading={setLoading} progress={progress} setProgress={setProgress} />
      </Grid>
      {getPosts.map((posts) => {
        return (
          <Grid item sm={12} key={posts.id}>
            <PostItem post={posts} />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Post;
