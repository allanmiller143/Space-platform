import {  Typography, Grid } from '@mui/material';

const TextModel = ({title,label}) => {

  return (
    <Grid item md={8} xs={12}>
        <Typography variant="body1" color="#000">
            {title}
        </Typography>
        <Typography variant="subtitle2" mb={0.5}>
            {label}
        </Typography>
    </Grid>
  );
};

export default TextModel;