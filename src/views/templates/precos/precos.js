import React from 'react';
import {
    Grid,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Button,
    CardContent,
    Container,
    ListItemIcon,
    Chip,
    Switch,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from 'src/components/container/PageContainer';
import { IconCheck, IconX } from '@tabler/icons';
import BlankCard from '../../../components/shared/BlankCard';
import pck1 from 'src/assets/images/backgrounds/silver.png';
import pck2 from 'src/assets/images/backgrounds/bronze.png';
import pck3 from 'src/assets/images/backgrounds/gold.png';
import Footer from '../../../components/frontend-pages/shared/footer';
import ScrollToTop from '../../../components/frontend-pages/shared/scroll-to-top';
import HpHeader from '../../../components/frontend-pages/shared/header/HpHeader';

const BCrumb = [
    {
        to: '/',
        title: 'Home',
    },
    {
        title: 'Preços',
    },
];

const pricing = [
    {
        id: 1,
        package: 'Prata',
        plan: 'Grátis',
        monthlyplan: 'Grátis',
        avatar: pck1,
        badge: false,
        btntext: 'Escolher Prata',
        rules: [
            {
                limit: true,
                title: '3 Membros',
            },
            {
                limit: true,
                title: 'Dispositivo Único',
            },
            {
                limit: false,
                title: '50GB de Armazenamento',
            },
            {
                limit: false,
                title: 'Backups Mensais',
            },
            {
                limit: false,
                title: 'Permissões e fluxos de trabalho',
            },
        ],
    },
    {
        id: 2,
        package: 'Bronze',
        monthlyplan: 10.99,
        avatar: pck2,
        badge: true,
        btntext: 'Escolher Bronze',
        rules: [
            {
                limit: true,
                title: '5 Membros',
            },
            {
                limit: true,
                title: 'Múltiplos Dispositivos',
            },
            {
                limit: true,
                title: '80GB de Armazenamento',
            },
            {
                limit: false,
                title: 'Backups Mensais',
            },
            {
                limit: false,
                title: 'Permissões e fluxos de trabalho',
            },
        ],
    },
    {
        id: 3,
        package: 'Ouro',
        monthlyplan: 22.99,
        avatar: pck3,
        badge: false,
        btntext: 'Escolher Ouro',
        rules: [
            {
                limit: true,
                title: 'Membros Ilimitados',
            },
            {
                limit: true,
                title: 'Múltiplos Dispositivos',
            },
            {
                limit: true,
                title: '150GB de Armazenamento',
            },
            {
                limit: true,
                title: 'Backups Mensais',
            },
            {
                limit: true,
                title: 'Permissões e fluxos de trabalho',
            },
        ],
    },
];

const PrecosPage = () => {
    const [show, setShow] = React.useState(false);

    const yearlyPrice = (a, b) => a * b;

    const theme = useTheme();
    const warninglight = theme.palette.warning.light;
    const warning = theme.palette.warning.main;

    const StyledChip = styled(Chip)({
        position: 'absolute',
        top: '15px',
        right: '30px',
        backgroundColor: warninglight,
        color: warning,
        textTransform: 'uppercase',
        fontSize: '11px',
    });

    return (
        <PageContainer title="Preços" description="Página de preços">
            <HpHeader />

            <Container>
                <Grid container spacing={3} justifyContent="center" mt={3}>
                    <Grid item xs={12} sm={10} lg={8} textAlign="center">
                        <Typography variant="h2">
                            Planos flexíveis adaptados às necessidades do seu negócio!
                        </Typography>
                        <Box display="flex" alignItems="center" mt={3} justifyContent="center">
                            <Typography variant="subtitle1">Mensal</Typography>
                            <Switch onChange={() => setShow(!show)} />
                            <Typography variant="subtitle1">Anual</Typography>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={3} mt={5}>
                    {pricing.map((price, i) => (
                        <Grid item xs={12} lg={4} sm={6} key={i}>
                            <BlankCard>
                                <CardContent sx={{ p: '30px' }}>
                                    {price.badge ? <StyledChip label="Popular" size="small"></StyledChip> : null}

                                    <Typography
                                        variant="subtitle1"
                                        fontSize="12px"
                                        mb={3}
                                        color="textSecondary"
                                        textTransform="uppercase"
                                    >
                                        {price.package}
                                    </Typography>
                                    <img src={price.avatar} alt={price.avatar} width={90} />
                                    <Box my={4}>
                                        {price.plan === 'Grátis' ? (
                                            <Box fontSize="50px" mt={5} fontWeight="600">
                                                {price.plan}
                                            </Box>
                                        ) : (
                                            <Box display="flex">
                                                <Typography variant="h6" mr="8px" mt="-12px">
                                                    R$
                                                </Typography>
                                                {show ? (
                                                    <>
                                                        <Typography fontSize="48px" fontWeight="600">
                                                            {yearlyPrice(`${price.monthlyplan}`, 12)}
                                                        </Typography>
                                                        <Typography
                                                            fontSize="15px"
                                                            fontWeight={400}
                                                            ml={1}
                                                            color="textSecondary"
                                                            mt={1}
                                                        >
                                                            /ano
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Typography fontSize="48px" fontWeight="600">
                                                            {price.monthlyplan}
                                                        </Typography>
                                                        <Typography
                                                            fontSize="15px"
                                                            fontWeight={400}
                                                            ml={1}
                                                            color="textSecondary"
                                                            mt={1}
                                                        >
                                                            /mês
                                                        </Typography>
                                                    </>
                                                )}
                                            </Box>
                                        )}
                                    </Box>

                                    <Box mt={3}>
                                        <List>
                                            {price.rules.map((rule, i) => (
                                                <Box key={i}>
                                                    {rule.limit ? (
                                                        <>
                                                            <ListItem disableGutters>
                                                                <ListItemIcon sx={{ color: 'primary.main', minWidth: '32px' }}>
                                                                    <IconCheck width={18} />
                                                                </ListItemIcon>
                                                                <ListItemText>{rule.title}</ListItemText>
                                                            </ListItem>
                                                        </>
                                                    ) : (
                                                        <ListItem disableGutters sx={{ color: 'grey.400' }}>
                                                            <ListItemIcon sx={{ color: 'grey.400', minWidth: '32px' }}>
                                                                <IconX width={18} />
                                                            </ListItemIcon>
                                                            <ListItemText>{rule.title}</ListItemText>
                                                        </ListItem>
                                                    )}
                                                </Box>
                                            ))}
                                        </List>
                                    </Box>

                                    <Button
                                        sx={{ width: '100%', mt: 3 }}
                                        variant="contained"
                                        size="large"
                                        color="primary"
                                    >
                                        {price.btntext}
                                    </Button>
                                </CardContent>
                            </BlankCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>

            <Footer />
            <ScrollToTop />
        </PageContainer>
    );
};

export default PrecosPage;
