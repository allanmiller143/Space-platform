import React from 'react';
import { Container, Grid, Typography, TextField, Button } from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import Breadcrumb from 'src/layouts/full/shared/breadcrumb/Breadcrumb';
import Footer from '../../../components/frontend-pages/shared/footer';
import ScrollToTop from '../../../components/frontend-pages/shared/scroll-to-top';
import HpHeader from '../../../components/frontend-pages/shared/header/HpHeader';
import { Card, CardContent } from '@mui/material';

const ContatoPage = () => {
    return (
        <PageContainer title="Sobre nós" description="">
            <HpHeader />
            <Container sx={{ height: '700px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h1">Esta página carece de dados...</Typography>
            </Container>
            <Footer />
            <ScrollToTop />
        </PageContainer>
    );
};

export default ContatoPage;
