import { useState } from 'react';
import { IconButton, Drawer, Box, Typography, Button, Divider, Grid } from '@mui/material';
import { IconGridDots, IconHelp } from '@tabler/icons';
import { Link } from 'react-router-dom';
import AppLinks from '../../vertical/header/AppLinks';

const MyAppsDrawer = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <IconButton
                size="large"
                aria-label="mostrar aplicativos"
                color="inherit"
                onClick={toggleDrawer}
                sx={{
                    color: 'text.secondary'
                }}
            >
                <IconGridDots size="21" stroke="1.5" />
            </IconButton>

            <Drawer
                anchor="right"
                open={open}
                onClose={toggleDrawer}
            >
                <Box
                    sx={{
                        width: 320,
                        p: 3
                    }}
                >
                    <Typography variant="h5" mb={3}>
                        Meus Aplicativos
                    </Typography>

                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Box p={0}>
                                <AppLinks />
                                
                            </Box>
                        </Grid>
                    </Grid>

                </Box>
            </Drawer>
        </>
    );
};

export default MyAppsDrawer;