/* eslint-disable react/prop-types */
import { Grid,Button} from '@mui/material';

import { motion } from 'framer-motion'; // Animações suaves
const MotionButton = ({onclick,label,borderRadius}) => {
    
    return (
        <Grid item xs={12} textAlign="center">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        onClick={onclick}
                        sx={{
                            color: '#fff',
                            px: 6,
                            py: 1.5,
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            borderRadius: borderRadius,
                            transition: '0.4s',
                        }}
                    >
                        {label}
                    </Button>
                </motion.div>
            </Grid>
    );
};

export default MotionButton;
