/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Grid, LinearProgress, Typography, Box } from '@mui/material';
import IntroCard from 'src/components/apps/userprofile/feed/IntroCard';
import InfoCard from 'src/components/apps/userprofile/feed/InfoCard';
import Post from 'src/components/apps/userprofile/feed/Post';
import { useState } from 'react';


const Feed = ( {myPost, setMyPost}) => {

  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <Box >
      <Grid container spacing={3}>

        <Grid item lg={12}>
          {loading ? (
            <Box sx={{ width: '100%' ,mt: 3 }}>
              <Typography variant="h6" gutterBottom>Publicando...</Typography>
              <LinearProgress variant="determinate" value={progress} />
            </Box>
          ) : null}
        </Grid>
        <Grid item sm={12} lg={4} xs={12}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <IntroCard />
            </Grid>
            <Grid item sm={12}>
              <InfoCard />
            </Grid>
          </Grid>
        </Grid>
        {/* Posts Card */}
        <Grid item sm={12} lg={8} xs={12}>
          <Post loading={loading} setLoading={setLoading} setLoadingData={setLoadingData} loadingData={loadingData} setProgress={setProgress} progress={progress}  setMyPost={setMyPost} myPost={myPost}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Feed;
