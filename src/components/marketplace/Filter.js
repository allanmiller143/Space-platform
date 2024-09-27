/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { Checkbox, FormControl, InputLabel, MenuItem, Select, ListItemText } from '@mui/material';
import { TextField } from '@mui/material';

const FilterVitrine = () => {
    const [selected, setSelected] = useState([]);

    const handleSelectChange = (event) => {
        setSelected(event.target.value);
    };

    return (
        <Box sx={{ p: 2, backgroundColor: 'white', borderBottom: '1px solid rgba(0, 0, 0, 0.1)' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Box sx={{ flex: '1 1 200px' }}>
                    <TextField
                        fullWidth
                        label="Localidade"
                        variant="outlined"
                    />
                </Box>
                <Box sx={{ flex: '1 1 200px' }}>
                    <TextField
                        fullWidth
                        label="Faixa de Preço"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        variant="outlined"
                    />
                </Box>
                <Box sx={{ flex: '1 1 200px' }}>
                    <FormControl fullWidth>
                        <InputLabel id="tipo-label">Tipo</InputLabel>
                        <Select
                            labelId="tipo-label"
                            id="tipo"
                            label="Tipo"
                        >
                            <MenuItem value="apartamento">Apartamento</MenuItem>
                            <MenuItem value="residencial">Residencial</MenuItem>
                            <MenuItem value="chacara">Chácara</MenuItem>
                            <MenuItem value="studio">Studio</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box sx={{ flex: '1 1 200px' }}>
                    <FormControl fullWidth sx={{ display: 'flex' }}>
                        <InputLabel id="caracteristicas-label">Características</InputLabel>
                        <Select
                            labelId="caracteristicas-label"
                            id="caracteristicas"
                            multiple
                            value={selected}
                            onChange={handleSelectChange}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            <MenuItem value="ar-condicionado">
                                <Checkbox checked={selected.indexOf('ar-condicionado') > -1} />
                                <ListItemText primary="Ar Condicionado" />
                            </MenuItem>
                            <MenuItem value="box">
                                <Checkbox checked={selected.indexOf('box') > -1} />
                                <ListItemText primary="Box" />
                            </MenuItem>
                            <MenuItem value="moveis">
                                <Checkbox checked={selected.indexOf('moveis') > -1} />
                                <ListItemText primary="Móveis" />
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
};

export default FilterVitrine;
