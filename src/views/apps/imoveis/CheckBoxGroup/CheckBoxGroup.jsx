/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import PropTypes from 'prop-types'; 
import './CheckBoxGroup.css';

function CheckboxesGroup({ data,  setFormData }) {
  const { label, itens } = data;

  const initialState = {};
  itens.forEach((item) => {
    initialState[item.value] = item.checked || false;
  });

  const [state, setState] = useState(initialState);
  useEffect(() => {
    setFormData(prevState => ({
      ...prevState,
      'opcoesRapidas': state
    }));
  }, [state, setFormData]);

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const columns = itens.length > 6 ? 2 : 1;

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
      <FormControl component="fieldset" variant="standard" sx={{ width: '100%' }}>
        <FormLabel component="legend" sx={{ fontWeight: 'bold', color: 'black' }}>{label}</FormLabel>
        <FormGroup sx={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {itens.map((item) => (
            <FormControlLabel
              key={item.value}
              control={
                <Checkbox
                  checked={state[item.value]}
                  onChange={handleChange}
                  name={item.value}
                />
              }
              label={item.label}
            />
          ))}
        </FormGroup>
      </FormControl>
    </Box>
  );
}

export default CheckboxesGroup;

CheckboxesGroup.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string.isRequired,
    itens: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        checked: PropTypes.bool,
      })
    ).isRequired,
  }).isRequired,
  setPropertyCommodity: PropTypes.func.isRequired,
};
