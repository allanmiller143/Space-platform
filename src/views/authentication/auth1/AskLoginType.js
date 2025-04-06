import { Grid, Dialog, DialogContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AskLoginType = ({open,setOpen}) => {
  const navigate = useNavigate();
  return (
      <Dialog open={open} onClose={()=>{setOpen(false)}} fullWidth maxWidth="sm">
        <DialogContent>
          <Grid container spacing={2} justifyContent="center" >
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx ={{height : '120px'}}
                onClick={()=>{navigate('/auth/complete-register2')}}
              >
                Quero postar imóveis
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={() =>{ navigate('/auth/register2')} }
                sx ={{height : '120px'}}
              >
                Quero buscar imóveis
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
  );
}

export default AskLoginType;
