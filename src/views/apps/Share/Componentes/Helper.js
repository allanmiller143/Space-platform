/* eslint-disable react/prop-types */
import {Box,Typography,TextField,Grid} from "@mui/material";

const Helper = ({formData, setFormData}) => {

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  return (           
    <Grid item xs={12} sm={6}>
        <Box
            sx={{
                position: "relative",
                "&:hover .helper-text": {
                display: "block",
                backgroundColor: "#fff",
                },
            }}
            >
            <TextField
                fullWidth
                label="Comissão (%)"
                type="number"
                name="comissao"
                value={formData.comissao}
                onChange={handleChange}
                placeholder="Ex: 5"
            />
            <Typography
                variant="body2"
                color="text.secondary"
                className="helper-text"
                sx={{
                display: "none",
                position: "absolute",
                top: "100%",
                left: 0,
                mt: 0.5,
                fontSize: "0.8rem",
                padding: "4px",
                borderRadius: "4px",
                boxShadow: 1,
                }}
            >
                Comissão em porcentagem em relação ao valor de venda ou aluguel que será repassado ao corretor
            </Typography>
        </Box>
    </Grid>

  );
};
export default Helper;
