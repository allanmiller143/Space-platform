import {  Typography, Grid } from '@mui/material';

const TextModel = ({title,label}) => {

  return (
    <Grid item md={8} xs={12}>
        <Typography variant="h6" color="text.secondary">
            {title}
        </Typography>
        <Typography variant="subtitle1" mb={0.5}>
            {label}
        </Typography>
    </Grid>
  );
};

export default TextModel;