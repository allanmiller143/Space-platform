/* eslint-disable no-unused-vars */
import * as React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';

function DropDownFilter({ data, handleSelectChange, initialValue }) {
  const { itens } = data;

  // Utilize o estado local para controlar o valor selecionado
  const [selectedValue, setSelectedValue] = React.useState(initialValue || '');

  // Atualize o valor selecionado quando houver alterações externas
  React.useEffect(() => {
    setSelectedValue(initialValue || '');
  }, [initialValue]);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    handleSelectChange(event);
  };

  return (
    <Box>
      <FormControl fullWidth>
        <Select
          value={selectedValue}
          initialValue={initialValue}
          onChange={handleChange}

        >
          {itens.map((item) => (
            <MenuItem key={item.value} value={item.value} sx={{ fontSize: '0.9rem !important' }}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

DropDownFilter.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    itens: PropTypes.array.isRequired,
  }).isRequired,
  handleSelectChange: PropTypes.func.isRequired,
  initialValue: PropTypes.string, // Propriedade para o valor inicial
  white: PropTypes.bool,
  withLabel: PropTypes.bool
};

export default DropDownFilter;
