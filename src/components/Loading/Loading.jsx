import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import PropTypes from 'prop-types';

export default function Loading({ data }) {
  const { open, absolute, all } = data;

  return (
    <div>
      {absolute ? (
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            width: '100%',
            height: '100%',
            position: 'absolute',
            borderRadius: '10px',
          }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : all ? (
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
            position: 'fixed', // Cobrirá toda a tela
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
          }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Backdrop
          sx={{
            color: '#fff',
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </div>
  );
}

Loading.propTypes = {
  data: PropTypes.shape({
    open: PropTypes.bool.isRequired, // Indica se o Backdrop deve ser exibido
    absolute: PropTypes.bool, // Define se o Backdrop é absoluto
    all: PropTypes.bool, // Define se o Backdrop cobre a tela inteira
  }).isRequired,
};
