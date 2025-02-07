/* eslint-disable react/prop-types */
import { Avatar, Paper, Typography } from '@mui/material';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <Paper elevation={3} sx={{ p: 3, textAlign: "center" }}>
      <Avatar sx={{ bgcolor: "primary.main", mx: "auto", mb: 2 }}>
        <Icon />
      </Avatar>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Paper>
  );
};

export default FeatureCard;
