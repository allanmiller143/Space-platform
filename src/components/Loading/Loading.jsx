import CircularProgress from '@mui/material/CircularProgress';
import './Loading.css';
import Backdrop from '@mui/material/Backdrop';
import Proptypes from 'prop-types';
export default function Loading({data}) {
  const {open,absolute} = data;
  return (
    <div>
      {absolute?
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, width: '100%', height: '100%',   position: 'absolute', borderRadius: '10px'}}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>:
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      }
    </div>
  );
}

Loading.propTypes = {
  data: Proptypes.shape({
    open: Proptypes.bool.isRequired,
    absolute: Proptypes.boll
  })
  
}.isRequired;
