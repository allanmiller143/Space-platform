import { useState } from 'react';
import { Grid, LinearProgress, Typography, Box } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import ProfileBanner from 'src/components/apps/userprofile/profile/ProfileBanner';
import IntroCard from 'src/components/apps/userprofile/profile/IntroCard';
import InfoCard from 'src/components/apps/userprofile/profile/InfoCard';
import Post from 'src/components/apps/userprofile/profile/Post';

const UserProfile = () => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);


  return (
    <PageContainer title="User Profile" description="this is User Profile page">

      <Grid container spacing={3}>
        <Grid item sm={12}>
          <ProfileBanner />
        </Grid>
        <Grid item lg={12}>
          {loading ? (
            <Box sx={{ width: '100%' }}>
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
        <Post loading={loading} setLoading={setLoading} setProgress={setProgress} progress={progress} />
      </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
