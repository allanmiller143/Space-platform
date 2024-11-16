import { useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Card, CardContent, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Footer from '../../../components/frontend-pages/shared/footer';
import ScrollToTop from '../../../components/frontend-pages/shared/scroll-to-top';
import HpHeader from '../../../components/frontend-pages/shared/header/HpHeader';
import ContatoTittle from './ContatoTittle';
import MotionButton from './MotionButton';

const ContatoPage = () => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');

    const cuString = localStorage.getItem('currentUser');
    const currentUserls = JSON.parse(cuString);

    useEffect(() => {
        if (currentUserls) {
            setName(currentUserls.name);
            setEmail(currentUserls.email);
        }
    }, [currentUserls]);



    const sendMessage = (event) => {
        event.preventDefault(); // Evita o comportamento padrão de recarregar a página
        alert('Mensagem enviada com sucesso!');
    
    }

    return (
        <PageContainer title="Contato" description="Entre em contato conosco">
            <HpHeader />
            <Box width={'100%'} pt={10} pb={500} sx={{ backgroundColor: '#f9f9f9' }}>
                <Container maxWidth="md">
                    <ContatoTittle />
                    <Card elevation={3}>
                        <CardContent>
                            <Typography variant="h3" gutterBottom color="primary">
                                Envie sua mensagem
                            </Typography>
                            <form onSubmit={sendMessage}>
                                <Grid container spacing={3} mt={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Nome"
                                            variant="outlined"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="E-mail"
                                            variant="outlined"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Assunto"
                                            variant="outlined"
                                            value={subject}
                                            onChange={(e) => setSubject(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
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
                                        />
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            display="block"
                                            align="right"
                                            mt={1}
                                        >
                                            {message.length} / 500 caracteres
                                        </Typography>
                                    </Grid>
                                    <MotionButton label="Enviar" borderRadius={1} />
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>
                </Container>
            </Box>
            <Footer />
            <ScrollToTop />
        </PageContainer>
    );
};

export default ContatoPage;
