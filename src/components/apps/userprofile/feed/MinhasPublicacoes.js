/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Grid, LinearProgress, Typography, Box } from '@mui/material';
import IntroCard from 'src/components/apps/userprofile/feed/IntroCard';
import InfoCard from 'src/components/apps/userprofile/feed/InfoCard';
import Post from 'src/components/apps/userprofile/feed/Post';
import { useState } from 'react';


const MinhasPublicacoes = ( {myPost, setMyPost,userData}) => {
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
        <Grid item xs={12} lg={4} sx={{display: {xs: 'none',lg: 'block' }}}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <IntroCard userData={userData}  />
            </Grid>
            <Grid item xs={12}>
              <InfoCard userData={userData} />
            </Grid>
          </Grid>
        </Grid>
        {/* Posts Card */}
        <Grid item xs={12} lg={8}>
          <Post loading={loading} setLoading={setLoading} setLoadingData={setLoadingData} loadingData={loadingData} setProgress={setProgress} progress={progress}  setMyPost={setMyPost} myPost={myPost} userData={userData}/>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MinhasPublicacoes;
