/* eslint-disable react/prop-types */
import {Box,Typography,Grid, FormControl, InputLabel, Select, MenuItem} from "@mui/material";

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
                },
            }}
            >
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="comissao-label">Comissão (%)</InputLabel>
                <Select
                  labelId="comissao-label"
                  id="comissao"
                  value={formData.comissao || ""}
                  name="comissao"
                  onChange={handleChange}
                  label="Comissão (%)"
                >
                  {Array.from({ length: 10 }, (_, index) => (
                    <MenuItem
                    key={index + 1} value={index + 1}>
                      {index + 1}%
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Typography
                variant="h6"
                color="text.secondary"
                className="helper-text"
                sx={{
                display: "none",
                position: "absolute",
                top: '100%',
                left: 0,
                mt: 0.5,
                fontSize: "0.8rem",
                padding: "4px",
                borderRadius: "4px",
                boxShadow: 1,
                backgroundColor: "white",
                zIndex: 10000,
                }}
            >
                Comissão em porcentagem em relação ao valor de venda ou aluguel que será repassado ao corretor
            </Typography>
        </Box>
    </Grid>

  );
};
export default Helper;
