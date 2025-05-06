import { useState } from 'react';
import { Box, Button, Typography, TextField, Grid, Select, MenuItem, FormControl, InputLabel, Tabs, Tab } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import Preview from './Preview';
import ConfirmationDialog from './ConfirmationDialog';
import SmallPreview from './SmallPreview';
import { isValidName, isValidCPF, isValidEmail, isValidDuration, isFormValid } from './Validations';
import Breadcrumb from '../../../../layouts/full/shared/breadcrumb/Breadcrumb';
import BlankCard from '../../../../components/shared/BlankCard';

const AnuncioEditor = () => {
  
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [form, setForm] = useState({
    name: JSON.parse(localStorage.getItem('currentUser')).name,
    email: JSON.parse(localStorage.getItem('currentUser')).email,
    cpf: JSON.parse(localStorage.getItem('currentUser')).info.cpf,
    link: '',
    image: '',
    duration: '',
    transactionAmount: 7,
    type: 'big',
  });

  const [adType, setAdType] = useState('big'); 
  const [anuncios, setAnuncios] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const priceMap = {
    big: { 7: 7, 15: 15, 30: 30 },
    small: {7: 3.5, 15: 7.5, 30: 15  },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleTabChange = (event, newValue) => {
    setAdType(newValue);
    setForm((prev) => ({ ...prev, type: newValue }));
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setForm((prev) => ({ ...prev, image: file }));
        setAnuncios([{ id: 1, imageUrl: e.target.result, link: form.link }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const handleOpenDialog = () => {
    setSubmitted(true);
    if (isFormValid(form) && form.image !== '') {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <>
      <Breadcrumb title="Insira um anúncio" subtitle="Insira um anúncio novo no Space Imóveis" description="this is Form Wizard page" />
      <BlankCard>
        <Box sx={{ p: 3 }}>
          <BlankCard>
            <Tabs value={adType} onChange={handleTabChange} centered sx={{ mb: 4, backgroundColor: '#f5f5f5' }}>
              <Tab label="Anúncio central" value="big" />
              <Tab label="Anúncio lateral" value="small" />
            </Tabs>

            <Grid container spacing={2} sx={{ mt: 2, p: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h5"> Insira as informações do anúncio</Typography>
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField 
                  label="Seu nome" 
                  fullWidth 
                  name="name" 
                  value={form.name} 
                  onChange={handleChange} 
                  error={(touched.name || submitted) && !isValidName(form.name)}
                  helperText={(touched.name || submitted) && !isValidName(form.name) ? 'Nome inválido' : ''}
                  disabled
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <TextField 
                  label="Seu CPF" 
                  fullWidth 
                  name="cpf" 
                  value={form.cpf} 
                  onChange={handleChange} 
                  error={(touched.cpf || submitted) && !isValidCPF(form.cpf)}
                  helperText={(touched.cpf || submitted) && !isValidCPF(form.cpf) ? 'CPF inválido' : ''}
                />
              </Grid>
              <Grid item md={4} xs={12}>
                <TextField 
                  label="Seu email" 
                  fullWidth 
                  name="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  error={(touched.email || submitted) && !isValidEmail(form.email)}
                  helperText={(touched.email || submitted) && !isValidEmail(form.email) ? 'Email inválido' : ''}
                  disabled
                />
              </Grid>
              <Grid item md={8} xs={12}>
                <TextField 
                  label="Link do Anúncio" 
                  fullWidth 
                  name="link" 
                  value={form.link} 
                  onChange={handleChange} 
                />
              </Grid>

              <Grid item md={6} xs={12}>
                <FormControl fullWidth error={(touched.duration || submitted) && !isValidDuration(form.duration)}> 
                  <InputLabel>Duração do anúncio</InputLabel>
                  <Select name="duration" value={form.duration} onChange={handleChange} label="Duração do anúncio">
                    <MenuItem value={7}>7 dias - R${priceMap[adType][7]}</MenuItem>
                    <MenuItem value={15}>15 dias - R${priceMap[adType][15]}</MenuItem>
                    <MenuItem value={30}>30 dias - R${priceMap[adType][30]}</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box p={2} >
              <Typography variant="body2" color="textSecondary">
                {adType === 'big' 
                  ? "Dimensão recomendada: 1200 x 500" 
                  : "Dimensão recomendada: 300 x 500 "}
              </Typography>
              <Button {...getRootProps()} sx={{ padding: 1, textAlign: 'center', cursor: 'pointer', marginTop: 1 }} disabled={!isFormValid(form)}>
                <input {...getInputProps()} />
                <Typography>Selecionar imagem</Typography>
              </Button>
            </Box>
          </BlankCard>

          {adType === 'big' ? 
            <Preview anuncios={anuncios} setAnuncios={setAnuncios} title="Pré-visualização do anúncio" label="Seu Anúncio aparecerá assim no Space" />
            : 
            <SmallPreview anuncios={anuncios} setAnuncios={setAnuncios} title="Pré-visualização do anúncio" label="Seu Anúncio aparecerá assim no Space"/>
          }

          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button variant="contained" onClick={handleOpenDialog} disabled={!isFormValid(form) || form.image === ''} sx={{ marginTop: 3 }}>
              Salvar
            </Button>
          </Box>
        </Box>
      </BlankCard>

      {openDialog && <ConfirmationDialog open={openDialog} onClose={handleCloseDialog} form={form} setForm={setForm} setAnuncios={setAnuncios}  setTouched={setTouched} setSubmitted= {setSubmitted}/>}
    </>
  );
};

export default AnuncioEditor;
