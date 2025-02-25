import { useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, CardContent, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import ScrollToTop from '../../../components/frontend-pages/shared/scroll-to-top';
import HpHeader from '../../../components/frontend-pages/shared/header/HpHeader';
import MotionButton from './MotionButton';
import { toast } from 'sonner';
import Loading from '../../../components/Loading/Loading';
import { postData } from '../../../Services/Api';
import image from '../../../assets/images/posters/imagem-12.jpg';
import Footer from '../../../components/landingpage/footer/Footer';

const ContatoPage = () => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const cuString = localStorage.getItem('currentUser');
    const currentUserls = JSON.parse(cuString);

    useEffect(() => {
        if (currentUserls) {
            setName(currentUserls.name);
            setEmail(currentUserls.email);
        }
    }, [currentUserls]);

    const sendMessage = async (event) => {
        event.preventDefault();

        if (email !== '' && name !== '' && message !== '') {
            try {
                setLoading(true);

                const formJson = { email, name, message };

                const response = await postData('contact', formJson, '');
                if (response.status === 200 || response.status === 201) {
                    toast.success('Mensagem enviada com sucesso');
                    setEmail('');
                    setName('');
                    setMessage('');
                } else {
                    toast.error(response.message);
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        } else {
            toast.error('Para mandar uma mensagem, preencha todos os campos');
        }
    };

    return (
        <PageContainer title="Contato" description="Entre em contato conosco">
            <HpHeader />
            {loading && <Loading data={{ open: loading }} />}

            <Grid container sx={{ height: '95vh' }}>
                {/* Imagem de fundo */}
                <Grid item xs={0} md={8} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <Box
                        sx={{
                            height: '95vh',
                            backgroundImage: `url(${image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                </Grid>

                {/* Formulário */}
                <Grid item xs={12} md={4} display="flex" alignItems="center" justifyContent="center">
                    <Box
                        component="form"
                        onSubmit={sendMessage}
                        sx={{
                            width: '90%',
                            maxWidth: 500,
   
                        }}
                    >
                        <Typography variant="h3"  gutterBottom pb ={2}>
                            Entre em contato
                        </Typography>
                        <TextField
                            required
                            fullWidth
                            label="Nome"
                            variant="outlined"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="E-mail"
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            required
                            fullWidth
                            label="Mensagem"
                            variant="outlined"
                            multiline
                            rows={4}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            inputProps={{ maxLength: 500 }}
                            sx={{ mb: 2 }}
                        />
                        <Typography variant="caption" color="text.secondary" align="right">
                            {message.length} / 500 caracteres
                        </Typography>

                        <Box mt={3} textAlign="center">
                            <MotionButton label="Enviar" borderRadius={3} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
            <ScrollToTop />
        </PageContainer>
    );
};

export default ContatoPage;
