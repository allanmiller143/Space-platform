import { useEffect, useState } from 'react';
import { Container, Grid, Typography, TextField, Card, CardContent, Box } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Footer from '../../../components/frontend-pages/shared/footer';
import ScrollToTop from '../../../components/frontend-pages/shared/scroll-to-top';
import HpHeader from '../../../components/frontend-pages/shared/header/HpHeader';
import ContatoTittle from './ContatoTittle';
import MotionButton from './MotionButton';
import { toast } from 'sonner';
import Loading from '../../../components/Loading/Loading';
import { postData } from '../../../Services/Api';

const ContatoPage = () => {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading,setLoading] = useState(false);

    const cuString = localStorage.getItem('currentUser');
    const currentUserls = JSON.parse(cuString);

    useEffect(() => {
        if (currentUserls) {
            setName(currentUserls.name);
            setEmail(currentUserls.email);
        }
    }, [currentUserls]);




    const sendMessage = async (event) => {
        event.preventDefault(); // Evita o comportamento padrão de recarregar a página

        if(email!== '' || name !== '' || message !== '' ){
            try{
            setLoading(true);
    
            const formJson = {
                email: email,
                name: name,
                message: message
            };
            console.log(formJson);
    
            const response = await postData('contact',formJson,'');
            if(response.status === 200 || response.status === 201){
                toast.success('Mensagem enviada com sucesso');
                setEmail('');
                setName('');
                setMessage('');
            }else{
                toast.error(response.message);
            }
            }
            catch(error){
            toast.error(error.message);
            }finally{
            setLoading(false);
            }
        }
        else{
            toast.error('Para mandar uma mensagem, preencha todos os campos');
        }
    };    
            
          
    

    return (
        <PageContainer title="Contato" description="Entre em contato conosco">
            <HpHeader />
            {loading && <Loading data = {{open:loading}}/>}

            <Box width={'100%'} pt={8} pb={50} sx={{ backgroundColor: '#f9f9f9' }}>
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
