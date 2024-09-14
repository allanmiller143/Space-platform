import * as React from 'react';
import { addNote } from 'src/store/apps/notes/NotesSlice';
import {
  Button,
  Dialog,
  Fab,
  DialogContent,
  TextField,
  DialogActions,
  DialogContentText,
  Typography,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { IconCheck } from '@tabler/icons';

const AddNotes = ({ colors }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [scolor, setScolor] = React.useState('primary');
  const id = useSelector((state) => state.notesReducer.notes.length + 1);
  const [title, setTitle] = React.useState('');

  const setColor = (e) => {
    setScolor(e);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" disableElevation color="primary" onClick={handleClickOpen}>
        Adicionar Compromisso
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h5" mb={2} fontWeight={700}>
            Adicionar Novo Compromisso
          </Typography>
          <DialogContentText>
            Para adicionar um novo compromisso, por favor, insira a descrição e escolha uma cor para o evento. Em seguida, pressione o botão enviar para adicionar o novo compromisso à sua agenda.
          </DialogContentText>
          <TextField
            multiline
            rows={5}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            margin="normal"
            id="description"
            label="Adicionar Descrição do Compromisso"
            type="text"
            fullWidth
            size="small"
            variant="outlined"
          />
          <Typography variant="h6" my={2}>
            Escolher Cor
          </Typography>
          {colors.map((color) => (
            <Fab
              color={color.disp}
              sx={{
                marginRight: '3px',
                transition: '0.1s ease-in',
                scale: scolor === color.disp ? '0.9' : '0.7',
              }}
              size="small"
              key={color.disp}
              onClick={() => setColor(color.disp)}
            >
              {scolor === color.disp ? <IconCheck /> : ''}
            </Fab>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button
            disabled={title === ''}
            onClick={(e) => {
              e.preventDefault();
              dispatch(addNote(id, title, scolor));
              setOpen(false);
              setTitle('');
            }}
            variant="contained"
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddNotes;
