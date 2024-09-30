import { Box, Grid, Typography, Container } from "@mui/material";
import "slick-carousel/slick/slick.css";

import LeaderShipCarousel from "./LeaderShipCarousel";
import Contact from "./Contact";

const Leadership = () => {
    return (
        <>
            <Contact />

            <Box sx={{
                py: {
                    xs: 5,
                    lg: 10
                }
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={3} alignItems="center" mb={6}>
                        <Grid item xs={12} lg={5} sm={8}>
                            <Typography variant="h4" mb={3} sx={{
                                fontSize: {
                                    lg: '40px',
                                    xs: '35px'
                                }
                            }}>Imóveis</Typography>
                            <Typography variant="body1" lineHeight="32px">Veja imóveis em destaque e encontre a casa dos seus sonhos.</Typography>
                        </Grid>
                    </Grid>

                    <LeaderShipCarousel />
                </Container>

            </Box>
        </>
    );
};

export default Leadership;
